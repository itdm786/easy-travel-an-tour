import { NextResponse } from "next/server";
import { getAdminSession, type AdminSessionPayload } from "@/lib/admin-auth";
import type { AdminRole } from "@/lib/cms";

export async function requireAdmin(allowedRoles?: AdminRole[]) {
  const session = await getAdminSession();

  if (!session) {
    return {
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session, error: null as null };
}

export type AuthorizedAdmin = AdminSessionPayload;
