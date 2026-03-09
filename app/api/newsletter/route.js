import { Resend } from "resend";
import { render } from "@react-email/render";
import { isEmailDomainBlocked } from "@/lib/blockedEmailDomains";
import { verifyEmailWithZeroBounce } from "@/lib/emailVerification";
import NewsletterAutoResponse from "@/components/emailTemplate/NewsletterAutoResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, userName } = body; // allow optional name

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    if (isEmailDomainBlocked(email)) {
      return new Response(
        JSON.stringify({
          error: "Please use your business email address to subscribe.",
          code: "BLOCKED_DOMAIN",
        }),
        { status: 400 }
      );
    }

    const verifyData = await verifyEmailWithZeroBounce(email);
    if (!verifyData.valid) {
      let errorMessage = "Please enter a valid business email address.";

      if (verifyData.didYouMean) errorMessage = `Did you mean ${verifyData.didYouMean}?`;
      else if (verifyData.status === "invalid") errorMessage = "This email address is invalid.";
      else if (verifyData.status === "spamtrap" || verifyData.status === "abuse")
        errorMessage = "This email address cannot be used.";
      else if (verifyData.freeEmail) errorMessage = "Please use your business email address.";

      return new Response(
        JSON.stringify({
          error: errorMessage,
          code: "INVALID_EMAIL",
          suggestion: verifyData.didYouMean || null,
        }),
        { status: 400 }
      );
    }

    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    if (!segmentId) {
      return new Response(
        JSON.stringify({
          error:
            "Newsletter service not configured. Please add RESEND_NEWSLETTER_SEGMENT_ID to your .env.local file.",
        }),
        { status: 500 }
      );
    }

    // 1) Create contact
    const { data: contactData, error: contactError } =
      await resend.contacts.create({
        email,
        unsubscribed: false,
        segmentId,
      });

    if (contactError) {
      if (
        contactError.message?.includes("already exists") ||
        contactError.message?.includes("Contact already") ||
        contactError.statusCode === 422
      ) {
        return new Response(
          JSON.stringify({
            error: "This email is already subscribed to our newsletter.",
            code: "ALREADY_SUBSCRIBED",
          }),
          { status: 400 }
        );
      }

      return new Response(
        JSON.stringify({
          error: "Failed to subscribe. Please try again later.",
          code: "SUBSCRIPTION_FAILED",
          details: contactError.message,
        }),
        { status: 500 }
      );
    }
   // 2) Send autoresponse email (welcome/confirmation)
console.log("Attempting to send email to:", email);

const { data: mailData, error: mailError } = await resend.emails.send({
  from:"DSW Team <no-reply@datasciencewizards.ai>",
  to: [email],
  subject: "Welcome to DSW Newsletter 🎉",
  react: NewsletterAutoResponse({ userName: userName || "there" }),
});

console.log("Mail send result:", { data: mailData, error: mailError });

if (mailError) {
  console.error("Email send error:", mailError);
  return new Response(
    JSON.stringify({
      success: true,
      message: "Subscribed successfully, but autoresponse email failed.",
      code: "WELCOME_EMAIL_FAILED",
      details: mailError.message,
      contactId: contactData?.id,
    }),
    { status: 200 }
  );
}
console.log("Email sent successfully. Email ID:", mailData?.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully subscribed to newsletter!",
        contactId: contactData?.id,
        emailId: mailData?.id,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "An error occurred. Please try again later.",
        code: "INTERNAL_ERROR",
      }),
      { status: 500 }
    );
  }
}
