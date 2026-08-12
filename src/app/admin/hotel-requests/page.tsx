import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceRequestManager } from "@/components/admin/ServiceRequestManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getServiceRequests } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hotel Requests | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminHotelRequestsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rows = await getServiceRequests("hotel");
  const initialRequests = JSON.parse(JSON.stringify(rows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Hotel Requests"
      description="Website ke Hotels page se aane wali requests yahan track karein."
    >
      <ServiceRequestManager
        initialRequests={initialRequests}
        emptyMessage="Koi hotel request abhi tak nahi aayi."
      />
    </AdminShell>
  );
}
