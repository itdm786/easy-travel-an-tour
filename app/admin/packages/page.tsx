import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PackageManager } from "@/components/admin/PackageManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getCmsPackages } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Packages Manager | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPackagesPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const packageRows = await getCmsPackages();
  const initialPackages = JSON.parse(JSON.stringify(packageRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Packages Management"
      description="Add, edit, delete, and publish package content shown across the website."
    >
      <PackageManager initialPackages={initialPackages} />
    </AdminShell>
  );
}
