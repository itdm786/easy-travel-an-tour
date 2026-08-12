import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { ensureDefaultAdminUser, type AdminRole } from "@/lib/cms";
import { verifyPassword } from "@/lib/password";

export const ADMIN_COOKIE_NAME = "easy_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export type AdminSessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: AdminRole;
  iat: number;
  exp: number;
};

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "easy-travel-default-admin-session-secret-change-in-production"
  );
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function safeCompare(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  if (first.length !== second.length) return false;
  return timingSafeEqual(first, second);
}

export function createAdminSessionToken(user: {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
}) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: now,
    exp: now + ADMIN_SESSION_MAX_AGE,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null): AdminSessionPayload | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signPayload(encodedPayload);
  if (!safeCompare(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as AdminSessionPayload;

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function authenticateAdmin(email: string, password: string) {
  await ensureDefaultAdminUser();

  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  const user = rows[0];
  if (!user || !user.active) return null;

  const valid = verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as AdminRole,
  };
}

export function canManageUsers(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

export function canManageSettings(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

export function canEditContent(role: AdminRole) {
  return ["super_admin", "admin", "manager", "editor"].includes(role);
}

export function canManageLeads(role: AdminRole) {
  return ["super_admin", "admin", "manager"].includes(role);
}
