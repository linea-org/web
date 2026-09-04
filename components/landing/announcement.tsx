"use client";

import { useEffect, useState } from "react";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band, Cross } from "@/components/landing/frame";
import { ANNOUNCEMENTS } from "@/lib/announcements";

const INTERVAL_MS = 5000;

export function Announcement() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ANNOUNCEMENTS.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Band wash marks={false}>
      <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      <div className="relative h-10">
        {ANNOUNCEMENTS.map((item, itemIndex) => {
          const active = itemIndex === index;

          return (
            <a
              key={item.href + item.label}
              href={item.href}
              tabIndex={active ? 0 : -1}
              aria-hidden={!active}
              className={`absolute inset-0 flex min-w-0 items-center justify-center px-5 text-center text-sm leading-5 text-muted transition-opacity duration-300 hover:text-white sm:px-8 motion-reduce:transition-none ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <span className="line-clamp-1">
                <span className="whitespace-nowrap">
                  <ExternalIcon className="mb-px mr-1.5 inline size-3" />
                  {item.label}:
                </span>{" "}
                {item.copy}
              </span>
            </a>
          );
        })}
      </div>
    </Band>
  );
}
