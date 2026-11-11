import { CopyCode } from "@/components/code/copy-code";
import { highlightCode } from "@/lib/highlight";

export async function CodeBlock({
  code,
  lang,
  framed = true,
}: {
  code: string;
  lang: string;
  framed?: boolean;
}) {
  const html = await highlightCode(code, lang);

  return (
    <CopyCode
      code={code}
      className={`lp-code h-full overflow-x-auto bg-card ${framed ? "border border-white/15" : ""}`}
    >
      <div className="h-full" dangerouslySetInnerHTML={{ __html: html }} />
    </CopyCode>
  );
}
