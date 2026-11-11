import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band } from "@/components/landing/frame";
import { GitHubIcon } from "@/components/landing/github-icon";
import { Logo } from "@/components/landing/logo";
import { MobileNav } from "@/components/landing/mobile-nav";
import { NavArrow, NavIcon } from "@/components/landing/nav-icon";
import { Search } from "@/components/landing/search";
import { Button } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { GITHUB_URL } from "@/lib/socials";
import { NAV, type NavItem } from "@/lib/nav";
import { getSearchEntries } from "@/lib/search-entries";

type Featured = Extract<NavItem, { kind: "menu" }>["featured"];

/** Stage-surface card in the menu, styled like the landing newsletter pill. */
function FeaturedCard({ featured }: { featured: Featured }) {
  // Pills on the orange floor need light chrome; sky and mist take dark.
  const floor = featured.surface === "lp-surface-floor";
  const chip = floor
    ? "bg-white/15 ring-white/30"
    : "bg-white/50 ring-black/10 text-[#1c1917]";

  return (
    <Link
      href={featured.href}
      className={`lp-surface group/featured relative mt-3 flex min-h-40 flex-1 flex-col justify-between gap-6 overflow-hidden rounded-[10px] p-5 ring-1 ring-white/20 ring-inset ${featured.surface}`}
    >
      <span aria-hidden className="lp-noise absolute inset-0" />
      <span className="relative flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight ring-1 backdrop-blur-sm ${chip}`}
        >
          <span
            aria-hidden
            className={`size-1.5 rounded-full ${floor ? "bg-white" : "bg-[#2563eb]"}`}
          />
          {featured.badge}
        </span>
        <span
          aria-hidden
          className={`grid size-7 place-items-center rounded-full ring-1 transition-transform group-hover/featured:translate-x-0.5 motion-reduce:transition-none ${chip}`}
        >
          <NavArrow className="size-3.5" />
        </span>
      </span>
      <span className="relative">
        <span className="block text-lg leading-snug font-medium tracking-tight text-balance">
          {featured.title}
        </span>
        <span className="mt-1.5 block text-sm leading-6 text-pretty text-muted">
          {featured.copy}
        </span>
      </span>
    </Link>
  );
}

function NavEntry({ item }: { item: NavItem }) {
  switch (item.kind) {
    case "link":
      if (item.external) {
        return (
          <a
            href={item.href}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            {item.label}
            <ExternalIcon />
          </a>
        );
      }

      return (
        <Link href={item.href} className="hover:text-foreground">
          {item.label}
        </Link>
      );
    case "menu":
      return (
        // Not `relative`: the panel anchors to the header so it can span the full column.
        <div className="group flex h-14 items-center">
          <button
            type="button"
            className="inline-flex items-center gap-1 hover:text-foreground group-hover:text-foreground group-focus-within:text-foreground"
          >
            {item.label}
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="size-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
            >
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </button>
          {/* The ::before is full-bleed like the sticky Band's backdrop, but opaque so page content never shows through. */}
          <div className="invisible absolute inset-x-0 top-full z-20 opacity-0 transition-opacity duration-150 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-y before:border-white/10 before:bg-background group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 motion-reduce:transition-none">
            {/* Both columns stretch to one height so the tiles end level with the featured card. */}
            <div className="grid grid-cols-[minmax(0,1fr)_24rem] divide-x divide-white/10 px-5 sm:px-8">
              <div className="flex flex-col py-6 pr-6">
                <p className="text-xs font-medium tracking-wider text-muted uppercase">
                  {item.label}
                </p>
                <ul className="mt-3 grid flex-1 auto-rows-fr grid-cols-2 gap-2">
                  {item.items.map((entry) => (
                    <li key={entry.href + entry.label} className="flex">
                      <Link
                        href={entry.href}
                        className="group/entry flex flex-1 items-center gap-3 rounded-[10px] border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.05] focus-visible:border-white/20 focus-visible:bg-white/[0.05] motion-reduce:transition-none"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/[0.04] text-muted ring-1 ring-white/10 transition-colors group-hover/entry:bg-white/[0.08] group-hover/entry:text-foreground group-hover/entry:ring-white/20 group-focus-visible/entry:text-foreground">
                          <NavIcon name={entry.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">
                            {entry.label}
                          </span>
                          <span className="mt-0.5 block truncate text-sm text-muted">
                            {entry.hint}
                          </span>
                        </span>
                        <NavArrow className="size-4 -translate-x-1 text-muted opacity-0 transition group-hover/entry:translate-x-0 group-hover/entry:opacity-100 group-focus-visible/entry:translate-x-0 group-focus-visible/entry:opacity-100 motion-reduce:transition-none" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col py-6 pl-6">
                <p className="text-xs font-medium tracking-wider text-muted uppercase">
                  Featured
                </p>
                <FeaturedCard featured={item.featured} />
              </div>
            </div>
          </div>
        </div>
      );
    default: {
      const _never: never = item;
      return _never;
    }
  }
}

export function SiteHeader() {
  return (
    <Band sticky rule={false}>
      <header className="relative flex h-14 items-center justify-between px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-[17px] leading-none font-medium tracking-tight">
              Linea
            </span>
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm text-muted lg:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <NavEntry
                key={item.kind === "link" ? item.href : item.label}
                item={item}
              />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Search entries={getSearchEntries()} />
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              href={GITHUB_URL}
              variant="secondary"
              shortcut="g"
              externalIcon={false}
              iconOnly
              label="GitHub"
            >
              <GitHubIcon />
            </Button>
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
              Start building
            </Button>
          </div>
          <MobileNav />
        </div>
      </header>
    </Band>
  );
}
