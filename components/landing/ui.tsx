import type { ReactNode } from "react";
import { Band } from "@/components/landing/frame";
import { Logo } from "@/components/landing/logo";

export { Button } from "@/components/landing/button";
export { ExternalIcon } from "@/components/landing/external-icon";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SparseMain({
  children,
  marks = false,
}: {
  children: ReactNode;
  marks?: boolean;
}) {
  return (
    <main>
      <Band marks={marks}>
        <Container className="flex min-h-[75vh] flex-col items-center justify-center py-16 text-center sm:py-24">
          <Logo size={48} className="mb-8" />
          {children}
        </Container>
      </Band>
    </main>
  );
}
