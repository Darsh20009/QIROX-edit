import type { Express } from "express";
import { createServer, type Server } from "http";
import mongoose from "mongoose";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { 
  registerUser, 
  loginUser, 
  authMiddleware, 
  roleMiddleware,
  type AuthRequest 
} from "./auth";
import { User } from "./models/User";
import { Subscription, PLAN_PRICES } from "./models/Subscription";
import { Store } from "./models/Store";
import { Product } from "./models/Product";
import { Order, generateOrderNumber } from "./models/Order";
import { Category } from "./models/Category";
import { Tenant } from "./models/Tenant";
import { Membership } from "./models/Membership";
import { extractTenant, verifyTenantAccess, requireTenantRole, type TenantRequest } from "./middleware/tenantMiddleware";
import tenantsRouter from "./routes/tenants";
import { Project, Task } from "./models/Project";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

const registerSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

const subscriptionSchema = z.object({
  planType: z.enum(["stores", "restaurants", "education"]),
  billingCycle: z.enum(["monthly", "6months", "yearly"]),
});

const storeSchema = z.object({
  name: z.string().min(2, "اسم المتجر مطلوب"),
  nameEn: z.string().optional(),
  slug: z.string().min(3, "الرابط المختصر مطلوب").regex(/^[a-z0-9-]+$/, "الرابط يجب أن يحتوي على حروف إنجليزية صغيرة وأرقام وشرطات فقط"),
  description: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
});

const productSchema = z.object({
  name: z.string().min(2, "اسم المنتج مطلوب"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, "السعر يجب أن يكون رقم موجب"),
  comparePrice: z.number().min(0).optional(),
  cost: z.number().min(0).optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.number().min(0).default(0),
  category: z.string().optional(),
  images: z.array(z.string()).default([]),
  status: z.enum(["active", "inactive", "out_of_stock"]).default("active"),
  featured: z.boolean().default(false),
});

const categorySchema = z.object({
  name: z.string().min(2, "اسم الفئة مطلوب"),
  nameEn: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

const orderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "preparing", "ready", "shipped", "delivered", "cancelled"]),
});

