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
      className={`lp-surface group/featured relative flex flex-1 flex-col justify-between gap-4 overflow-hidden rounded-[10px] p-5 ring-1 ring-white/20 ring-inset ${featured.surface}`}
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
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            {item.label}
            <ExternalIcon />
          </a>
        );
      }

      return (
        <Link href={item.href} className="transition-colors hover:text-foreground">
          {item.label}
        </Link>
      );
    case "menu":
      return (
        // Not `relative`: the panel anchors to the header so it can span the full column.
        // The group is only as tall as the label, so hovering the empty header strip does not open it.
        <div className="group flex items-center">
          <button
            type="button"
            // ::after bridges the 18px from the label to the header's bottom edge, so moving down into the panel keeps it open.
            className="relative inline-flex items-center gap-1 transition-colors after:absolute after:inset-x-0 after:top-full after:h-[18px] group-hover:text-foreground group-has-[:focus-visible]:text-foreground pointer-coarse:group-focus-within:text-foreground"
          >
            {item.label}
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="size-3 transition-transform duration-200 group-hover:rotate-180 group-hover:delay-100 group-has-[:focus-visible]:rotate-180 motion-reduce:transition-none pointer-coarse:group-focus-within:rotate-180"
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
          {/* The ::before is full-bleed like the sticky Band's backdrop, but opaque so page content never shows through.
              The ::after dims the page below, so the panel reads as a layer instead of a slice through the hero. */}
          {/* Opens after a 100ms hover (so sweeping across the nav does not flash it) and fades out in 100ms.
              Only keyboard focus pins it open; a mouse click on the trigger does not. */}
          <div className="invisible absolute inset-x-0 top-full z-20 opacity-0 transition-[opacity,visibility] duration-100 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-y before:border-white/10 before:bg-card after:pointer-events-none after:absolute after:top-full after:left-1/2 after:-z-20 after:h-screen after:w-screen after:-translate-x-1/2 after:bg-black/50 group-hover:visible group-hover:opacity-100 group-hover:delay-100 group-hover:duration-150 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100 pointer-coarse:group-focus-within:visible pointer-coarse:group-focus-within:opacity-100">
            <div className="grid grid-cols-[minmax(0,1fr)_24rem] divide-x divide-white/10 px-5 sm:px-8">
              <div className="flex flex-col py-6 pr-6">
                {/* Plain rows, not boxed tiles: the tint appears only on the row under the cursor.
                    Rows keep their natural height and start level with the card; -mx-3 keeps icons on the logo's edge. */}
                <ul className="-mx-3 grid grid-cols-2 content-start gap-1">
                  {item.items.map((entry) => (
                    <li key={entry.href + entry.label} className="flex">
                      <Link
                        href={entry.href}
                        target={entry.external ? "_blank" : undefined}
                        rel={entry.external ? "noreferrer" : undefined}
                        className="group/entry flex flex-1 items-center gap-3 rounded-[10px] px-3 py-3 transition-colors duration-100 outline-none hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-white/20 motion-reduce:transition-none"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/[0.04] text-muted ring-1 ring-white/10 transition-colors duration-100 group-hover/entry:bg-white/[0.08] group-hover/entry:text-foreground group-focus-visible/entry:text-foreground">
                          <NavIcon name={entry.icon} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                            {entry.label}
                            {entry.external ? (
                              <ExternalIcon className="size-2.5 text-muted" />
                            ) : null}
                          </span>
                          <span className="mt-0.5 block truncate text-sm text-muted">
                            {entry.hint}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col py-6 pl-6">
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

export async function SiteHeader() {
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
          <Search entries={await getSearchEntries()} />
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
              Join waitlist
            </Button>
          </div>
          <MobileNav />
        </div>
      </header>
    </Band>
  );
}
