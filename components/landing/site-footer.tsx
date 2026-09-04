import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band } from "@/components/landing/frame";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
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
      { href: "/pricing", label: "Pricing", badge: "soon" },
    ],
  },
  {
    title: "Social",
    links: SOCIAL_LINKS.map((link) => ({ ...link, external: true })),
  },
];

const linkClass =
  "text-white underline decoration-white/25 underline-offset-4 hover:decoration-white";

function FooterItem({ link }: { link: FooterLink }) {
  const note = link.badge ? (
    <>
      {" "}
      <span className="font-light text-xs text-muted no-underline">({link.badge})</span>
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
    <>
      <Band marks={false}>
        <footer className="relative px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-24">
            <div className="max-w-sm lg:shrink-0">
              <p className="text-sm text-white">Linea Labs</p>
              <p className="mt-3 text-sm text-muted">
                A hosted runtime for agent graphs.
              </p>
              <p className="mt-6 text-sm leading-6 text-muted">
                You write the logic that is unique to the problem.{" "}
                <a
                  href={PLATFORM_URL}
                  className={linkClass}
                  target="_blank"
                  rel="noreferrer"
                >
                  Start building
                </a>{" "}
                or{" "}
                <a
                  href={DOCS_URL}
                  className={`inline-flex items-center gap-1.5 ${linkClass}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  read the docs
                  <ExternalIcon />
                </a>
                .
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Step-level{" "}
                <Link href="/replay" className={linkClass}>
                  replay
                </Link>{" "}
                is the wedge: fix one step without re-running the graph.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {COLUMNS.map((column) => (
                <div key={column.title} className="min-w-0">
                  <p className="text-sm text-white">{column.title}</p>
                  <ul className="mt-6 space-y-2.5">
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
        </footer>
      </Band>
      <Band marks={false}>
        <p className="px-5 py-2 text-center text-sm text-muted sm:px-8">
          Linea Labs © 2026
        </p>
      </Band>
    </>
  );
}
