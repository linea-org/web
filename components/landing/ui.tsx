import type { ReactNode } from "react";
import { Band } from "@/components/landing/frame";
import { Cat } from "@/components/landing/cat";
import { accentTitle } from "@/components/landing/accent-title";
import { HeroGlow } from "@/components/landing/hero-glow";

export { Button } from "@/components/landing/button";
export { ExternalIcon } from "@/components/landing/external-icon";

/**
 * Landing-page vertical rhythm. Every section pads by the same amount on each
 * side, so two adjacent sections sit 96 / 112 / 128px apart.
 */
export const SECTION_PT = "pt-12 sm:pt-14 lg:pt-16";
export const SECTION_PB = "pb-12 sm:pb-14 lg:pb-16";
export const SECTION_Y = `${SECTION_PT} ${SECTION_PB}`;
/** Same rhythm as the section gap, for repeated rows inside one section. */
export const SECTION_GAP = "gap-24 sm:gap-28 lg:gap-32";
/** Space between a section heading and the content it introduces. */
export const HEADING_GAP = "mt-10 sm:mt-12";

/**
 * Three cards that swipe sideways on phones (bleeding to the screen edge, next
 * card peeking) and sit in a 3-column grid from `md`. The parent must pad with
 * px-5 sm:px-8. Reveal lives on the row: a view() timeline inside a horizontal
 * scroller would track the wrong axis.
 */
export const SWIPE_ROW =
  "lp-reveal -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden";
export const SWIPE_ITEM = "w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Short centered pages (careers, pricing, 404): the landing's glow, the cat, and a serif title. */
export function SparseMain({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Band rule={false} className="relative">
        <HeroGlow />
        <Container className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:min-h-[32rem] lg:min-h-[38rem]">
          <Cat
            priority
            sizes="6rem"
            className="mb-6 w-20 drop-shadow-[0_10px_16px_rgba(255,255,255,0.16)] lg:w-24"
          />
          <h1 className="max-w-3xl font-serif text-[2.5rem] leading-[1.04] font-normal tracking-[-0.03em] text-balance sm:text-6xl">
            {accentTitle(title)}
          </h1>
          {children}
        </Container>
      </Band>
    </main>
  );
}
