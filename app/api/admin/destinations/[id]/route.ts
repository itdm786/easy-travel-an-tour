import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

type Props = { params: Promise<{ id: string }> };
const allowed = ["super_admin", "admin", "manager", "editor"] as const;

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;
  const { id } = await params;
  const numericId = Number(id);
  const body = await request.json();

  if (!numericId) return NextResponse.json({ error: "Invalid destination id" }, { status: 400 });

  const updated = await db
    .update(destinations)
    .set({
      name: String(body.name || "").trim(),
      country: String(body.country || ""),
      image: String(body.image || ""),
      description: String(body.description || ""),
      rating: String(body.rating || "4.8"),
      packages: Number(body.packages || 0),
      updatedAt: new Date(),
    })
    .where(eq(destinations.id, numericId))
    .returning();

  return NextResponse.json({ destination: updated[0] });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;
  const { id } = await params;
  const numericId = Number(id);

  if (!numericId) return NextResponse.json({ error: "Invalid destination id" }, { status: 400 });

  await db.delete(destinations).where(eq(destinations.id, numericId));
  return NextResponse.json({ success: true });
}
