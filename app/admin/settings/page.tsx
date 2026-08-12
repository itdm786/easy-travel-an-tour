import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getBrandingSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Settings | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const settings = await getBrandingSettings();
  const initialSettings = JSON.parse(JSON.stringify(settings));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Settings, Logo & Password"
      description="Reset your portal password and manage website logo, favicon, and display dimensions."
    >
      <SettingsManager initialSettings={initialSettings} />
    </AdminShell>
  );
}
