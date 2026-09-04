import { Children, isValidElement, type ReactNode } from "react";
import { CodeSwitcher } from "@/components/code/code-switcher";
import { textFrom } from "@/components/code/text-from";
import { highlightCode } from "@/lib/highlight";

type Snippet = { id: "ts" | "py"; label: string; code: string };

function langFromClass(className: string): "ts" | "py" | undefined {
  const lang = className.replace(/^language-/, "");

  switch (lang) {
    case "ts":
    case "tsx":
    case "typescript":
      return "ts";
    case "py":
    case "python":
      return "py";
    default:
      return undefined;
  }
}

function snippetFromNode(node: ReactNode): Snippet | undefined {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(node)) {
    return undefined;
  }

  const nested = Children.toArray(node.props.children).find((child) =>
    isValidElement(child),
  );
  const className =
    (isValidElement<{ className?: string }>(nested) && nested.props.className) ||
    node.props.className ||
    "";
  const id = langFromClass(className);

  if (!id) {
    return undefined;
  }

  const code = textFrom(node).replace(/\n$/, "").trim();

  if (!code) {
    return undefined;
  }

  return {
    id,
    label: id === "ts" ? "TypeScript" : "Python",
    code,
  };
}

function snippetsFromChildren(children: ReactNode): Snippet[] {
  const found: Snippet[] = [];

  for (const child of Children.toArray(children)) {
    const snippet = snippetFromNode(child);

    if (snippet) {
      found.push(snippet);
    }
  }

  return found;
}

export async function SwitchableCode({
  typescript,
  python,
  children,
}: {
  typescript?: string;
  python?: string;
  children?: ReactNode;
}) {
  const fromChildren = snippetsFromChildren(children);
  const snippets: Snippet[] = fromChildren.length
    ? fromChildren
    : [
        typescript?.trim()
          ? {
              id: "ts" as const,
              label: "TypeScript",
              code: typescript.trim(),
            }
          : undefined,
        python?.trim()
          ? { id: "py" as const, label: "Python", code: python.trim() }
          : undefined,
      ].filter((snippet): snippet is Snippet => snippet !== undefined);

  if (snippets.length === 0) {
    return null;
  }

  const options = await Promise.all(
    snippets.map(async (snippet) => ({
      ...snippet,
      html: await highlightCode(snippet.code, snippet.id === "ts" ? "ts" : "python"),
    })),
  );

  return <CodeSwitcher options={options} />;
}
