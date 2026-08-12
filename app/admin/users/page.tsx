import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { UserManager } from "@/components/admin/UserManager";
import { getAdminSession, canManageUsers } from "@/lib/admin-auth";
import { getAdminUsers } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team Users | Easy Travel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminUsersPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (!canManageUsers(session.role)) {
    redirect("/admin");
  }

  const userRows = await getAdminUsers();
  const initialUsers = JSON.parse(
    JSON.stringify(userRows.map(({ passwordHash, ...user }) => user))
  );

  return (
    <AdminShell
      email={session.email}
      name={session.name}
      role={session.role}
      title="Team Users & Roles"
      description="Add co-admins, managers, and editors. Reset their portal passwords from here."
    >
      <UserManager initialUsers={initialUsers} />
    </AdminShell>
  );
}
