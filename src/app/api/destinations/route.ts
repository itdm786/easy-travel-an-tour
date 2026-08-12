import { NextResponse } from "next/server";
import { getCmsDestinations } from "@/lib/cms";

export async function GET() {
  const rows = await getCmsDestinations();
  return NextResponse.json({ destinations: rows });
}
