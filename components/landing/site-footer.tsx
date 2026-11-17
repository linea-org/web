import Link from "next/link";
import { Cat } from "@/components/landing/cat";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band } from "@/components/landing/frame";
import { Logo } from "@/components/landing/logo";
import { SocialIcon } from "@/components/landing/social-icon";
import { DOCS_URL } from "@/lib/docs";
import { SOCIAL_LINKS } from "@/lib/socials";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
  badge?: string;
};

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/runtime", label: "Runtime" },
      { href: "/replay", label: "Replay" },
      { href: "/memory", label: "Memory" },
      { href: "/getting-started", label: "Getting started" },
      { href: "/sdk", label: "SDK" },
      { href: DOCS_URL, label: "Docs", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/research", label: "Research" },
      { href: "/audience", label: "Who it is for" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers", badge: "soon" },
    ],
  },
];

// The shared floor `.text-muted` (78% alpha) is ~3:1 on the orange; small footer text needs more.
const mutedClass = "text-[#fff8f4]/90";
const linkClass = `${mutedClass} transition-colors hover:text-white`;
const bubbleClass =
  "relative bg-[#f6e4da] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[#1c1917] shadow-[0_8px_20px_-10px_rgba(28,25,23,0.55)]";

function FooterItem({ link }: { link: FooterLink }) {
  const note = link.badge ? (
    <>
      {" "}
      <span className="text-xs font-light whitespace-nowrap opacity-80">
        ({link.badge})
      </span>
    </>
  ) : null;

  if (link.external) {
    return (
      <a
        href={link.href}
        className={`inline-flex min-h-10 items-center gap-1.5 text-sm sm:min-h-0 ${linkClass}`}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
        <ExternalIcon />
        {note}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={`inline-flex min-h-10 items-center text-sm sm:min-h-0 ${linkClass}`}
    >
      {link.label}
      {note}
    </Link>
  );
}

/** 44px hit areas on phones (32px from sm) around 16px icons; the caller's negative margin keeps them flush with the text edge. */
function SocialLinks({ className }: { className: string }) {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noreferrer"
            className={`flex size-11 items-center justify-center sm:size-8 ${linkClass}`}
          >
            <SocialIcon label={link.label} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <Band rule={false}>
      <div className="px-5 pb-5 sm:px-8 sm:pb-8">
        {/* lg min-height: the mascot and its bubbles stand about 235px tall, so a short link list must not let them climb into the Company column. */}
        <footer className="lp-surface lp-surface-floor relative overflow-hidden rounded-[14px] px-6 sm:px-10">
          <div aria-hidden className="lp-noise absolute inset-0" />
          <div className="relative lg:flex lg:min-h-[29rem] lg:flex-col">
            <div className="flex flex-col gap-8 pt-8 pb-8 sm:gap-10 sm:pt-14 sm:pb-10 lg:flex-row lg:items-center lg:gap-16">
              <div className="flex flex-1 flex-col gap-8 sm:gap-10 lg:flex-row lg:justify-between lg:gap-16">
                <div className="max-w-[18rem] sm:w-48 sm:shrink-0">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#fff8f4]"
                  >
                    <Logo size={26} />
                    <span className="text-xl font-medium tracking-tight">
                      Linea
                    </span>
                  </Link>
                  <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>
                    The runtime and control plane for production agents.
                  </p>
                  {/* Desktop: under the tagline, so the bottom row is just the copyright. */}
                  <SocialLinks className="-mx-2 mt-4 hidden items-center lg:flex" />
                </div>
                {/* Phones: two columns (Product left, Resources over Company right). From sm: three columns, pushed to the right edge from lg. */}
                <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0 lg:flex-none lg:grid-cols-[repeat(3,minmax(0,8.5rem))] lg:justify-end">
                  {COLUMNS.map((column) => (
                    <div
                      key={column.title}
                      className={`min-w-0 ${column.title === "Product" ? "row-span-2 sm:row-span-1" : ""}`}
                    >
                      <p className="border-b border-white/25 pb-2 text-xs font-semibold tracking-[0.08em] text-white uppercase">
                        {column.title}
                      </p>
                      {/* Phones: 40px rows instead of 20px text with gaps, so each link is a full fingertip target. */}
                      <ul className="mt-1 sm:mt-4 sm:space-y-3">
                        {column.links.map((link) => (
                          <li key={link.href + link.label}>
                            <FooterItem link={link} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-4 border-t border-white/25 pt-6 pb-6 sm:flex-row sm:items-center sm:justify-between sm:border-t-0 sm:pt-0 sm:pb-8 lg:mt-auto">
              <p className={`text-sm ${mutedClass}`}>
                © 2026 Linea Labs. All rights reserved.
              </p>
              <SocialLinks className="-mx-3.5 flex items-center sm:-mx-2 lg:hidden" />
            </div>
          </div>
          <div className="pointer-events-none absolute right-10 bottom-0 hidden w-32 lg:block xl:w-36">
            {/* Conversation above the head; the lower bubble's tail points at the cat. */}
            <div className="absolute right-1 bottom-full mb-1 flex flex-col items-end gap-1.5">
              <p className={`${bubbleClass} rounded-xl`}>All steps checkpointed.</p>
              <p
                className={`${bubbleClass} rounded-xl after:absolute after:-bottom-1 after:right-7 after:size-2.5 after:rotate-45 after:rounded-[2px] after:bg-[#f6e4da]`}
              >
                Resume anytime.
              </p>
            </div>
            {/* Warm halo so the black cat does not sink into the orange. */}
            <div
              aria-hidden
              className="absolute -inset-x-8 top-6 -bottom-4 bg-[radial-gradient(ellipse_at_50%_55%,rgb(255_214_184/0.42),transparent_68%)]"
            />
            {/* Sits on the edge, lower paws cropped by the footer. */}
            <Cat
              sizes="9rem"
              className="relative w-full translate-y-[9%] drop-shadow-[0_8px_16px_rgba(60,20,5,0.35)]"
            />
          </div>
        </footer>
      </div>
    </Band>
  );
}
