import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { canEditContent } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";

const allowed = ["super_admin", "admin", "manager", "editor"] as const;

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { session, error } = await requireAdmin([...allowed]);
  if (error) return error;
  if (!canEditContent(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid package id" }, { status: 400 });
  }

  const updated = await db
    .update(packages)
    .set({
      title: String(body.title || "").trim(),
      slug: slugify(String(body.slug || body.title || "package")),
      category: String(body.category || "international"),
      destination: String(body.destination || ""),
      duration: String(body.duration || ""),
      price: Number(body.price || 0),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      image: String(body.image || ""),
      featured: Boolean(body.featured),
      rating: String(body.rating || "4.8"),
      reviews: Number(body.reviews || 0),
      description: String(body.description || ""),
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      updatedAt: new Date(),
    })
    .where(eq(packages.id, numericId))
    .returning();

  return NextResponse.json({ package: updated[0] });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { session, error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid package id" }, { status: 400 });
  }

  await db.delete(packages).where(eq(packages.id, numericId));
  return NextResponse.json({ success: true, deletedBy: session.email });
}
