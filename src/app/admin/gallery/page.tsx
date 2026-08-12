import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaManager } from "@/components/admin/MediaManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getMediaAssets } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rows = await getMediaAssets("gallery");
  const initialAssets = JSON.parse(JSON.stringify(rows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Gallery"
      description="Website ki photo gallery ke liye images manage karein."
    >
      <MediaManager
        initialAssets={initialAssets}
        category="gallery"
        emptyMessage="Gallery mein abhi koi image nahi hai."
      />
    </AdminShell>
  );
}
