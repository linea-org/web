import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import { Band, Cross } from "@/components/landing/frame";
import { ANNOUNCEMENTS } from "@/lib/announcements";

export function Announcement() {
  const item = ANNOUNCEMENTS[0];

  if (!item) {
    return null;
  }

  return (
    <Band wash marks={false}>
      <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      <Link
        href={item.href}
        className="flex h-10 min-w-0 items-center justify-center px-5 text-center text-sm leading-5 text-muted hover:text-white sm:px-8"
      >
        <span className="line-clamp-1">
          <span className="whitespace-nowrap">
            <ExternalIcon className="mb-px mr-1.5 inline size-3" />
            {item.label}:
          </span>{" "}
          {item.copy}
        </span>
      </Link>
    </Band>
  );
}
