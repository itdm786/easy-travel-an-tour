import { NextResponse } from "next/server";
import { getCmsBlogs } from "@/lib/cms";

export async function GET() {
  const rows = await getCmsBlogs();
  return NextResponse.json({ blogs: rows.filter((blog) => blog.published) });
}
