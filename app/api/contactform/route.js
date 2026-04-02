import AutoResponse from "@/components/emailTemplate/ContactAutoResponse";
import ContactDetails from "@/components/emailTemplate/ContactDetails";
import { logToGoogleSheet } from "@/lib/logToGoogleSheet";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("Sheets env check", {
  hasUrl: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
  hasSecret: !!process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
});

export async function POST(req) {

  try {
    const body = await req.json();
    const {
      name,
      email,
      designation,
      company,
      number,
      reason,
      message,
      terms,
      pageUrl,
    } = body;

    if (
      !name ||
      !email ||
      !company ||
      !reason ||
      !designation ||
      !number ||
      !terms
    ) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    const submittedPageUrl =
      pageUrl || req.headers.get("referer") || "Not provided";

    const subject = "New Contact Form Submission";
    const category = "contact_form";
    const tagsForSheet = ["contact", "website"];

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
        { name: "form_type", value: "contact" },
        { name: "source", value: "website" },
      ],

      react: ContactDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        userReason: reason,
        userMessage: message || "No message provided",
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
      formType: "Contact",
      subject,
      category,
      tags: tagsForSheet,
      name,
      email,
      designation,
      company,
      number,
      reason,
      message: message || "No message provided",
      terms: String(terms),
      pageUrl: submittedPageUrl,
    });

    const { error: autoResponseError } = await resend.emails.send({
      // 🔵 PRODUCTION CONFIG
      // from: "DSW Team <no-reply@datasciencewizards.ai>",
      // to: [email],

      // 🟡 TEST CONFIG
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject: "Thank you for contacting DSW",

      tags: [
        { name: "category", value: "contact_autoresponse" },
        { name: "form_type", value: "contact" },
        { name: "source", value: "website" },
      ],

      react: AutoResponse({
        userName: name,
      }),
    });

    if (autoResponseError) {
      console.error("Auto-response Email Error:", autoResponseError);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API Error:", err?.message || err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}