import type { ReactNode } from "react";

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-full overflow-x-clip">
      <div className="relative mx-auto min-h-full max-w-6xl min-[80rem]:max-w-[80rem]">
        {children}
      </div>
    </div>
  );
}

export function Band({
  children,
  wash = false,
  grain = false,
  sticky = false,
  rule = true,
  className = "",
}: {
  children: ReactNode;
  wash?: boolean;
  grain?: boolean;
  sticky?: boolean;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${rule ? "border-b border-white/10" : ""} ${sticky ? "lp-header-band sticky top-0 z-40 isolate before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-black" : "relative"} ${wash ? "lp-wash" : ""} ${wash || grain ? "lp-grain" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
