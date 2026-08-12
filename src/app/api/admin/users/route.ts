import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { getAdminUsers, type AdminRole } from "@/lib/cms";
import { hashPassword } from "@/lib/password";

const validRoles: AdminRole[] = ["super_admin", "admin", "manager", "editor"];

export async function GET() {
  const { error } = await requireAdmin(["super_admin", "admin"]);
  if (error) return error;

  const users = await getAdminUsers();
  return NextResponse.json({
    users: users.map(({ passwordHash, ...user }) => user),
  });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin"]);
  if (error) return error;

  const body = await request.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const role = String(body.role || "editor") as AdminRole;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const inserted = await db
    .insert(adminUsers)
    .values({
      name,
      email,
      passwordHash: hashPassword(password),
      role,
      active: Boolean(body.active ?? true),
      updatedAt: new Date(),
    })
    .returning();

  const { passwordHash, ...user } = inserted[0];
  return NextResponse.json({ user });
}
