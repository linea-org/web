import Link from "next/link";
import { ANNOUNCEMENTS } from "@/lib/announcements";

function ArrowIcon() {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="mb-px ml-1 inline size-3">
      <path
        d="M1.5 6h9M7 2.5 10.5 6 7 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Announcement() {
  const item = ANNOUNCEMENTS[0];

  if (!item) {
    return null;
  }

  return (
    // Phones: a flush, edge-to-edge strip. From `sm` up: the inset rounded bar.
    <div className="sm:pt-3">
      <Link
        href={item.href}
        className="group lp-grain lp-grain-strong flex h-10 min-w-0 items-center justify-center overflow-hidden sm:rounded-[10px] bg-[linear-gradient(90deg,#a64a21_0%,#cd6434_50%,#a64a21_100%)] px-4 text-center text-sm leading-5 text-white sm:px-6"
      >
        {/* Fading a flat overlay is cheaper than animating `filter` over the blended grain. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-[0.07]"
        />
        {/* Phones get the short form; the full sentence was cut off mid-word and lost its arrow. */}
        <span className="line-clamp-1">
          <span className="sm:hidden">New: </span>
          <span className="underline">{item.label}</span>
          <span className="sm:hidden"> · {item.short}</span>
          <span className="hidden sm:inline">
            {": "}
            {item.copy}
          </span>
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );
}
