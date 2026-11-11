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
      { href: "/pricing", label: "Pricing", badge: "soon" },
      { href: DOCS_URL, label: "Docs", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faq", label: "FAQ" },
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
  "bg-white/70 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[#1c1917] shadow-[0_8px_20px_-10px_rgba(28,25,23,0.5)] ring-1 ring-black/10";

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
        className={`inline-flex items-center gap-1.5 text-sm ${linkClass}`}
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
    <Link href={link.href} className={`text-sm ${linkClass}`}>
      {link.label}
      {note}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <Band rule={false}>
      <div className="px-5 pb-5 sm:px-8 sm:pb-8">
        <footer className="lp-surface lp-surface-floor relative overflow-hidden rounded-[14px] px-6 sm:px-10">
          <div aria-hidden className="lp-noise absolute inset-0" />
          <div className="relative">
            <div className="flex flex-col gap-8 pt-8 pb-8 sm:gap-10 sm:pt-14 sm:pb-10 lg:flex-row lg:items-center lg:gap-16">
              <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:gap-16">
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
                </div>
                {/* Content-sized tracks on mobile so the "(soon)" links fit three columns in ~300px. */}
                <div className="grid flex-1 grid-cols-[repeat(3,auto)] justify-between gap-x-4 sm:grid-cols-3 sm:justify-normal sm:gap-x-8">
                  {COLUMNS.map((column) => (
                    <div key={column.title} className="min-w-0">
                      <p className="text-sm font-medium">{column.title}</p>
                      <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3">
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
              <div className="relative hidden w-32 shrink-0 pt-16 lg:block xl:w-36 xl:pt-2">
                {/* At lg the columns leave no room beside the cat, so the bubbles stack above it. */}
                <div className="absolute top-0 right-[45%] flex flex-col items-end gap-1.5 xl:top-4 xl:right-full xl:mr-1">
                  <p className={`${bubbleClass} rounded-xl`}>
                    All steps checkpointed.
                  </p>
                  <p className={`${bubbleClass} rounded-xl rounded-br-sm`}>
                    Resume anytime.
                  </p>
                </div>
                <Cat sizes="9rem" className="w-full" />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-4 border-t border-white/25 pt-6 pb-6 sm:flex-row sm:items-center sm:justify-between sm:border-t-0 sm:pt-0 sm:pb-8">
              <p className={`text-sm ${mutedClass}`}>
                © 2026 Linea Labs. All rights reserved.
              </p>
              {/* 32px hit areas around 16px icons; the negative margin keeps the icons flush with the text edge. */}
              <ul className="-mx-2 flex items-center">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex size-8 items-center justify-center ${linkClass}`}
                    >
                      <SocialIcon label={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </Band>
  );
}
