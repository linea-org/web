"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const subscribe = () => () => {};
const onLiveHost = () => window.location.hostname.endsWith("getlinea.app");

/**
 * Site analytics. Skipped on the Sanity Studio so editors do not count as traffic, and Google
 * Analytics only loads on getlinea.app so localhost and preview builds stay out of the numbers.
 */
export function SiteAnalytics() {
  const pathname = usePathname();
  const isLiveHost = useSyncExternalStore(subscribe, onLiveHost, () => false);

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      <VercelAnalytics />
      {GA_ID && isLiveHost ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
}
