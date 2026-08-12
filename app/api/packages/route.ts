import { NextResponse } from "next/server";
import { getCmsPackages } from "@/lib/cms";

export async function GET() {
  const rows = await getCmsPackages();
  return NextResponse.json({ packages: rows });
}
