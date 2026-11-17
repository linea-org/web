import { GLASS_FRAME, GLASS_INNER } from "@/components/landing/framed-shot";

const NOTES = [
  {
    label: "Fact",
    copy: "Refunds over $50 need an approval.",
    tone: "lp-surface-sky",
  },
  {
    label: "Workspace",
    copy: "Tickets from EU accounts go to the EU queue.",
    tone: "lp-surface-mist",
  },
  {
    label: "Last run",
    copy: "Order lookup times out after 10s. Retry once.",
    tone: "lp-surface-floor",
  },
] as const;

/** Notes the host carries from one run to the next. */
export function MemoryNotes() {
  return (
    <div aria-hidden className={`mx-auto w-full max-w-xl ${GLASS_FRAME}`}>
      <div className={`${GLASS_INNER} flex flex-col gap-3 bg-[#0a0a0a] p-4 sm:p-6`}>
        {NOTES.map((note, index) => (
          <div
            key={note.label}
            className={`lp-surface rounded-[10px] px-5 py-4 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)] ${note.tone}`}
            style={{ marginLeft: `${index * 8}%`, marginRight: `${(2 - index) * 8}%` }}
          >
            <p className="text-xs font-medium tracking-tight text-muted">
              {note.label}
            </p>
            <p className="mt-1 text-base leading-6 font-medium tracking-tight">
              {note.copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
