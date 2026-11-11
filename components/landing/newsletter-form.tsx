"use client";

import { useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";

const INITIAL: NewsletterState = { status: "idle" };

function StatusLine({ state }: { state: NewsletterState }) {
  switch (state.status) {
    case "idle":
      return (
        <p className="text-sm text-balance text-[#1c1917]/80">
          One email when something ships. Unsubscribe anytime.
        </p>
      );
    case "subscribed":
      return (
        <p className="text-sm font-medium text-[#1c1917]">
          You are on the list. Watch {state.email} for the next note.
        </p>
      );
    case "error":
      return (
        <p className="text-sm font-medium text-[#7f1d1d]">{state.message}</p>
      );
    default: {
      const _never: never = state;
      return _never;
    }
  }
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, INITIAL);

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        action={action}
        className="flex flex-col gap-2 sm:flex-row sm:rounded-[12px] sm:bg-white/55 sm:p-1.5 sm:shadow-[0_16px_40px_-20px_rgba(28,25,23,0.5)] sm:ring-1 sm:ring-black/10 sm:backdrop-blur-sm"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          disabled={state.status === "subscribed"}
          className="h-11 w-full min-w-0 rounded-[8px] sm:flex-1 bg-white/75 px-3.5 text-base text-[#1c1917] shadow-[0_8px_24px_-16px_rgba(28,25,23,0.6)] ring-1 ring-black/10 outline-none placeholder:text-[#1c1917]/45 focus-visible:bg-white/90 focus-visible:ring-2 focus-visible:ring-[#2563eb]/50 sm:h-10 sm:bg-transparent sm:px-3 sm:text-sm sm:shadow-none sm:ring-0 sm:focus-visible:bg-white/60 sm:focus-visible:ring-0"
        />
        <button
          type="submit"
          disabled={pending || state.status === "subscribed"}
          className="lp-btn lp-btn-primary inline-flex h-11 shrink-0 items-center justify-center rounded-[8px] bg-black px-4 text-sm font-medium tracking-tight text-white disabled:opacity-60 sm:h-10"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <div aria-live="polite" className="mt-3 min-h-5">
        <StatusLine state={state} />
      </div>
    </div>
  );
}
