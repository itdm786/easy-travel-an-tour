import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { DestinationManager } from "@/components/admin/DestinationManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getCmsDestinations } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations Manager | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDestinationsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const destinationRows = await getCmsDestinations();
  const initialDestinations = JSON.parse(JSON.stringify(destinationRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Destination Management"
      description="Edit public destination cards, images, ratings, and destination copy."
    >
      <DestinationManager initialDestinations={initialDestinations} />
    </AdminShell>
  );
}
