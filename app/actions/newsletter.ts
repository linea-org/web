"use server";

export type NewsletterState =
  | { status: "idle" }
  | { status: "subscribed"; email: string }
  | { status: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_CONTACTS_URL = "https://api.resend.com/contacts";

const FAILED: NewsletterState = {
  status: "error",
  message: "Something went wrong. Try again.",
};

/**
 * Adds the address as a Resend contact (POST /contacts), optionally into the
 * segment named by RESEND_NEWSLETTER_SEGMENT_ID so Broadcasts can target it.
 * Without RESEND_API_KEY the signup only succeeds in development, so
 * production never drops addresses silently.
 */
export async function subscribe(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      return { status: "subscribed", email };
    }
    return {
      status: "error",
      message: "Signups are not open yet. Check back soon.",
    };
  }

  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

  try {
    const response = await fetch(RESEND_CONTACTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      return { status: "subscribed", email };
    }

    const detail = await response.text();

    // Signing up twice is not an error for the visitor: they are on the list either way.
    if (/already exists/i.test(detail)) {
      return { status: "subscribed", email };
    }

    if (response.status === 429) {
      return {
        status: "error",
        message: "Too many signups right now. Try again in a minute.",
      };
    }

    // Visible in server logs; a 401/403 here usually means a sending-only API key.
    console.error(`Resend contact signup failed (${response.status}): ${detail}`);
    return FAILED;
  } catch (error) {
    console.error("Resend contact signup failed:", error);
    return FAILED;
  }
}
