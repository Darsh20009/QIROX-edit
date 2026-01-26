import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, type IUser, type UserRole } from "./models/User";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.SESSION_SECRET || "default-secret-key";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(user: IUser): string {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "غير مصرح - يرجى تسجيل الدخول" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ error: "جلسة منتهية - يرجى تسجيل الدخول مرة أخرى" });
    return;
  }

  req.user = payload;
  next();
}

export function roleMiddleware(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "غير مصرح" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "غير مسموح - صلاحيات غير كافية" });
      return;
    }

    next();
  };
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  phone?: string,
  metadata?: string,
  role: UserRole = "visitor",
  tenantId: string = "default"
): Promise<{ user: IUser; token: string }> {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("البريد الإلكتروني مسجل مسبقاً");
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    phone,
    isActive: true,
    isFirstLogin: true,
    role,
    tenantId,
  });

  const token = generateToken(user);
  return { user, token };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }

  if (!user.isActive) {
    throw new Error("الحساب معطل - تواصل مع الدعم");
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }

  const token = generateToken(user);
  return { user, token };
}
