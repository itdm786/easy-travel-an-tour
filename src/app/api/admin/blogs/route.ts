import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { getCmsBlogs } from "@/lib/cms";
import { slugify } from "@/lib/utils";

const allowed = ["super_admin", "admin", "manager", "editor"] as const;

export async function GET() {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;
  const blogs = await getCmsBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin([...allowed]);
  if (error) return error;

  const body = await request.json();
  const title = String(body.title || "").trim();

  if (!title) {
    return NextResponse.json({ error: "Blog title is required" }, { status: 400 });
  }

  const inserted = await db
    .insert(blogPosts)
    .values({
      title,
      slug: slugify(String(body.slug || title)),
      excerpt: String(body.excerpt || ""),
      content: String(body.content || ""),
      image: String(body.image || "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"),
      author: String(body.author || "Easy Travel Editorial Team"),
      category: String(body.category || "Travel Guide"),
      tags: Array.isArray(body.tags) ? body.tags : [],
      readTime: String(body.readTime || "5 min read"),
      published: Boolean(body.published),
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json({ blog: inserted[0] });
}
