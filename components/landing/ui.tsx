import type { ReactNode } from "react";
import { Band } from "@/components/landing/frame";
import { Cat } from "@/components/landing/cat";
import { HeroGrid } from "@/components/landing/hero-grid";

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

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Short centered pages (careers, pricing, 404): the hero grid with the cat. */
export function SparseMain({ children }: { children: ReactNode }) {
  return (
    <main>
      <Band rule={false} className="relative">
        <HeroGrid />
        <Container className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-16 text-center sm:min-h-[32rem] lg:min-h-[38rem]">
          <Cat
            priority
            sizes="6rem"
            className="mb-6 w-20 drop-shadow-[0_10px_16px_rgba(255,255,255,0.16)] lg:w-24"
          />
          {children}
        </Container>
      </Band>
    </main>
  );
}
