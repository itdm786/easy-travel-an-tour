import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { deleteMediaAsset } from "@/lib/cms";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);
  if (!numericId) {
    return NextResponse.json({ error: "Invalid media id" }, { status: 400 });
  }

  await deleteMediaAsset(numericId);
  return NextResponse.json({ success: true });
}
