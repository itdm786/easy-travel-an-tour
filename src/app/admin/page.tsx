import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell, adminModules } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminUsers, getChatMessages, getCmsBlogs, getCmsDestinations, getCmsPackages } from "@/lib/cms";
import { BarChart3, CalendarCheck, DollarSign, Inbox, Plane, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Easy Travel & Tours",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [packageRows, destinationRows, blogRows, chatRows, userRows] = await Promise.all([
    getCmsPackages(),
    getCmsDestinations(),
    getCmsBlogs(),
    getChatMessages(),
    getAdminUsers(),
  ]);

  const openChats = chatRows.filter((chat) => chat.status === "open").length;

  const stats = [
    { label: "Editable Packages", value: packageRows.length.toString(), icon: Plane, trend: "+CMS" },
    { label: "Destinations", value: destinationRows.length.toString(), icon: CalendarCheck, trend: "Live" },
    { label: "Blog Posts", value: blogRows.length.toString(), icon: Inbox, trend: "Editable" },
    { label: "Team Users", value: userRows.length.toString(), icon: DollarSign, trend: "RBAC" },
  ];

  const recentLeads = [
    ...chatRows.slice(0, 4).map((chat) => ({
      name: chat.visitorName,
      service: "Website Chat Bot",
      status: chat.status,
      value: chat.visitorPhone || chat.visitorEmail || "No contact",
    })),
    { name: "Ahmed Khan", service: "Umrah VIP Package", status: "New", value: "PKR 395,000" },
    { name: "Sara Malik", service: "Turkey Group Tour", status: "Contacted", value: "PKR 199,000" },
  ].slice(0, 4);

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Dashboard"
      description="Manage editable packages, blogs, leads, chat, roles, passwords, website logo, favicon, and portal settings."
    >
      <div className="mb-8 rounded-3xl border border-accent/20 bg-accent/10 p-6">
        <h2 className="font-display text-2xl font-bold text-white">Portal Status</h2>
        <p className="mt-2 text-sm text-white/60">
          Public website header/footer are hidden on all /admin routes for Super Admin, Admin, Manager, and Editor. Only the portal header is shown.
        </p>
        <p className="mt-2 text-sm text-accent">Open website chat messages: {openChats}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  <TrendingUp className="h-3 w-3" /> {stat.trend}
                </span>
              </div>
              <p className="mt-5 text-sm text-white/45">{stat.label}</p>
              <p className="mt-1 font-display text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">Admin Modules</h2>
              <p className="text-sm text-white/45">Requested admin areas are now structured with editable CMS sections.</p>
            </div>
            <BarChart3 className="h-6 w-6 text-accent" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {adminModules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.label} className="rounded-2xl border border-white/10 bg-black/10 p-4 transition-all hover:border-accent/40 hover:bg-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{module.label}</p>
                      <p className="text-xs text-accent">{module.status}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Recent Messages</h2>
              <p className="text-sm text-white/45">Latest chat/lead activity.</p>
            </div>
            <Link href="/admin/chat" className="text-sm font-semibold text-accent hover:text-accent-light">
              Chat inbox
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads.map((lead, index) => (
              <div key={`${lead.name}-${index}`} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{lead.name}</p>
                    <p className="text-sm text-white/45">{lead.service}</p>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{lead.status}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white/80">{lead.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
