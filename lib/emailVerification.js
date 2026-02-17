/**
 * Shared email verification logic using ZeroBounce API
 * Used by both /api/verify-email and /api/newsletter
 */
export async function verifyEmailWithZeroBounce(email) {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;

  if (!apiKey) {
    throw new Error("ZEROBOUNCE_API_KEY is not configured");
  }

  // Call ZeroBounce API
  const zerobounceUrl = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  const response = await fetch(zerobounceUrl);

  if (!response.ok) {
    throw new Error(`ZeroBounce API error: ${response.status}`);
  }

  const data = await response.json();

  // ZeroBounce status values:
  // - valid: Email is valid
  // - invalid: Email is invalid
  // - catch-all: Domain accepts all emails
  // - unknown: Cannot determine validity
  // - spamtrap: Email is a spam trap
  // - abuse: Email is an abuse email
  // - do_not_mail: Do not mail this address

  const isValid = data.status === "valid" || data.status === "catch-all";

  return {
    valid: isValid,
    status: data.status,
    subStatus: data.sub_status,
    account: data.account,
    domain: data.domain,
    didYouMean: data.did_you_mean,
    freeEmail: data.free_email,
  };
}
