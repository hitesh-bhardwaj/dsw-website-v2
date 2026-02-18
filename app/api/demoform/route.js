// app/api/demoform/route.js
import DemoDetails from "@/components/emailTemplate/DemoDetails";
import DemoAutoResponse from "@/components/emailTemplate/DemoAutoResponse";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, designation, company, number, pageUrl } = body;

    if (!name || !email || !company || !designation || !number) {
      return new Response(
        JSON.stringify({ error: "Required fields missing" }),
        { status: 400 }
      );
    }

    // Send notification email to your team
    const { error: teamEmailError } = await resend.emails.send({
      from:"Web Forms <no-reply@datasciencewizards.ai>",
      to: ["vidushi@weareenigma.com","contact@datasciencewizards.ai"],
      subject: "New Demo Request Received",
      react: DemoDetails({
        userName: name,
        userEmail: email,
        userDesignation: designation,
        userCompany: company,
        userNumber: number,
        pageUrl: pageUrl || "Not provided",
      }),
    });

    if (teamEmailError) {
      console.error("Team Email Error:", teamEmailError);
      return new Response(
        JSON.stringify({ error: teamEmailError }), 
        { status: 400 }
      );
    }

    // Send auto-response email to the user
    const { error: autoResponseError } = await resend.emails.send({
      from:"DSW Team <no-reply@datasciencewizards.ai>",
      to: [email],
      subject: "We've Received Your Demo Request",
      react: DemoAutoResponse({ userName: name }),
    });

    if (autoResponseError) {
      console.error("Auto-response Email Error:", autoResponseError);
      // Don't fail the request if auto-response fails
    }

    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200 }
    );
  } catch (err) {
    console.error("API Error:", err?.message || err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { status: 500 }
    );
  }
}