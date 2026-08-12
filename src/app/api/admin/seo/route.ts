import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getSeoSettings } from "@/lib/cms";

export async function GET() {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const rows = await getSeoSettings();
  return NextResponse.json({ pages: rows });
}
