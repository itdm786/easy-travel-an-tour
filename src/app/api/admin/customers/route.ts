import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { createCustomer, getCustomers } from "@/lib/cms";

export async function GET() {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const rows = await getCustomers();
  return NextResponse.json({ customers: rows });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const customer = await createCustomer({
    name: String(body.name),
    email: body.email ? String(body.email) : undefined,
    phone: body.phone ? String(body.phone) : undefined,
    source: body.source ? String(body.source) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  });

  return NextResponse.json({ customer });
}
