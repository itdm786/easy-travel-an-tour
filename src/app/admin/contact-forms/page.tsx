import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContactInbox } from "@/components/admin/ContactInbox";
import { getAdminSession } from "@/lib/admin-auth";
import { getContactLeads } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Forms | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContactFormsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const contactRows = await getContactLeads();
  const initialContacts = JSON.parse(JSON.stringify(contactRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Contact Forms"
      description="Website ke Contact page se aane wali submissions yahan manage karein."
    >
      <ContactInbox initialContacts={initialContacts} />
    </AdminShell>
  );
}
