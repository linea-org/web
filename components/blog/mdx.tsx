import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Link from "next/link";
import { CodeSwitcher } from "@/components/code/code-switcher";
import { langLabel } from "@/components/code/lang-label";
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
    <CodeSwitcher
      className="my-8"
      options={[{ id: lang, label: langLabel(lang), code, html }]}
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
    <span className="my-8 block overflow-hidden rounded-[10px] ring-1 ring-white/10">
      <PlatformShot src={src} alt={alt} sizes="(min-width: 768px) 42rem, 100vw" />
    </span>
  );
}

function hasMdImage(node: ReactNode): boolean {
  return Children.toArray(node).some((child) => {
    if (!isValidElement(child)) {
      return false;
    }

    if (child.type === MdImage || child.type === "img") {
      return true;
    }

    if (
      typeof child.props === "object" &&
      child.props &&
      "src" in child.props &&
      typeof child.props.src === "string"
    ) {
      return true;
    }

    if (
      typeof child.props === "object" &&
      child.props &&
      "children" in child.props
    ) {
      return hasMdImage(child.props.children as ReactNode);
    }

    return false;
  });
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-24 text-2xl leading-tight font-medium tracking-[-0.03em] text-balance first:mt-0 sm:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-24 text-lg font-medium tracking-tight sm:text-xl"
      {...props}
    />
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) =>
    hasMdImage(children) ? (
      <>{children}</>
    ) : (
      <p
        className="mt-5 text-base leading-8 text-pretty text-[#c9c9d1] first:mt-0"
        {...props}
      >
        {children}
      </p>
    ),
  a: ({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-foreground";

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
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base leading-8 text-[#c9c9d1] marker:text-white/30"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-base leading-8 text-[#c9c9d1] marker:text-white/40"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-[5px] bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.875em] text-foreground ring-1 ring-white/10"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-[#9dbde4] pl-5 text-lg leading-8 text-foreground [&_p]:text-inherit"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  pre: Pre,
  img: MdImage,
  CodeSwitcher: SwitchableCode,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-[10px] border border-white/10 bg-white/[0.02]">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-white/[0.04]" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-white/10 px-4 py-3 font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-white/10 px-4 py-3 text-muted [tr:last-child_&]:border-b-0"
      {...props}
    />
  ),
};
