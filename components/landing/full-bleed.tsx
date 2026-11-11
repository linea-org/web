import type { ReactNode } from "react";

/**
 * Paints a backdrop across the whole viewport while content stays in the frame column.
 * Ancestors must not use `lp-defer`: content-visibility clips the backdrop to the column.
 */
export function FullBleed({
  children,
  backdrop = "",
  grain = false,
  className = "",
}: {
  children: ReactNode;
  backdrop?: string;
  grain?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 ${backdrop}`}
      >
        {grain ? <div className="lp-noise absolute inset-0" /> : null}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
