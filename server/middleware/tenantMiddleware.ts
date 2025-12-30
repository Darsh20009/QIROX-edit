import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../auth";
import { Membership } from "../models/Membership";

export interface TenantRequest extends AuthRequest {
  tenant?: {
    id: string;
    slug: string;
  };
}

/**
 * Extract tenant from request (either from subdomain, path param, or query)
 */
export async function extractTenant(req: TenantRequest, res: Response, next: NextFunction) {
  try {
    // Try from subdomain first (e.g., acme.qirox.com)
    const host = req.hostname;
    let tenantSlug = null;

    if (host.includes("qirox.com")) {
      const parts = host.split(".");
      if (parts.length > 2) {
        tenantSlug = parts[0]; // e.g., "acme" from "acme.qirox.com"
      }
    }

    // Try from path param (e.g., /api/tenant/:slug)
    const pathSlug = (req as any).params?.slug;
    if (pathSlug) {
      tenantSlug = pathSlug;
    }

    // Try from query (e.g., ?tenant=acme)
    const querySlug = req.query.tenant as string;
    if (querySlug) {
      tenantSlug = querySlug;
    }

    if (tenantSlug) {
      // In production, fetch from DB. For now, use slug as ID
      (req as TenantRequest).tenant = {
        id: tenantSlug,
        slug: tenantSlug,
      };
    }

    next();
  } catch (error) {
    next();
  }
}

/**
 * Verify user has access to tenant
 */
export async function verifyTenantAccess(req: TenantRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.tenant) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Check if user is member of this tenant
    const membership = await Membership.findOne({
      tenantId: req.tenant.id,
      userId: req.user.userId,
      status: 'active',
    });

    if (!membership) {
      res.status(403).json({ error: "Access denied to this tenant" });
      return;
    }

    // Add membership role to request
    (req as any).membership = membership;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to verify tenant access" });
  }
}

/**
 * Check if user has specific role in tenant
 */
export function requireTenantRole(...allowedRoles: string[]) {
  return (req: TenantRequest, res: Response, next: NextFunction) => {
    const membership = (req as any).membership;
    
    if (!membership || !allowedRoles.includes(membership.role)) {
      res.status(403).json({ error: "Insufficient permissions for this tenant" });
      return;
    }
    
    next();
  };
}
