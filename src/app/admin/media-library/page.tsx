import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaManager } from "@/components/admin/MediaManager";
import { getAdminSession } from "@/lib/admin-auth";
import { getMediaAssets } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Library | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMediaLibraryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const rows = await getMediaAssets("general");
  const initialAssets = JSON.parse(JSON.stringify(rows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Media Library"
      description="General purpose images ke URLs store karein taake packages, blogs waghera mein use ho sakein."
    >
      <MediaManager
        initialAssets={initialAssets}
        category="general"
        emptyMessage="Media library mein abhi koi item nahi hai."
      />
    </AdminShell>
  );
}
