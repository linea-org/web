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
    // An inset rounded bar at every width, on the same side gutters as the header and sections.
    <div className="lp-announce relative z-10 px-5 pt-3 sm:px-8">
      <Link
        href={item.href}
        className="group relative flex h-10 min-w-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/10 bg-[#0f0f10] px-3 text-center text-sm leading-5 text-muted transition-colors hover:bg-[#18181a] sm:px-6"
      >
        {/* Phones get the short form; the full sentence was cut off mid-word and lost its arrow. */}
        <span className="line-clamp-1">
          <span className="sm:hidden">New: </span>
          <span className="font-medium text-[#e8946a]">{item.label}</span>
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
