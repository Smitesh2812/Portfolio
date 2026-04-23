import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ContactSchema.parse(body);

    // In production: send to email service (Resend, SendGrid, etc.)
    // For now, we simulate processing and return success
    console.log("Contact form submission:", data);

    // Simulate slight processing delay (edge function reality)
    await new Promise((r) => setTimeout(r, 200));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 24 hours.",
        submittedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
