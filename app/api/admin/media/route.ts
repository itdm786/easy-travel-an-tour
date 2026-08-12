import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { createMediaAsset, getMediaAssets } from "@/lib/cms";

export async function GET(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const rows = await getMediaAssets(category);
  return NextResponse.json({ media: rows });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const body = await request.json();
  if (!body.title || !body.url) {
    return NextResponse.json({ error: "Title and URL are required" }, { status: 400 });
  }

  const asset = await createMediaAsset({
    title: String(body.title),
    url: String(body.url),
    category: body.category ? String(body.category) : "general",
  });

  return NextResponse.json({ media: asset });
}
