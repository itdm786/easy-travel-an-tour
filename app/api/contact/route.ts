import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(contacts)
      .values({
        name: String(name),
        email: String(email),
        phone: phone ? String(phone) : null,
        service: service ? String(service) : null,
        message: String(message),
        read: false,
      })
      .returning();

    return NextResponse.json({
      success: true,
      lead: inserted[0],
      message: "Thank you for contacting us. We will get back to you within 24 hours.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
