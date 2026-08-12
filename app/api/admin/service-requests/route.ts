import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { getServiceRequests } from "@/lib/cms";

export async function GET(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;
  const rows = await getServiceRequests(type);
  return NextResponse.json({ requests: rows });
}
