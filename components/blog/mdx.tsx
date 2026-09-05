import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
} from "react";
import Link from "next/link";
import { CopyCode } from "@/components/code/copy-code";
import { PlatformShot } from "@/components/media/platform-shot";
import { SwitchableCode } from "@/components/code/switchable-code";
import { textFrom } from "@/components/code/text-from";
import { highlightCode } from "@/lib/highlight";

export async function Pre({
  children,
}: ComponentPropsWithoutRef<"pre">) {
  const child = Children.toArray(children)[0];
  const className =
    isValidElement<{ className?: string }>(child) && child.props.className
      ? child.props.className
      : "";
  const lang = className.replace("language-", "") || "text";
  const code = textFrom(child).replace(/\n$/, "");
  const html = await highlightCode(code, lang);

  return (
    <CopyCode
      code={code}
      className="lp-code my-6 overflow-x-auto border border-white/12 bg-card"
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </CopyCode>
  );
}

export function MdImage({
  src,
  alt = "",
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) {
    return null;
  }

  return (
    <span className="my-6 block border border-white/12">
      <PlatformShot src={src} alt={alt} />
    </span>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-10 text-xl font-medium tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-lg font-medium tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-sm leading-7 text-muted first:mt-0" {...props} />
  ),
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "text-white underline decoration-white/25 underline-offset-4 hover:decoration-white";

    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }

    const external = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  pre: Pre,
  img: MdImage,
  CodeSwitcher: SwitchableCode,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto border border-white/12">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-white/[0.04]" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-white/12 px-4 py-2.5 font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-white/12 px-4 py-2.5 text-muted" {...props} />
  ),
};
