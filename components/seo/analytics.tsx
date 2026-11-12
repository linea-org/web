"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Site analytics. Skipped on the Sanity Studio so editors do not count as traffic. */
export function SiteAnalytics() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      <VercelAnalytics />
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
}
