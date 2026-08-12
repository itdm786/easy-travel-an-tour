import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { markContactRead, deleteContactLead } from "@/lib/cms";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  if (!numericId) {
    return NextResponse.json({ error: "Invalid contact id" }, { status: 400 });
  }

  const body = await request.json();
  const updated = await markContactRead(numericId, Boolean(body.read));
  return NextResponse.json({ contact: updated });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  if (!numericId) {
    return NextResponse.json({ error: "Invalid contact id" }, { status: 400 });
  }

  await deleteContactLead(numericId);
  return NextResponse.json({ success: true });
}
