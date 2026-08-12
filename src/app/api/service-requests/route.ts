import { NextResponse } from "next/server";
import { createServiceRequest } from "@/lib/cms";

const ALLOWED_TYPES = ["visa", "flight", "hotel", "umrah"];

export async function POST(request: Request) {
  const body = await request.json();
  const type = String(body.type || "");

  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
  }
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { name, email, phone, type: _type, ...details } = body;

  const created = await createServiceRequest({
    type,
    name: String(name),
    email: email ? String(email) : undefined,
    phone: phone ? String(phone) : undefined,
    details,
  });

  return NextResponse.json({ request: created });
}
