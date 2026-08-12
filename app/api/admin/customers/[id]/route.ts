import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { deleteCustomer, updateCustomerStatus } from "@/lib/cms";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  if (!numericId) {
    return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
  }

  const body = await request.json();
  const updated = await updateCustomerStatus(numericId, String(body.status || "active"));
  return NextResponse.json({ customer: updated });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  if (!numericId) {
    return NextResponse.json({ error: "Invalid customer id" }, { status: 400 });
  }

  await deleteCustomer(numericId);
  return NextResponse.json({ success: true });
}
