import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await db
      .insert(newsletterSubscribers)
      .values({ email, active: true })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: { active: true },
      });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
