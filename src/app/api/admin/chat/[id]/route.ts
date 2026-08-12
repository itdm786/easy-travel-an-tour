import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { session, error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  const body = await request.json();

  if (!numericId) {
    return NextResponse.json({ error: "Invalid chat id" }, { status: 400 });
  }

  const updated = await db
    .update(chatMessages)
    .set({
      status: String(body.status || "answered"),
      adminReply: body.adminReply ? String(body.adminReply) : null,
      repliedBy: session.email,
      repliedAt: new Date(),
    })
    .where(eq(chatMessages.id, numericId))
    .returning();

  return NextResponse.json({ message: updated[0] });
}
