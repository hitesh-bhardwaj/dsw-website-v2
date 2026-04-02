// app/api/livedemoform/route.js

import LiveDemoDetails from "@/components/emailTemplate/LiveDemoDetails";
import DemoAutoResponse from "@/components/emailTemplate/DemoAutoResponse";
import { Resend } from "resend";
import { logToGoogleSheet } from "@/lib/logToGoogleSheet";

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
      downloaded,
      downloadedPdfName,
      downloadedPdfUrl,
      pageUrl,
    } = body;

    if (!name || !email || !company || !designation || !number) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const submittedPageUrl =
      pageUrl || req.headers.get("referer") || "Not provided";

    const subject = "New Live Demo Request Received";
    const category = "live_demo_request";
    const tagsForSheet = ["live-demo", "website"];

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
        { name: "form_type", value: "live_demo" },
        { name: "source", value: "website" },
      ],

      react: LiveDemoDetails({
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
      return new Response(
        JSON.stringify({ error: teamEmailError }),
        { status: 400 }
      );
    }

    await logToGoogleSheet({
      formType: "Live Demo",
      subject,
      category,
      tags: tagsForSheet,
      name,
      email,
      designation,
      company,
      number,
      downloadedPdfName: downloaded ? downloadedPdfName : "",
      pageUrl: submittedPageUrl,
    });

    const { error: autoResponseError } = await resend.emails.send({
      // 🔵 PRODUCTION CONFIG
      // from: "DSW Team <no-reply@datasciencewizards.ai>",
      // to: [email],

      // 🟡 TEST CONFIG
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject: "We've Received Your Live Demo Request",

      tags: [
        { name: "category", value: "live_demo_autoresponse" },
        { name: "form_type", value: "live_demo" },
        { name: "source", value: "website" },
      ],

      react: DemoAutoResponse({ userName: name }),
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