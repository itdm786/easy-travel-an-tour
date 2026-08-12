import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { upsertSeoSetting } from "@/lib/cms";

type Props = { params: Promise<{ pageKey: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager", "editor"]);
  if (error) return error;

  const { pageKey } = await params;
  const body = await request.json();

  const updated = await upsertSeoSetting(pageKey, {
    metaTitle: body.metaTitle ? String(body.metaTitle) : "",
    metaDescription: body.metaDescription ? String(body.metaDescription) : "",
    metaKeywords: body.metaKeywords ? String(body.metaKeywords) : "",
    ogImage: body.ogImage ? String(body.ogImage) : "",
  });

  return NextResponse.json({ page: updated });
}
