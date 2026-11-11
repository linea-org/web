"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ExternalIcon } from "@/components/landing/external-icon";
import { GitHubIcon } from "@/components/landing/github-icon";
import { Button } from "@/components/landing/button";
import { PLATFORM_URL } from "@/lib/docs";
import { GITHUB_URL } from "@/lib/socials";
import { NAV } from "@/lib/nav";

const DESKTOP_QUERY = "(min-width: 64rem)";

function setPageScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // The announcement bar sits above the sticky header, so the header's
  // viewport offset varies with scroll; measure it each time the menu opens.
  const [panelTop, setPanelTop] = useState(0);

  const close = () => {
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const handleToggle = () => {
    const details = detailsRef.current;
    if (!details) return;

    if (details.open) {
      const header = details.closest("header");
      setPanelTop(header?.getBoundingClientRect().bottom ?? 0);
    }
    setPageScrollLocked(details.open);
  };

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (desktop.matches) close();
    };
    desktop.addEventListener("change", onChange);

    return () => {
      desktop.removeEventListener("change", onChange);
      setPageScrollLocked(false);
    };
  }, []);

  return (
    <details ref={detailsRef} onToggle={handleToggle} className="group lg:hidden">
      <summary
        className="lp-btn lp-btn-secondary inline-flex size-9 cursor-pointer list-none items-center justify-center border border-white/20 text-foreground [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">Toggle menu</span>
        <svg aria-hidden viewBox="0 0 16 16" className="size-4 group-open:hidden">
          <path
            d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
        <svg aria-hidden viewBox="0 0 16 16" className="hidden size-4 group-open:block">
          <path
            d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
      </summary>
      <div
        id="mobile-nav"
        style={{ top: panelTop }}
        onClick={handleNavClick}
        className="fixed inset-x-0 bottom-0 z-30 flex flex-col border-t border-white/10 bg-background"
      >
          <nav
            className="flex-1 divide-y divide-white/10 overflow-y-auto overscroll-contain text-sm"
            aria-label="Mobile"
          >
            {NAV.map((item) => {
              switch (item.kind) {
                case "link":
                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.06] hover:text-foreground sm:px-8"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.label}
                        <ExternalIcon />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3.5 hover:bg-white/[0.06] hover:text-foreground sm:px-8"
                    >
                      {item.label}
                    </Link>
                  );
                case "menu":
                  return (
                    <div key={item.label}>
                      <p className="px-5 pt-4 pb-1 text-xs tracking-[0.12em] text-muted uppercase sm:px-8">
                        {item.label}
                      </p>
                      {item.items.map((entry) => (
                        <Link
                          key={entry.href}
                          href={entry.href}
                          className="block px-5 py-3 hover:bg-white/[0.06] hover:text-foreground sm:px-8"
                        >
                          <span className="block text-foreground">
                            {entry.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">
                            {entry.hint}
                          </span>
                        </Link>
                      ))}
                    </div>
                  );
                default: {
                  const _never: never = item;
                  return _never;
                }
              }
            })}
          </nav>
          <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
            <Button
              href={GITHUB_URL}
              variant="secondary"
              shortcut="g"
              externalIcon={false}
              className="w-full justify-center"
            >
              <GitHubIcon />
              GitHub
            </Button>
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false} className="w-full justify-center">
              Start building
            </Button>
          </div>
      </div>
    </details>
  );
}
