import type { ReactNode } from "react";
import { Announcement } from "@/components/landing/announcement";
import { Frame, Separator } from "@/components/landing/frame";
import { PageCta } from "@/components/landing/page-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export function SiteChrome({
  children,
  cta = true,
  rule = true,
}: {
  children: ReactNode;
  cta?: boolean;
  rule?: boolean;
}) {
  return (
    <Frame>
      <div id="top">
        <Announcement />
        <SiteHeader />
        {children}
        {cta ? (
          <>
            <Separator marks={false} />
            <PageCta />
          </>
        ) : null}
        {rule ? <Separator marks={false} /> : null}
        <SiteFooter />
      </div>
    </Frame>
  );
}
