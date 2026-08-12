import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialManager } from "@/components/admin/TestimonialManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getTestimonials } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const testimonialRows = await getTestimonials();
  const initialTestimonials = JSON.parse(JSON.stringify(testimonialRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Testimonials"
      description="Customer reviews approve/hide karein. Sirf approved reviews website par live dikhengi."
    >
      <TestimonialManager initialTestimonials={initialTestimonials} />
    </AdminShell>
  );
}
