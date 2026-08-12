import { NextResponse } from "next/server";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { canEditContent } from "@/lib/admin-auth";
import { getCmsPackages } from "@/lib/cms";
import { slugify } from "@/lib/utils";

const allowed = ["super_admin", "admin", "manager", "editor"] as const;

export async function GET() {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;

  const rows = await getCmsPackages();
  return NextResponse.json({ packages: rows });
}

export async function POST(request: Request) {
  const { session, error } = await requireAdmin([...allowed]);
  if (error) return error;
  if (!canEditContent(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const title = String(body.title || "").trim();

  if (!title) {
    return NextResponse.json({ error: "Package title is required" }, { status: 400 });
  }

  const slug = body.slug ? slugify(String(body.slug)) : slugify(title);

  const inserted = await db
    .insert(packages)
    .values({
      title,
      slug,
      category: String(body.category || "international"),
      destination: String(body.destination || ""),
      duration: String(body.duration || ""),
      price: Number(body.price || 0),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      image: String(body.image || "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"),
      featured: Boolean(body.featured),
      rating: String(body.rating || "4.8"),
      reviews: Number(body.reviews || 0),
      description: String(body.description || ""),
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json({ package: inserted[0] });
}