const paymentStatusSchema = z.object({
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ==================== TENANT ROUTES ====================
  app.use("/api/tenants", extractTenant, tenantsRouter);

  // ==================== AUTH ROUTES ====================
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const { user, token } = await registerUser(
        data.email, 
        data.password, 
        data.name, 
        data.phone,
        "customer" // Explicitly set role for public registration
      );
      
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "فشل في إنشاء الحساب" });
      }
    }
  });

  // Audit-First: Detailed Logging for Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const { user, token } = await loginUser(data.email, data.password);
      
      await storage.createAuditLog({
        userId: user._id.toString(),
        tenantId: user.tenantId || "default",
        action: "USER_LOGIN",
        module: "Core",
        details: `User ${user.email} logged in from IP ${req.ip}`,
        ipAddress: req.ip,
      });

      res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "فشل في تسجيل الدخول" });
      }
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user!.userId).select("-password");
      if (!user) {
        res.status(404).json({ error: "المستخدم غير موجود" });
        return;
      }
      res.json({ 
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
        }
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "فشل في جلب بيانات المستخدم" });
    }
  });

  // ==================== SUBSCRIPTION ROUTES ====================

  app.post("/api/subscriptions", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const data = subscriptionSchema.parse(req.body);
      const price = PLAN_PRICES[data.planType][data.billingCycle];
      
      const durationDays = data.billingCycle === "monthly" ? 30 
        : data.billingCycle === "6months" ? 180 
        : 365;
      
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
      const trialEndsAt = new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);

      const subscription = await Subscription.create({
        userId: req.user!.userId,
        planType: data.planType,
        billingCycle: data.billingCycle,
        price,
        startDate,
        endDate,
        trialEndsAt,
        status: "trial",
      });

      res.status(201).json({ success: true, subscription });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        console.error("Subscription error:", error);
        res.status(500).json({ error: "فشل في إنشاء الاشتراك" });
      }
    }
  });

  app.get("/api/subscriptions", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const subscriptions = await Subscription.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
      res.json({ subscriptions });
    } catch (error) {
      console.error("Get subscriptions error:", error);
      res.status(500).json({ error: "فشل في جلب الاشتراكات" });
    }
  });

  app.get("/api/subscriptions/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const subscription = await Subscription.findOne({ 
        _id: req.params.id, 
        userId: req.user!.userId 
      });
      
      if (!subscription) {
        res.status(404).json({ error: "الاشتراك غير موجود" });
        return;
      }
      
      res.json({ subscription });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الاشتراك" });
    }
  });

  // ==================== STORE ROUTES ====================

  app.post("/api/stores", authMiddleware, extractTenant, async (req: TenantRequest, res) => {
    try {
      const data = storeSchema.parse(req.body);
      const tenantId = req.tenant?.id;
      
      const existingSlug = await Store.findOne({ slug: data.slug, tenantId });
      if (existingSlug) {
        res.status(400).json({ error: "الرابط المختصر مستخدم مسبقاً" });
        return;
      }

      const subscription = await Subscription.findOne({
        userId: req.user!.userId,
        status: { $in: ["active", "trial"] },
      }).sort({ createdAt: -1 });

      if (!subscription) {
        res.status(400).json({ error: "يجب أن يكون لديك اشتراك فعال لإنشاء متجر" });
        return;
      }

      const storeType = subscription.planType === "stores" ? "ecommerce"
        : subscription.planType === "restaurants" ? "restaurant"
        : "education";

      const store = await Store.create({
        userId: req.user!.userId,
        tenantId: tenantId as any,
        subscriptionId: subscription._id,
        name: data.name,
        nameEn: data.nameEn || undefined,
        slug: data.slug,
        type: storeType,
        description: data.description || undefined,
        phone: data.phone || undefined,
        email: data.email || undefined,
        address: data.address || undefined,
        status: "pending",
        settings: {
          currency: "SAR",
          language: "ar",
          timezone: "Asia/Riyadh",
          taxRate: 15,
        },
      });

      res.status(201).json({ success: true, store });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        console.error("Store creation error:", error);
        res.status(500).json({ error: "فشل في إنشاء المتجر" });
      }
    }
  });

  app.get("/api/stores", authMiddleware, extractTenant, async (req: TenantRequest, res) => {
    try {
      const tenantId = req.tenant?.id;
      const stores = await Store.find({ userId: req.user!.userId, tenantId }).sort({ createdAt: -1 });
      res.json({ stores });
    } catch (error) {
      console.error("Get stores error:", error);
      res.status(500).json({ error: "فشل في جلب المتاجر" });
    }
  });

  app.get("/api/stores/:id", authMiddleware, extractTenant, async (req: TenantRequest, res) => {
    try {
      const tenantId = req.tenant?.id;
      const store = await Store.findOne({ 
        _id: req.params.id, 
        userId: req.user!.userId,
        tenantId
      });
      
      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }
      
      res.json({ store });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المتجر" });
    }
  });

  app.patch("/api/stores/:id", authMiddleware, extractTenant, async (req: TenantRequest, res) => {
    try {
      const tenantId = req.tenant?.id;
      const store = await Store.findOneAndUpdate(
        { _id: req.params.id, userId: req.user!.userId, tenantId },
        { $set: req.body },
        { new: true }
      );
      
      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }
      
      res.json({ success: true, store });
    } catch (error) {
      res.status(500).json({ error: "فشل في تحديث المتجر" });
    }
  });

  // ==================== QIROX CORE ROUTES ====================

  app.get("/api/dashboard/stats", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const projects = await storage.getProjects(req.user!.userId);
      const invoices = await storage.getInvoices(req.user!.userId);
      const meetings = await storage.getMeetings(req.user!.userId);
      
      const stats = {
        projectsCount: projects.length,
        activeProjects: projects.filter(p => p.isApproved === "yes" && p.status !== "completed").length,
        unpaidInvoices: invoices.filter(i => i.status === "unpaid").length,
        upcomingMeetings: meetings.filter(m => new Date(m.scheduledAt) > new Date()).length,
        pendingApprovals: projects.filter(p => p.isApproved === "no").length,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/projects", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const projects = await storage.getProjects(req.user!.userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user!.userId);
      
      // Restriction: Only employees/admins can provision projects
      if (user?.role !== "admin" && user?.role !== "employee" && user?.role !== "qirox_pm") {
        return res.status(403).json({ error: "Only QIROX employees can provision projects" });
      }

      const project = await storage.createProject({
        ...req.body,
        userId: req.body.userId || req.user!.userId, // Assign to a specific user if provided
        tenantId: user?.tenantId || "default",
        isApproved: "yes", // Provisioned by employee means auto-approved
        provisionedAt: new Date(),
      });

      await storage.createAuditLog({
        userId: user._id.toString(),
        tenantId: user.tenantId || "default",
        action: "PROVISION_PROJECT",
        module: "Build",
        details: `Project ${project.id} provisioned by ${user.email} for user ${project.userId}`,
        ipAddress: req.ip,
      });

      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.patch("/api/projects/:id/approve", authMiddleware, roleMiddleware("admin", "employee", "qirox_pm"), async (req: AuthRequest, res) => {
    try {
      const { status, module } = req.body; // yes, rejected
      const user = await User.findById(req.user!.userId);
      const project = await storage.updateProject(req.params.id, {
        isApproved: status,
        approvedBy: req.user!.userId,
        approvedAt: new Date(),
        module: module || "Build"
      });

      await storage.createAuditLog({
        userId: req.user!.userId,
        tenantId: user?.tenantId || "default",
        action: status === "yes" ? "APPROVE_PROJECT" : "REJECT_PROJECT",
        module: module || "Build",
        details: `Project ${req.params.id} ${status === "yes" ? "approved" : "rejected"} by ${user?.email} into module ${module || "Build"}`,
        ipAddress: req.ip,
      });

      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to update project status" });
    }
  });

  // Audit Log Route
  app.post("/api/audit-logs", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user!.userId);
      const log = await storage.createAuditLog({
        userId: req.user!.userId,
        tenantId: user?.tenantId || "default",
        action: req.body.action,
        module: req.body.module || "Core",
        details: req.body.details,
        ipAddress: req.ip,
      });
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: "Failed to create audit log" });
    }
  });

  app.get("/api/audit-logs", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user!.userId);
      const logs = await storage.getAuditLogs(user?.tenantId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  // ==================== INVOICE ROUTES ====================
  app.get("/api/invoices", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const invoices = await storage.getInvoices(req.user!.userId);
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", authMiddleware, roleMiddleware("admin", "employee"), async (req: AuthRequest, res) => {
    try {
      const invoice = await storage.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to create invoice" });
    }
  });

  // ==================== MEETING ROUTES ====================
  app.get("/api/meetings", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const meetings = await storage.getMeetings(req.user!.userId);
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meetings" });
    }
  });

  app.post("/api/meetings", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const user = await User.findById(req.user!.userId);
      // Generate ZEGO-ready meeting ID
      const meetingId = Math.random().toString(36).substring(7);
      const appID = process.env.ZEGO_APP_ID;
      
      // Internal QIROX Meet Link
      const meetingLink = `https://qirox.meet/${meetingId}?appId=${appID}`;
      
      const meeting = await storage.createMeeting({
        ...req.body,
        userId: req.user!.userId,
        tenantId: user?.tenantId || "default",
        link: meetingLink
      });

      await storage.createAuditLog({
        userId: req.user!.userId,
        tenantId: user?.tenantId || "default",
        action: "SCHEDULE_MEETING",
        module: "Meet",
        details: `Internal meeting scheduled: ${meeting.title} via QIROX Meet`,
        ipAddress: req.ip,
      });

      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ error: "Failed to schedule meeting" });
    }
  });

  app.get("/api/admin/subscriptions", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const subscriptions = await Subscription.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
      res.json({ subscriptions });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الاشتراكات" });
    }
  });

  app.get("/api/admin/stores", authMiddleware, roleMiddleware("admin", "employee"), async (_req, res) => {
    try {
      const stores = await Store.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
      res.json({ stores });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المتاجر" });
    }
  });

  app.patch("/api/admin/stores/:id/status", authMiddleware, roleMiddleware("admin", "employee"), async (req, res) => {
    try {
      const { status } = req.body;
      const store = await Store.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      
      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }
      
      res.json({ success: true, store });
    } catch (error) {
      res.status(500).json({ error: "فشل في تحديث حالة المتجر" });
    }
  });

  app.patch("/api/admin/subscriptions/:id/confirm", authMiddleware, roleMiddleware("admin", "employee"), async (req: AuthRequest, res) => {
    try {
      const { notes } = req.body;
      const subscription = await Subscription.findById(req.params.id);
      
      if (!subscription) {
        res.status(404).json({ error: "الاشتراك غير موجود" });
        return;
      }
      
      if (subscription.status === "active") {
        res.status(400).json({ error: "الاشتراك مفعل بالفعل" });
        return;
      }
      
      subscription.status = "active";
      subscription.paymentConfirmedAt = new Date();
      subscription.paymentConfirmedBy = req.user!.userId as any;
      if (notes) subscription.paymentNotes = notes;
      await subscription.save();
      
      res.json({ success: true, subscription });
    } catch (error) {
      console.error("Confirm payment error:", error);
      res.status(500).json({ error: "فشل في تأكيد الدفع" });
    }
  });

  app.get("/api/admin/stats", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const [totalUsers, totalSubscriptions, activeSubscriptions, totalStores] = await Promise.all([
        User.countDocuments(),
        Subscription.countDocuments(),
        Subscription.countDocuments({ status: { $in: ["active", "trial"] } }),
        Store.countDocuments(),
      ]);

      const revenueResult = await Subscription.aggregate([
        { $match: { status: { $in: ["active", "trial"] } } },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]);

      res.json({
        stats: {
          totalUsers,
          totalSubscriptions,
          activeSubscriptions,
          totalStores,
          totalRevenue: revenueResult[0]?.total || 0,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الإحصائيات" });
    }
  });

  // ==================== PRODUCT ROUTES ====================

  app.get("/api/stores/:storeId/products", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const products = await Product.find({ storeId: store._id }).sort({ createdAt: -1 });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المنتجات" });
    }
  });

  app.post("/api/stores/:storeId/products", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = productSchema.parse(req.body);
      
      const product = await Product.create({
        storeId: store._id,
        ...data,
      });

      res.status(201).json({ success: true, product });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        console.error("Product creation error:", error);
        res.status(500).json({ error: "فشل في إنشاء المنتج" });
      }
    }
  });

  app.get("/api/stores/:storeId/products/:productId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const product = await Product.findOne({
        _id: req.params.productId,
        storeId: store._id,
      });

      if (!product) {
        res.status(404).json({ error: "المنتج غير موجود" });
        return;
      }

      res.json({ product });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المنتج" });
    }
  });

  app.patch("/api/stores/:storeId/products/:productId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = productSchema.partial().parse(req.body);
      
      const product = await Product.findOneAndUpdate(
        { _id: req.params.productId, storeId: store._id },
        data,
        { new: true }
      );

      if (!product) {
        res.status(404).json({ error: "المنتج غير موجود" });
        return;
      }

      res.json({ success: true, product });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "فشل في تحديث المنتج" });
      }
    }
  });

  app.delete("/api/stores/:storeId/products/:productId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const product = await Product.findOneAndDelete({
        _id: req.params.productId,
        storeId: store._id,
      });

      if (!product) {
        res.status(404).json({ error: "المنتج غير موجود" });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "فشل في حذف المنتج" });
    }
  });

  // ==================== CATEGORY ROUTES ====================

  app.get("/api/stores/:storeId/categories", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const categories = await Category.find({ storeId: store._id }).sort({ order: 1 });
      res.json({ categories });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الفئات" });
    }
  });

  app.post("/api/stores/:storeId/categories", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = categorySchema.parse(req.body);
      
      const category = await Category.create({
        storeId: store._id,
        ...data,
      });

      res.status(201).json({ success: true, category });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "فشل في إنشاء الفئة" });
      }
    }
  });

  app.patch("/api/stores/:storeId/categories/:categoryId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = categorySchema.partial().parse(req.body);
      
      const category = await Category.findOneAndUpdate(
        { _id: req.params.categoryId, storeId: store._id },
        data,
        { new: true }
      );

      if (!category) {
        res.status(404).json({ error: "الفئة غير موجودة" });
        return;
      }

      res.json({ success: true, category });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "فشل في تحديث الفئة" });
      }
    }
  });

  app.delete("/api/stores/:storeId/categories/:categoryId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const category = await Category.findOneAndDelete({
        _id: req.params.categoryId,
        storeId: store._id,
      });

      if (!category) {
        res.status(404).json({ error: "الفئة غير موجودة" });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "فشل في حذف الفئة" });
    }
  });

  // ==================== ORDER ROUTES ====================

  app.get("/api/stores/:storeId/orders", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const orders = await Order.find({ storeId: store._id }).sort({ createdAt: -1 });
      res.json({ orders });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الطلبات" });
    }
  });

  app.get("/api/stores/:storeId/orders/:orderId", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const order = await Order.findOne({
        _id: req.params.orderId,
        storeId: store._id,
      });

      if (!order) {
        res.status(404).json({ error: "الطلب غير موجود" });
        return;
      }

      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الطلب" });
    }
  });

  app.patch("/api/stores/:storeId/orders/:orderId/status", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = orderStatusSchema.parse(req.body);
      
      const order = await Order.findOneAndUpdate(
        { _id: req.params.orderId, storeId: store._id },
        { status: data.status },
        { new: true }
      );

      if (!order) {
        res.status(404).json({ error: "الطلب غير موجود" });
        return;
      }

      res.json({ success: true, order });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "فشل في تحديث حالة الطلب" });
      }
    }
  });

  app.patch("/api/stores/:storeId/orders/:orderId/payment", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const data = paymentStatusSchema.parse(req.body);
      
      const order = await Order.findOneAndUpdate(
        { _id: req.params.orderId, storeId: store._id },
        { paymentStatus: data.paymentStatus },
        { new: true }
      );

      if (!order) {
        res.status(404).json({ error: "الطلب غير موجود" });
        return;
      }

      res.json({ success: true, order });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "فشل في تحديث حالة الدفع" });
      }
    }
  });

  // ==================== STORE STATS ====================

  app.get("/api/stores/:storeId/stats", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({
        _id: req.params.storeId,
        userId: req.user!.userId,
      });

      if (!store) {
        res.status(404).json({ error: "المتجر غير موجود" });
        return;
      }

      const [totalProducts, totalCategories, totalOrders, pendingOrders] = await Promise.all([
        Product.countDocuments({ storeId: store._id }),
        Category.countDocuments({ storeId: store._id }),
        Order.countDocuments({ storeId: store._id }),
        Order.countDocuments({ storeId: store._id, status: "pending" }),
      ]);

      const revenueResult = await Order.aggregate([
        { $match: { storeId: store._id, paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]);

      res.json({
        stats: {
          totalProducts,
          totalCategories,
          totalOrders,
          pendingOrders,
          totalRevenue: revenueResult[0]?.total || 0,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الإحصائيات" });
    }
  });

  // ==================== CONTACT ROUTES ====================

  app.post("/api/contact", async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({ error: "طلبات كثيرة جداً. يرجى المحاولة لاحقاً." });
      return;
    }
    
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({ error: "فشل في إرسال الرسالة" });
      }
    }
  });

  app.get("/api/contact", authMiddleware, roleMiddleware("admin", "employee"), async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "فشل في جلب الرسائل" });
    }
  });

  app.get("/api/finance/invoices", authMiddleware, async (_req, res) => {
    const invoices = await storage.getInvoices();
    res.json(invoices);
  });

  app.get("/api/finance/quotes", authMiddleware, async (_req, res) => {
    const quotes = await storage.getQuotes();
    res.json(quotes);
  });

  app.post("/api/finance/whatsapp-payment", authMiddleware, async (req, res) => {
    const { orderId, amount } = req.body;
    // Manual WhatsApp Payment flow: Instruct user to send screenshot via WhatsApp
    const message = `طلب جديد: ${orderId}\nالمبلغ: ${amount} ريال\nيرجى إرسال صورة التحويل هنا.`;
    const whatsappLink = `https://wa.me/966532441566?text=${encodeURIComponent(message)}`;
    res.json({ whatsappLink });
  });

  // ==================== ADMIN API ROUTES (MongoDB) ====================

  app.get("/api/admin/users", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 }).limit(50);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المستخدمين" });
    }
  });

  app.post("/api/admin/users", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
      const { name, email, role } = req.body;
      const user = new User({ name, email, role, password: "default123" });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء مستخدم" });
    }
  });

  app.get("/api/admin/products", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).limit(50);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المنتجات" });
    }
  });

  app.post("/api/admin/products", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
      const { name, category, price, stock, status } = req.body;
      const storeId = (req as any).user?.storeId || new mongoose.Types.ObjectId();
      const product = new Product({
        name,
        category,
        price,
        quantity: stock || 0,
        status: status || "active",
        storeId,
        images: [],
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء منتج" });
    }
  });

  app.get("/api/admin/orders", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الطلبات" });
    }
  });

  app.post("/api/admin/orders", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
      const { order_number, customer_name, total, status } = req.body;
      const storeId = (req as any).user?.storeId || new mongoose.Types.ObjectId();
      const order = new Order({
        orderNumber: order_number,
        customerName: customer_name,
        customerPhone: "",
        total,
        subtotal: total,
        items: [],
        status: status || "pending",
        paymentStatus: "pending",
        storeId,
      });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء طلب" });
    }
  });

  app.get("/api/admin/subscriptions", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const subscriptions = await Subscription.find().sort({ createdAt: -1 }).limit(50);
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب الاشتراكات" });
    }
  });

  app.post("/api/admin/subscriptions", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
      const { subscription_number, plan, billing_cycle, price, status } = req.body;
      const userId = (req as any).user?._id;
      const subscription = new Subscription({
        userId,
        planType: plan || "stores",
        billingCycle: billing_cycle || "monthly",
        price,
        status: status || "active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      await subscription.save();
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء اشتراك" });
    }
  });

  app.get("/api/admin/stores", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const stores = await Store.find().sort({ createdAt: -1 }).limit(50);
      res.json(stores);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المتاجر" });
    }
  });

  app.post("/api/admin/stores", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
      const { name, owner, status } = req.body;
      const store = new Store({
        name,
        owner,
        status: status || "active",
      });
      await store.save();
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء متجر" });
    }
  });

  // ==================== KANBAN BOARD / TASKS ROUTES ====================

  app.get("/api/projects/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
      const { projectId } = req.params;
      const tasks = await Task.find({ projectId }).populate("assignedTo", "name email");
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المهام" });
    }
  });

  app.post("/api/projects/:projectId/tasks", authMiddleware, async (req, res) => {
    try {
      const { projectId } = req.params;
      const { title, description, status, assignedTo, dueDate } = req.body;
      const task = new Task({
        projectId,
        title,
        description,
        status: status || "todo",
        assignedTo,
        dueDate,
      });
      await task.save();
      const populated = await task.populate("assignedTo", "name email");
      res.status(201).json(populated);
    } catch (error) {
      res.status(500).json({ error: "فشل في إنشاء المهمة" });
    }
  });

  app.patch("/api/projects/:projectId/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status, assignedTo, dueDate } = req.body;
      const task = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, assignedTo, dueDate },
        { new: true }
      ).populate("assignedTo", "name email");
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "فشل في تحديث المهمة" });
    }
  });

  app.delete("/api/projects/:projectId/tasks/:taskId", authMiddleware, async (req, res) => {
    try {
      const { taskId } = req.params;
      await Task.findByIdAndDelete(taskId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "فشل في حذف المهمة" });
    }
  });

  return httpServer;
}
