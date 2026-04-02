// lib/logToGoogleSheet.js

export async function logToGoogleSheet(payload) {
  try {
    const scriptUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

    if (!scriptUrl || !secret) {
      console.warn("Google Sheets webhook env vars missing", {
        hasUrl: !!scriptUrl,
        hasSecret: !!secret,
      });
      return;
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        ...payload,
      }),
    });

    const text = await res.text();
    console.log("Google Sheets webhook response:", text);

    if (!res.ok) {
      console.error("Google Sheets webhook failed:", res.status, text);
    }
  } catch (error) {
    console.error("Google Sheets logging failed:", error);
  }
}