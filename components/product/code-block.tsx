import { CodeSwitcher } from "@/components/code/code-switcher";
import { langLabel } from "@/components/code/lang-label";
import { highlightCode } from "@/lib/highlight";

export async function CodeBlock({
  code,
  lang,
  className = "",
}: {
  code: string;
  lang: string;
  className?: string;
}) {
  const html = await highlightCode(code, lang);

  return (
    <CodeSwitcher
      className={className}
      options={[{ id: lang, label: langLabel(lang), code, html }]}
    />
  );
}
