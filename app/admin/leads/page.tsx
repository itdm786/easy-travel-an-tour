import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";
import { getContactLeads } from "@/lib/cms";
import { Mail, Phone, UserRound } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads Inbox | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const contactLeads = await getContactLeads();
  const leads = contactLeads.length
    ? contactLeads
    : [
        {
          id: 0,
          name: "Demo Lead",
          email: "demo@example.com",
          phone: "+92 300 0000000",
          service: "Umrah Package",
          message: "This demo row disappears after real contact form submissions arrive.",
          read: false,
          createdAt: new Date(),
        },
      ];

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Leads Inbox"
      description="Track real contact form submissions, booking inquiries, visa requests, hotel requests, flight requests, and corporate leads."
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
        <div className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">
          <div className="col-span-4">Customer</div>
          <div className="col-span-3 hidden md:block">Service</div>
          <div className="col-span-2 hidden lg:block">Status</div>
          <div className="col-span-3 text-right">Date</div>
        </div>
        <div className="divide-y divide-white/10">
          {leads.map((lead) => (
            <div key={lead.id} className="grid grid-cols-12 gap-4 px-6 py-5 transition-all hover:bg-white/[0.03]">
              <div className="col-span-9 md:col-span-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{lead.name}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/45">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                      {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>}
                    </div>
                    <p className="mt-2 text-sm text-white/50 md:hidden">{lead.service || "General"}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-white/45">{lead.message}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-3 hidden text-sm text-white/60 md:block">{lead.service || "General Inquiry"}</div>
              <div className="col-span-2 hidden lg:block">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{lead.read ? "Read" : "New"}</span>
              </div>
              <div className="col-span-3 text-right text-sm text-white/45">
                {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "Just now"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
