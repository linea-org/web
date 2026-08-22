import { highlightCode } from "@/lib/highlight";

export async function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const html = await highlightCode(code, lang);

  return (
    <div
      className="lp-code h-full overflow-x-auto border border-white/12 bg-card"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
