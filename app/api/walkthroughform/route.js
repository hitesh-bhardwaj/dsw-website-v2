// app/api/walkthroughform/route.js

import { Resend } from "resend";
import WalkthroughAutoResponse from "@/components/emailTemplate/WalkthroughAutoResponse";
import WalkthroughDetails from "@/components/emailTemplate/WalkthorughDetails";
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

    const subject = "Demo Walkthrough";
    const category = "walkthrough_request";
    const tagsForSheet = ["walkthrough", "website"];

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
        { name: "form_type", value: "walkthrough" },
        { name: "source", value: "website" },
      ],

      react: WalkthroughDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        downloadedPdfName: downloaded ? downloadedPdfName : undefined,
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
      formType: "Walkthrough",
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

    const autoResponseSubject =
      "Thank you for taking the UnifyAI Product Walkthrough!";

    const { error: autoResponseError } = await resend.emails.send({
      // 🔵 PRODUCTION CONFIG
      // from: "DSW Team <no-reply@datasciencewizards.ai>",
      // to: [email],

      // 🟡 TEST CONFIG
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject: autoResponseSubject,

      tags: [
        { name: "category", value: "walkthrough_autoresponse" },
        { name: "form_type", value: "walkthrough" },
        { name: "source", value: "website" },
      ],

      react: WalkthroughAutoResponse({
        userName: name,
        downloadedPdfName: downloaded ? downloadedPdfName : undefined,
      }),
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