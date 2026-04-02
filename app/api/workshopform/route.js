// app/api/workshopform/route.js

import WorkshopDetails from "@/components/emailTemplate/WorkshopDetails";
import WorkshopAutoResponse from "@/components/emailTemplate/WorkshopAutoResponse";
import { Resend } from "resend";
import { logToGoogleSheet } from "@/lib/logToGoogleSheet";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, designation, company, number, terms, pageUrl } = body;

    if (!name || !email || !company || !terms || !designation || !number) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const submittedPageUrl =
      pageUrl || req.headers.get("referer") || "Not provided";

    const subject = "New Workshop Form Submission";
    const category = "workshop_request";
    const tagsForSheet = ["workshop", "website"];

    const { error: teamEmailError } = await resend.emails.send({
      // 🔵 PRODUCTION CONFIG
      // from: "Web Forms <no-reply@datasciencewizards.ai>",
      // to: ["vidushi@weareenigma.com", "contact@datasciencewizards.ai"],

      // 🟡 TEST CONFIG
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject,

      tags: [
        { name: "category", value: category },
        { name: "form_type", value: "workshop" },
        { name: "source", value: "website" },
      ],

      react: WorkshopDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        userTerms: terms,
        pageUrl: submittedPageUrl,
      }),
    });

    if (teamEmailError) {
      console.error("Team Email Error:", teamEmailError);
      return new Response(JSON.stringify({ error: teamEmailError }), {
        status: 400,
      });
    }

    await logToGoogleSheet({
      formType: "Workshop",
      subject,
      category,
      tags: tagsForSheet,
      name,
      email,
      designation,
      company,
      number,
      terms: String(terms),
      pageUrl: submittedPageUrl,
    });

    const autoResponseSubject = "Workshop Registration - DSW";

    const { error: autoResponseError } = await resend.emails.send({
      // 🔵 PRODUCTION CONFIG
      // from: "DSW Team <no-reply@datasciencewizards.ai>",
      // to: [email],

      // 🟡 TEST CONFIG
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject: autoResponseSubject,

      tags: [
        { name: "category", value: "workshop_autoresponse" },
        { name: "form_type", value: "workshop" },
        { name: "source", value: "website" },
      ],

      react: WorkshopAutoResponse({ userName: name }),
    });

    if (autoResponseError) {
      console.error("Auto-response Email Error:", autoResponseError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API Error:", err?.message || err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}