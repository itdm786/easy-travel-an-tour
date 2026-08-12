import { NextResponse } from "next/server";
import { getChatMessages } from "@/lib/cms";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const messages = await getChatMessages();
  return NextResponse.json({ messages });
}
