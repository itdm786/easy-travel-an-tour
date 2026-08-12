import { NextResponse } from "next/server";
import { db } from "@/db";
import { destinations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { getCmsDestinations } from "@/lib/cms";

const allowed = ["super_admin", "admin", "manager", "editor"] as const;

export async function GET() {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;
  const rows = await getCmsDestinations();
  return NextResponse.json({ destinations: rows });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;
  const body = await request.json();

  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Destination name is required" }, { status: 400 });

  const inserted = await db
    .insert(destinations)
    .values({
      name,
      country: String(body.country || ""),
      image: String(body.image || "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg"),
      description: String(body.description || ""),
      rating: String(body.rating || "4.8"),
      packages: Number(body.packages || 0),
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json({ destination: inserted[0] });
}
