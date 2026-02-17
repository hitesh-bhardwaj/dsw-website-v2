// app/api/verify-email/route.js

import { verifyEmailWithZeroBounce } from "@/lib/emailVerification";



export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    const result = await verifyEmailWithZeroBounce(email);

    return new Response(
      JSON.stringify(result),
      { status: 200 }
    );

  } catch (err) {
    console.error("Email Verification Error:", err?.message || err);

    if (err.message?.includes("not configured")) {
      return new Response(
        JSON.stringify({ error: "Email verification service not configured" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ error: "Email verification failed" }),
      { status: 500 }
    );
  }
}
