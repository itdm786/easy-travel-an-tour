import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getHomepageSettings, saveHomepageSettings } from "@/lib/cms";

export async function GET() {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const settings = await getHomepageSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const body = await request.json();
  const updated = await saveHomepageSettings({
    heroTitle: String(body.heroTitle || ""),
    heroSubtitle: String(body.heroSubtitle || ""),
    heroImage: String(body.heroImage || ""),
    heroCtaLabel: String(body.heroCtaLabel || ""),
    heroCtaLink: String(body.heroCtaLink || ""),
  });

  return NextResponse.json({ settings: JSON.parse(updated.value) });
}
