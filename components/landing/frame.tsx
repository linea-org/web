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
  hatch = false,
  sticky = false,
  rule = true,
  className = "",
}: {
  children: ReactNode;
  wash?: boolean;
  grain?: boolean;
  hatch?: boolean;
  sticky?: boolean;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${rule ? "border-b border-black/[0.08]" : ""} ${sticky ? "sticky top-0 z-40 bg-background" : "relative"} ${wash ? "lp-wash" : ""} ${wash || grain ? "lp-grain" : ""} ${hatch ? "lp-hatch" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Separator() {
  return <div className="lp-hatch relative h-3 border-b border-black/[0.08]" />;
}
