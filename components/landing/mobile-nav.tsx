"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import { GitHubIcon } from "@/components/landing/github-icon";
import { Button } from "@/components/landing/button";
import { PLATFORM_URL } from "@/lib/docs";
import { NAV } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center border border-white/12 text-white"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden viewBox="0 0 16 16" className="size-4">
          {open ? (
            <path
              d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            />
          ) : (
            <path
              d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="square"
            />
          )}
        </svg>
      </button>
      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-30 border-b border-white/12 bg-background"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setOpen(false);
            }
          }}
        >
          <nav className="divide-y divide-white/12 text-sm" aria-label="Mobile">
            {NAV.map((item) => {
              switch (item.kind) {
                case "link":
                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.04] hover:text-white sm:px-8"
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
                      className="block px-5 py-3.5 hover:bg-white/[0.04] hover:text-white sm:px-8"
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
                          className="block px-5 py-3 hover:bg-white/[0.04] hover:text-white sm:px-8"
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
          <div className="flex flex-col gap-2 border-t border-white/12 px-5 py-4 sm:px-8">
            <Button
              href="https://github.com"
              variant="secondary"
              shortcut="g"
              externalIcon={false}
              className="w-full justify-center"
            >
              <GitHubIcon />
              We are open source
            </Button>
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false} className="w-full justify-center">
              Start building
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
