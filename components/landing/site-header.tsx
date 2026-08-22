import Image from "next/image";
import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band } from "@/components/landing/frame";
import { GitHubIcon } from "@/components/landing/github-icon";
import { MobileNav } from "@/components/landing/mobile-nav";
import { Button } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { NAV, type NavItem } from "@/lib/nav";

function NavEntry({ item }: { item: NavItem }) {
  switch (item.kind) {
    case "link":
      if (item.external) {
        return (
          <a
            href={item.href}
            className="inline-flex items-center gap-1.5 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            {item.label}
            <ExternalIcon />
          </a>
        );
      }

      return (
        <Link href={item.href} className="hover:text-white">
          {item.label}
        </Link>
      );
    case "menu":
      return (
        <div className="group relative">
          <button
            type="button"
            className="inline-flex items-center gap-1 hover:text-white"
          >
            {item.label}
            <svg aria-hidden viewBox="0 0 12 12" className="size-3">
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </button>
          <div className="invisible absolute top-full left-0 z-20 pt-1.5 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="relative min-w-56 border border-white/12 bg-background">
              <div className="divide-y divide-white/12">
                {item.items.map((entry) => (
                  <Link
                    key={entry.href + entry.label}
                    href={entry.href}
                    className="block px-3.5 py-2.5 hover:bg-white/[0.04] hover:text-white"
                  >
                    <span className="block text-sm text-foreground">
                      {entry.label}
                    </span>
                    <span className="block text-xs text-muted">{entry.hint}</span>
                  </Link>
                ))}
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
    <Band sticky>
      <header className="relative flex h-14 items-center justify-between px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/linea.svg" alt="" width={28} height={28} />
            <span className="text-[15px] font-medium tracking-tight">Linea</span>
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
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href="https://github.com"
            variant="secondary"
            shortcut="g"
            externalIcon={false}
          >
            <GitHubIcon />
            We are open source
          </Button>
          <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
            Start building
          </Button>
        </div>
        <MobileNav />
      </header>
    </Band>
  );
}
