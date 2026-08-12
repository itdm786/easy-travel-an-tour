import { NextResponse } from "next/server";
import { getBrandingSettings } from "@/lib/cms";

export async function GET() {
  const settings = await getBrandingSettings();
  return NextResponse.json({ settings });
}
