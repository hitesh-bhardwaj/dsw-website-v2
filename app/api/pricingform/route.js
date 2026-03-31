// app/api/pricingform/route.js

import { Resend } from "resend";
import PricingDetails from "@/components/emailTemplate/PricingDetails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      designation,
      company,
      number,
      pageUrl,
    } = body;

    if (!name || !email || !company || !designation || !number) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const subject = "Pricing Inquiry";

    const submittedPageUrl =
      pageUrl || req.headers.get("referer") || "Not provided";

    const { error: teamEmailError } = await resend.emails.send({
      from: "Web Forms <no-reply@datasciencewizards.ai>",
      to: ["vidushi@weareenigma.com", "contact@datasciencewizards.ai"],
      subject,
      react: PricingDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        pageUrl: submittedPageUrl,
      }),
    });

    if (teamEmailError) {
      console.error("Team Email Error:", teamEmailError);
      return new Response(JSON.stringify({ error: teamEmailError }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API Error:", err?.message || err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}