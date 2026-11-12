import { PortableText, type PortableTextComponents } from "next-sanity";
import { CodeSwitcher } from "@/components/code/code-switcher";
import { langLabel } from "@/components/code/lang-label";
import { SwitchableCode } from "@/components/code/switchable-code";
import { MdImage, mdxComponents } from "@/components/blog/mdx";
import type { PostBody } from "@/lib/blog";
import { highlightCode } from "@/lib/highlight";

/** Studio language ids to the ids lib/highlight.ts loads. */
function highlightLang(lang: string): string {
  switch (lang) {
    case "typescript":
      return "ts";
    case "javascript":
      return "js";
    case "py":
      return "python";
    case "sh":
    case "shell":
      return "bash";
    default:
      return lang || "text";
  }
}

async function CodeBlock({
  value,
}: {
  value: { code?: string; language?: string };
}) {
  const code = (value.code ?? "").replace(/\n$/, "");
  if (!code) {
    return null;
  }

  const lang = highlightLang(value.language ?? "text");
  const html = await highlightCode(code, lang);

  return (
    <CodeSwitcher
      className="my-8"
      options={[{ id: lang, label: langLabel(lang), code, html }]}
    />
  );
}

type TableValue = {
  header?: string[];
  rows?: { _key?: string; cells?: string[] }[];
};

function Table({ value }: { value: TableValue }) {
  const { table: T, thead: Thead, th: Th, td: Td } = mdxComponents;

  return (
    <T>
      <Thead>
        <tr>
          {(value.header ?? []).map((cell, index) => (
            <Th key={index}>{cell}</Th>
          ))}
        </tr>
      </Thead>
      <tbody>
        {(value.rows ?? []).map((row, rowIndex) => (
          <tr key={row._key ?? rowIndex}>
            {(row.cells ?? []).map((cell, index) => (
              <Td key={index}>{cell}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </T>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <mdxComponents.p>{children}</mdxComponents.p>,
    h2: ({ children }) => <mdxComponents.h2>{children}</mdxComponents.h2>,
    h3: ({ children }) => <mdxComponents.h3>{children}</mdxComponents.h3>,
    blockquote: ({ children }) => (
      <mdxComponents.blockquote>{children}</mdxComponents.blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <mdxComponents.ul>{children}</mdxComponents.ul>,
    number: ({ children }) => <mdxComponents.ol>{children}</mdxComponents.ol>,
  },
  listItem: {
    bullet: ({ children }) => <mdxComponents.li>{children}</mdxComponents.li>,
    number: ({ children }) => <mdxComponents.li>{children}</mdxComponents.li>,
  },
  marks: {
    strong: ({ children }) => (
      <mdxComponents.strong>{children}</mdxComponents.strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <mdxComponents.code>{children}</mdxComponents.code>,
    link: ({ value, children }) => (
      <mdxComponents.a href={value?.href ?? ""}>{children}</mdxComponents.a>
    ),
  },
  types: {
    image: ({ value }) => <MdImage src={value?.url} alt={value?.alt ?? ""} />,
    code: CodeBlock,
    codeSwitcher: ({ value }) => (
      <SwitchableCode typescript={value?.typescript} python={value?.python} />
    ),
    postTable: Table,
    divider: () => <mdxComponents.hr />,
  },
};

export function PostBodyContent({ value }: { value: PostBody }) {
  return <PortableText value={value} components={components} />;
}
