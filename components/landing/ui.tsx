import type { ReactNode } from "react";

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
