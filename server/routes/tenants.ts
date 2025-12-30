import { Router } from "express";
import { z } from "zod";
import { Tenant } from "../models/Tenant";
import { Membership } from "../models/Membership";
import { Store } from "../models/Store";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { authMiddleware } from "../auth";
import { extractTenant, verifyTenantAccess, requireTenantRole, TenantRequest } from "../middleware/tenantMiddleware";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const router = Router();

const createTenantSchema = z.object({
  name: z.string().min(2, "Name required"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional(),
});

const updateTenantSchema = createTenantSchema.partial();

// Create tenant
router.post("/", authMiddleware, async (req: TenantRequest, res) => {
  try {
    const data = createTenantSchema.parse(req.body);
    
    // Check if slug already exists
    const existing = await Tenant.findOne({ slug: data.slug });
    if (existing) {
      res.status(400).json({ error: "Slug already taken" });
      return;
    }

    const tenant = await Tenant.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      ownerId: req.user!.userId,
      status: 'active',
      subscriptionTier: 'free',
      settings: {
        language: 'en',
        currency: 'USD',
        timezone: 'UTC',
      },
    });

    // Add owner as member
    await Membership.create({
      tenantId: tenant._id.toString(),
      userId: req.user!.userId,
      role: 'owner',
      status: 'active',
      joinedAt: new Date(),
    });

    res.status(201).json({
      id: tenant._id,
      name: tenant.name,
      slug: tenant.slug,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: fromZodError(error).message });
    } else {
      res.status(500).json({ error: "Failed to create tenant" });
    }
  }
});

// Get tenant
router.get(
  "/:slug",
  extractTenant,
  authMiddleware,
  verifyTenantAccess,
  async (req: TenantRequest, res) => {
    try {
      const tenant = await Tenant.findOne({ slug: req.tenant!.slug });
      if (!tenant) {
        res.status(404).json({ error: "Tenant not found" });
        return;
      }

      res.json({
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
        description: tenant.description,
        status: tenant.status,
        subscriptionTier: tenant.subscriptionTier,
        settings: tenant.settings,
        createdAt: tenant.createdAt,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tenant" });
    }
  }
);

// Update tenant
router.patch(
  "/:slug",
  extractTenant,
  authMiddleware,
  verifyTenantAccess,
  requireTenantRole('owner', 'admin'),
  async (req: TenantRequest, res) => {
    try {
      const data = updateTenantSchema.parse(req.body);
      
      const tenant = await Tenant.findOneAndUpdate(
        { slug: req.tenant!.slug },
        data,
        { new: true }
      );

      if (!tenant) {
        res.status(404).json({ error: "Tenant not found" });
        return;
      }

      res.json({
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to update tenant" });
      }
    }
  }
);

// List user's tenants
router.get("/", authMiddleware, async (req: TenantRequest, res) => {
  try {
    const memberships = await Membership.find({
      userId: req.user!.userId,
      status: 'active',
    });

    const tenantIds = memberships.map((m) => m.tenantId);
    const tenants = await Tenant.find({ _id: { $in: tenantIds } });

    res.json(
      tenants.map((t) => ({
        id: t._id,
        name: t.name,
        slug: t.slug,
        status: t.status,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
});

// Invite member to tenant
router.post(
  "/:slug/members/invite",
  extractTenant,
  authMiddleware,
  verifyTenantAccess,
  requireTenantRole('owner', 'admin'),
  async (req: TenantRequest, res) => {
    try {
      const { email, role } = z
        .object({
          email: z.string().email(),
          role: z.enum(['editor', 'viewer']),
        })
        .parse(req.body);

      const membership = await Membership.create({
        tenantId: req.tenant!.id,
        userId: email, // In production, look up user ID by email
        role,
        status: 'invited',
        invitedAt: new Date(),
        invitedBy: req.user!.userId,
      });

      res.status(201).json({
        id: membership._id,
        email,
        role,
        status: 'invited',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: fromZodError(error).message });
      } else {
        res.status(500).json({ error: "Failed to invite member" });
      }
    }
  }
);

// List tenant members
router.get(
  "/:slug/members",
  extractTenant,
  authMiddleware,
  verifyTenantAccess,
  async (req: TenantRequest, res) => {
    try {
      const members = await Membership.find({
        tenantId: req.tenant!.id,
        status: 'active',
      });

      res.json(
        members.map((m) => ({
          userId: m.userId,
          role: m.role,
          status: m.status,
          joinedAt: m.joinedAt,
        }))
      );
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  }
);

// Get public store data
router.get("/store/:slug", async (req, res) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug });
    if (!store) {
      return res.status(404).json({ error: "المتجر غير موجود" });
    }
    const products = await Product.find({ storeId: store._id, status: "active" });
    const categories = await Category.find({ storeId: store._id, isActive: true });
    res.json({ store, products, categories });
  } catch (error) {
    res.status(500).json({ error: "فشل في جلب بيانات المتجر" });
  }
});

export default router;
