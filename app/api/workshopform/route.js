import WorkshopDetails from "@/components/emailTemplate/WorkshopDetails";
import WorkshopAutoResponse from "@/components/emailTemplate/WorkshopAutoResponse";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, designation, company, number, terms, pageUrl } = body;

    if (!name || !email || !company || !terms || !designation || !number) {
      return new Response(JSON.stringify({ error: "Required fields missing" }), { status: 400 });
    }

    // Send notification email to your team
    const { error: teamEmailError } = await resend.emails.send({
      from:"Web Forms <no-reply@datasciencewizards.ai>",
      to: ["vidushi@weareenigma.com"],
      subject: "New Workshop Form Submission",
      react: WorkshopDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        userTerms: terms,
        pageUrl: pageUrl || "Not provided",
      }),
    });

    if (teamEmailError) {
      console.error("Team Email Error:", teamEmailError);
      return new Response(JSON.stringify({ error: teamEmailError }), { status: 400 });
    }

    // Send auto-response email to the user
    const { error: autoResponseError } = await resend.emails.send({
      from:"DSW Team <no-reply@datasciencewizards.ai>",
      to: [email],
      subject: "Workshop Registration - DSW",
      react: WorkshopAutoResponse({ userName: name }),
    });

    if (autoResponseError) {
      console.error("Auto-response Email Error:", autoResponseError);
      // Don't fail the request if auto-response fails, but log it
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("API Error:", err?.message || err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}