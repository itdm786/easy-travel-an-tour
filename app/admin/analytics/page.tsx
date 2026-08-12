import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin-auth";
import { getAnalyticsSummary } from "@/lib/cms";
import {
  BookOpenText,
  Briefcase,
  Compass,
  Inbox,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics | Easy Travel Admin",
  robots: { index: false, follow: false },
};

const TYPE_LABELS: Record<string, string> = {
  visa: "Visa Requests",
  flight: "Flight Requests",
  hotel: "Hotel Requests",
  umrah: "Umrah Requests",
};

export default async function AdminAnalyticsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const stats = await getAnalyticsSummary();

  const cards = [
    { label: "Packages", value: stats.totalPackages, icon: Briefcase },
    { label: "Destinations", value: stats.totalDestinations, icon: Compass },
    { label: "Blog Posts", value: stats.totalBlogPosts, icon: BookOpenText },
    { label: "Customers", value: stats.totalCustomers, icon: Users },
    { label: "Contact Forms", value: stats.totalContacts, icon: Inbox },
    { label: "Live Chats", value: stats.totalChats, icon: MessageCircle },
    { label: "Testimonials", value: stats.totalTestimonials, icon: Star },
    { label: "Service Requests", value: stats.totalServiceRequests, icon: Inbox },
  ];

  const maxRequestCount = Math.max(1, ...stats.requestsByType.map((row) => row.count));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Analytics"
      description="Website ke overall data ka summary."
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <Icon className="h-5 w-5 text-accent" />
              <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
              <p className="mt-1 text-xs text-white/50">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-display text-lg font-bold text-white">Service Requests by Type</h3>
          <div className="space-y-3">
            {stats.requestsByType.map((row) => (
              <div key={row.type}>
                <div className="mb-1 flex justify-between text-xs text-white/50">
                  <span>{TYPE_LABELS[row.type] || row.type}</span>
                  <span>{row.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(row.count / maxRequestCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-display text-lg font-bold text-white">Quick Status</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex justify-between">
              <span>Unread Contact Forms</span>
              <span className="font-semibold text-accent">{stats.unreadContacts}</span>
            </li>
            <li className="flex justify-between">
              <span>Open Live Chats</span>
              <span className="font-semibold text-accent">{stats.openChats}</span>
            </li>
            <li className="flex justify-between">
              <span>New Service Requests</span>
              <span className="font-semibold text-accent">{stats.newServiceRequests}</span>
            </li>
            <li className="flex justify-between">
              <span>Approved Testimonials</span>
              <span className="font-semibold text-accent">
                {stats.approvedTestimonials} / {stats.totalTestimonials}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
