import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SeoManager } from "@/components/admin/SeoManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getSeoSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SEO Manager | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSeoManagerPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rows = await getSeoSettings();
  const initialPages = JSON.parse(JSON.stringify(rows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="SEO Manager"
      description="Har page ke Google search title, description aur keywords control karein."
    >
      <SeoManager initialPages={initialPages} />
    </AdminShell>
  );
}
