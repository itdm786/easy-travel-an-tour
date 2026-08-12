import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogManager } from "@/components/admin/BlogManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getCmsBlogs } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Manager | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBlogsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const blogRows = await getCmsBlogs();
  const initialBlogs = JSON.parse(JSON.stringify(blogRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Blog Management"
      description="Create, edit, publish, and delete SEO travel articles shown on the website."
    >
      <BlogManager initialBlogs={initialBlogs} />
    </AdminShell>
  );
}
