"use server";

export type NewsletterState =
  | { status: "idle" }
  | { status: "subscribed"; email: string }
  | { status: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Forwards the address to NEWSLETTER_WEBHOOK_URL as JSON `{ email }`.
 * Without that variable the signup only succeeds in development, so production never drops addresses silently.
 */
export async function subscribe(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      return { status: "subscribed", email };
    }
    return {
      status: "error",
      message: "Signups are not open yet. Check back soon.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return { status: "error", message: "Something went wrong. Try again." };
    }
  } catch {
    return { status: "error", message: "Something went wrong. Try again." };
  }

  return { status: "subscribed", email };
}
