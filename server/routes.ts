import type { Express } from "express";
import { createServer, type Server } from "http";
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ==================== AUTH ROUTES ====================
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      const { user, token } = await registerUser(
        data.email, 
        data.password, 
        data.name, 
        data.phone
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

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const { user, token } = await loginUser(data.email, data.password);
      
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

  app.post("/api/stores", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const data = storeSchema.parse(req.body);
      
      const existingSlug = await Store.findOne({ slug: data.slug });
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

  app.get("/api/stores", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const stores = await Store.find({ userId: req.user!.userId }).sort({ createdAt: -1 });
      res.json({ stores });
    } catch (error) {
      console.error("Get stores error:", error);
      res.status(500).json({ error: "فشل في جلب المتاجر" });
    }
  });

  app.get("/api/stores/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOne({ 
        _id: req.params.id, 
        userId: req.user!.userId 
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

  app.patch("/api/stores/:id", authMiddleware, async (req: AuthRequest, res) => {
    try {
      const store = await Store.findOneAndUpdate(
        { _id: req.params.id, userId: req.user!.userId },
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

  // ==================== ADMIN ROUTES ====================

  app.get("/api/admin/users", authMiddleware, roleMiddleware("admin"), async (_req, res) => {
    try {
      const users = await User.find().select("-password").sort({ createdAt: -1 });
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: "فشل في جلب المستخدمين" });
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

  return httpServer;
}
