import Link from "next/link";
import { PlatformShot } from "@/components/media/platform-shot";

export type PathCard = {
  href: string;
  title: string;
  copy: string;
  image: string;
  surface: string;
  label?: string;
};

/** Screenshot on a stage surface over a title row, as in the landing close. */
export function PathCards({ items }: { items: readonly PathCard[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 motion-reduce:transition-none"
        >
          <div
            className={`relative h-56 overflow-hidden px-5 pt-5 ${item.surface}`}
          >
            <div aria-hidden className="lp-noise absolute inset-0" />
            <div className="relative h-full overflow-hidden rounded-t-[8px] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/20">
              <PlatformShot
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 768px) 26rem, 100vw"
              />
            </div>
          </div>
          <div className="px-5 py-4">
            {item.label ? (
              <p className="mb-1 text-xs font-medium tracking-tight text-[#9dbde4]">
                {item.label}
              </p>
            ) : null}
            <h3 className="text-[15px] font-medium tracking-tight">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted">{item.copy}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
