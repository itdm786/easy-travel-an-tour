import { NextResponse } from "next/server";
import {
  getBrandingSettings,
  saveBrandingSettings,
  type SiteBrandingSettings,
} from "@/lib/cms";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const settings = await getBrandingSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin"]);
  if (error) return error;

  const body = (await request.json()) as Partial<SiteBrandingSettings>;
  const existing = await getBrandingSettings();
  const settings: SiteBrandingSettings = {
    ...existing,
    ...body,
    logoWidth: Number(body.logoWidth ?? existing.logoWidth),
    logoHeight: Number(body.logoHeight ?? existing.logoHeight),
    headerLogoWidth: Number(body.headerLogoWidth ?? existing.headerLogoWidth),
    footerLogoWidth: Number(body.footerLogoWidth ?? existing.footerLogoWidth),
  };

  await saveBrandingSettings(settings);
  return NextResponse.json({ settings });
}
