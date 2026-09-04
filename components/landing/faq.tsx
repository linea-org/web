"use client";

import { useState } from "react";
import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { FAQS } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Band>
      <section id="faq">
        <Container className="py-16">
          <p className="text-sm text-muted">Questions</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            What people usually ask first.
          </h2>
        </Container>
        <div className="divide-y divide-white/12 border-t border-white/12">
          {FAQS.map((item, index) => {
            const expanded = open === item.q;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={item.q} className="px-5 py-4 sm:px-8">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left text-base font-medium tracking-tight"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : item.q)}
                >
                  {item.q}
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className={`size-4 shrink-0 text-muted transition-transform duration-300 ease-out motion-reduce:transition-none ${expanded ? "rotate-180" : "rotate-0"}`}
                  >
                    <path
                      d="M3.2 5.7 8 10.3l4.8-4.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
                <div
                  id={panelId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="mt-3 w-full cursor-pointer border-x border-white/12 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-muted"
                      onClick={() => setOpen(null)}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Band>
  );
}
