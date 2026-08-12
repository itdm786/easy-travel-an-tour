import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function PATCH(request: Request) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Current password and a new password of at least 8 characters are required" },
      { status: 400 }
    );
  }

  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, session.userId))
    .limit(1);

  const user = rows[0];
  if (!user || !verifyPassword(currentPassword, user.passwordHash)) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
  }

  await db
    .update(adminUsers)
    .set({ passwordHash: hashPassword(newPassword), updatedAt: new Date() })
    .where(eq(adminUsers.id, session.userId));

  return NextResponse.json({ success: true });
}
