import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { highlightCode } from "@/lib/highlight";

function textFrom(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(textFrom).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFrom(node.props.children);
  }

  return "";
}

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
    <div
      className="lp-code my-6 overflow-x-auto border border-white/12 bg-card"
      dangerouslySetInnerHTML={{ __html: html }}
    />
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
    <span className="lp-hatch my-6 block border border-white/12 p-1.5">
      <span className="relative block overflow-hidden border border-white/12">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={720}
          className="h-auto w-full object-cover"
        />
      </span>
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
