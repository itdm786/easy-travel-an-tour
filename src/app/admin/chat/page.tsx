import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ChatInbox } from "@/components/admin/ChatInbox";
import { getAdminSession } from "@/lib/admin-auth";
import { getChatMessages } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Chat Inbox | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminChatPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const chatRows = await getChatMessages();
  const initialMessages = JSON.parse(JSON.stringify(chatRows));

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Live Chat Inbox"
      description="Website bot messages arrive here directly for admin/manager follow-up."
    >
      <ChatInbox initialMessages={initialMessages} />
    </AdminShell>
  );
}
