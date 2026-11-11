import type { ReactNode } from "react";
import { Announcement } from "@/components/landing/announcement";
import { Frame } from "@/components/landing/frame";
import { PageCta } from "@/components/landing/page-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Story } from "@/components/landing/story";

/**
 * Every page ends the same way: optional centered CTA, the newsletter card,
 * then the footer card 12px below it, as on the landing page.
 */
export function SiteChrome({
  children,
  cta = true,
}: {
  children: ReactNode;
  cta?: boolean;
}) {
  return (
    <Frame>
      <div id="top">
        <Announcement />
        <SiteHeader />
        {children}
        {cta ? <PageCta /> : null}
        <Story />
        <SiteFooter />
      </div>
    </Frame>
  );
}
