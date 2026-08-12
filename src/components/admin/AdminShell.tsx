import Link from "next/link";
import { ReactNode } from "react";
import {
  BarChart3,
  BookOpenText,
  Briefcase,
  Compass,
  FileText,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  Mail,
  MessageCircle,
  PlaneTakeoff,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import type { AdminRole } from "@/lib/cms";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Packages", href: "/admin/packages", icon: Briefcase },
  { label: "Destinations", href: "/admin/destinations", icon: Compass },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpenText },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Visa Requests", href: "/admin/visa-requests", icon: ShieldCheck },
  { label: "Flight Requests", href: "/admin/flight-requests", icon: PlaneTakeoff },
  { label: "Hotel Requests", href: "/admin/hotel-requests", icon: Home },
  { label: "Umrah Requests", href: "/admin/umrah-requests", icon: Compass },
  { label: "Contact Forms", href: "/admin/contact-forms", icon: Mail },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "SEO Manager", href: "/admin/seo-manager", icon: Search },
  { label: "Homepage Builder", href: "/admin/homepage-builder", icon: LayoutTemplate },
  { label: "Media Library", href: "/admin/media-library", icon: FileText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Live Chat", href: "/admin/chat", icon: MessageCircle },
  { label: "Team Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function formatRole(role?: AdminRole) {
  if (!role) return "Super Admin";
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AdminShell({
  children,
  email,
  name,
  role,
  title,
  description,
}: {
  children: ReactNode;
  email: string;
  name?: string;
  role?: AdminRole;
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-[#08172b] text-white">
      <div className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:block">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
            <Compass className="h-7 w-7" />
          </div>
          <div>
            <p className="font-display text-xl font-bold">Easy Travel</p>
            <p className="text-xs tracking-[0.2em] text-white/40 uppercase">Admin Portal</p>
          </div>
        </Link>

        <nav className="mt-10 space-y-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-5 w-5 text-accent" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/60 transition-all hover:border-accent/40 hover:text-accent"
          >
            <Home className="h-4 w-4" />
            View Website
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#08172b]/80 px-6 py-4 backdrop-blur-xl lg:px-10">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-accent">
                <ShieldCheck className="h-4 w-4" />
                Portal session: {name || email} · {email}
              </div>
              <h1 className="mt-1 font-display text-2xl font-bold md:text-3xl">{title}</h1>
              {description && <p className="mt-1 text-sm text-white/50">{description}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-xs text-white/40">Role</p>
                <p className="text-sm font-semibold text-accent">{formatRole(role)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-xs text-white/40">Portal Header</p>
                <p className="text-sm font-semibold text-white">Admin Only</p>
              </div>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

export const adminModules = [
  { label: "Packages Management", icon: Briefcase, status: "Editable" },
  { label: "Destination Management", icon: Compass, status: "CMS Ready" },
  { label: "Blog Management", icon: FileText, status: "Editable" },
  { label: "Leads", icon: Inbox, status: "Live" },
  { label: "Customers", icon: Users, status: "Ready" },
  { label: "Visa Requests", icon: ShieldCheck, status: "Ready" },
  { label: "Live Chat Bot", icon: MessageCircle, status: "Live" },
  { label: "Testimonials", icon: Star, status: "Ready" },
  { label: "Analytics Dashboard", icon: BarChart3, status: "Ready" },
];
