import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/utils";

const allowed = ["super_admin", "admin", "manager", "editor"] as const;

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
  }

  const updated = await db
    .update(blogPosts)
    .set({
      title: String(body.title || "").trim(),
      slug: slugify(String(body.slug || body.title || "blog-post")),
      excerpt: String(body.excerpt || ""),
      content: String(body.content || ""),
      image: String(body.image || ""),
      author: String(body.author || "Easy Travel Editorial Team"),
      category: String(body.category || "Travel Guide"),
      tags: Array.isArray(body.tags) ? body.tags : [],
      readTime: String(body.readTime || "5 min read"),
      published: Boolean(body.published),
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, numericId))
    .returning();

  return NextResponse.json({ blog: updated[0] });
}

export async function DELETE(_request: Request, { params }: Props) {
  const { error } = await requireAdmin(["super_admin", "admin", "manager"]);
  if (error) return error;

  const { id } = await params;
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
  }

  await db.delete(blogPosts).where(eq(blogPosts.id, numericId));
  return NextResponse.json({ success: true });
}
