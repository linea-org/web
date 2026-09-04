type MdNode = {
  type: string;
  name?: string;
  lang?: string;
  value?: string;
  children?: MdNode[];
  attributes?: { type: string; name?: string; value?: unknown }[];
};

function langProp(lang: string | undefined): "typescript" | "python" | undefined {
  switch (lang) {
    case "ts":
    case "tsx":
    case "typescript":
      return "typescript";
    case "py":
    case "python":
      return "python";
    default:
      return undefined;
  }
}

function hoist(node: MdNode): void {
  if (node.type === "mdxJsxFlowElement" && node.name === "CodeSwitcher") {
    const attributes = [...(node.attributes ?? [])];

    for (const child of node.children ?? []) {
      if (child.type !== "code" || !child.value) {
        continue;
      }

      const name = langProp(child.lang);

      if (!name) {
        continue;
      }

      attributes.push({
        type: "mdxJsxAttribute",
        name,
        value: child.value.replace(/\n$/, ""),
      });
    }

    node.attributes = attributes;
    node.children = [];
    return;
  }

  for (const child of node.children ?? []) {
    hoist(child);
  }
}

export function remarkCodeSwitcher() {
  return (tree: MdNode) => {
    hoist(tree);
  };
}
