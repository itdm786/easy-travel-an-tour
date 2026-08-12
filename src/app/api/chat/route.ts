import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitorName = String(body.visitorName || body.name || "Guest Traveler").trim();
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const inserted = await db
      .insert(chatMessages)
      .values({
        visitorName,
        visitorEmail: body.visitorEmail ? String(body.visitorEmail) : null,
        visitorPhone: body.visitorPhone ? String(body.visitorPhone) : null,
        page: body.page ? String(body.page) : null,
        message,
        status: "open",
      })
      .returning();

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your message has been sent directly to the Easy Travel admin portal.",
      chat: inserted[0],
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to send chat message" }, { status: 500 });
  }
}
