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
    <div className="px-3 pt-3 sm:px-5">
      <Link
        href={item.href}
        className="flex h-10 min-w-0 items-center justify-center rounded-[10px] bg-[#2563eb] px-4 text-center text-sm leading-5 text-white hover:bg-[#1d4ed8] sm:px-6"
      >
        <span className="line-clamp-1">
          <span className="underline">{item.label}</span>
          {": "}
          {item.copy}
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );
}
