import type { ReactNode } from "react";

export function Cross({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none !absolute z-20 size-2.5 ${className}`}
    >
      <span className="absolute inset-x-0 top-1/2 h-px bg-white/35" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-white/35" />
    </span>
  );
}

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-full bg-background">
      <div className="relative mx-auto min-h-full max-w-6xl border-x border-t border-white/12 min-[80rem]:max-w-[80rem] min-[80rem]:px-16">
        <div className="relative min-h-full border-x border-t border-white/12 p-1.5">
          <div className="relative min-h-full border-x border-t border-white/12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Band({
  children,
  wash = false,
  hatch = false,
  marks = true,
  sticky = false,
}: {
  children: ReactNode;
  wash?: boolean;
  hatch?: boolean;
  marks?: boolean;
  sticky?: boolean;
}) {
  return (
    <div
      className={`border-b border-white/12 ${sticky ? "sticky top-0 z-40 bg-background" : "relative"} ${wash ? "lp-wash lp-grain" : ""} ${hatch ? "lp-hatch" : ""}`}
    >
      {marks ? (
        <>
          <Cross className="top-full left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="top-full right-0 translate-x-1/2 -translate-y-1/2" />
        </>
      ) : null}
      {children}
    </div>
  );
}

export function Separator({
  marks = true,
  bottomLeft = false,
}: {
  marks?: boolean;
  bottomLeft?: boolean;
}) {
  return (
    <div className="lp-hatch relative h-3 border-b border-white/12">
      {marks ? (
        <>
          <Cross className="-top-px left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="-top-px right-0 translate-x-1/2 -translate-y-1/2" />
          <Cross className="top-full left-0 -translate-x-1/2 -translate-y-1/2" />
          <Cross className="top-full right-0 translate-x-1/2 -translate-y-1/2" />
        </>
      ) : null}
      {!marks && bottomLeft ? (
        <Cross className="top-full left-0 -translate-x-1/2 -translate-y-1/2" />
      ) : null}
    </div>
  );
}
