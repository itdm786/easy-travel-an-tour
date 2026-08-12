import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { HomepageBuilder } from "@/components/admin/HomepageBuilder";
import { getAdminSession } from "@/lib/admin-auth";
import { getHomepageSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Homepage Builder | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminHomepageBuilderPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await getHomepageSettings();

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Homepage Builder"
      description="Homepage ka hero section (title, subtitle, background image, button) yahan se control karein."
    >
      <HomepageBuilder initialSettings={settings} />
    </AdminShell>
  );
}
