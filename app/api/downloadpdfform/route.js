// app/api/downloadpdfform/route.js

import { Resend } from "resend";
import DownloadPdfDetails from "@/components/emailTemplate/DownloadPdfDetails";
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
      downloadedPdfName,
      downloadedPdfUrl,
      pageUrl,
    } = body;

    if (!name || !email || !company || !designation || !number) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const subject = "New PDF Download Lead";
    const category = "pdf_download";

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["harsh@weareenigma.com"],

      subject,

      tags: [
        { name: "category", value: category },
        { name: "form_type", value: "pdf_download" },
      ],

      react: DownloadPdfDetails({
        userName: name,
        userEmail: email,
        userCompany: company,
        userDesignation: designation,
        userNumber: number,
        downloadedPdfName,
        pageUrl,
      }),
    });

    if (error) throw error;

    await logToGoogleSheet({
      formType: "PDF Download",
      subject,
      category,
      tags: ["pdf", "download"],
      name,
      email,
      designation,
      company,
      number,
      downloadedPdfName,
      pageUrl,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}