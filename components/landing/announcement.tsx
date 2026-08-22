import { ExternalIcon } from "@/components/landing/external-icon";
import { Band, Cross } from "@/components/landing/frame";

export function Announcement() {
  return (
    <Band wash marks={false}>
      <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      <a
        href="/replay"
        className="block px-5 py-2 text-center text-sm leading-5 text-muted hover:text-white sm:px-8"
      >
        <span className="whitespace-nowrap">
          <ExternalIcon className="mb-px mr-1.5 inline size-3" />
          Step-level replay: re-run one step without re-running the graph.
        </span>
      </a>
    </Band>
  );
}
