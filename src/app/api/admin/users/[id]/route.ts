import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { type AdminRole } from "@/lib/cms";
import { hashPassword } from "@/lib/password";

const validRoles: AdminRole[] = ["super_admin", "admin", "manager", "editor"];

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  const body = await request.json();
  const role = String(body.role || "editor") as AdminRole;

  if (!numericId) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const updateData: Partial<typeof adminUsers.$inferInsert> = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    role,
    active: Boolean(body.active),
    updatedAt: new Date(),
  };

  if (body.password) {
    updateData.passwordHash = hashPassword(String(body.password));
  }

  const updated = await db
    .update(adminUsers)
    .set(updateData)
    .where(eq(adminUsers.id, numericId))
    .returning();

  const { passwordHash, ...user } = updated[0];
  return NextResponse.json({ user });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { session, error } = await requireAdmin(["super_admin", "admin"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  if (numericId === session.userId) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 }
    );
  }

  await db.delete(adminUsers).where(eq(adminUsers.id, numericId));
  return NextResponse.json({ success: true });
}
