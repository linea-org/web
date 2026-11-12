/**
 * One-off importer: content/blog/*.mdx -> Sanity.
 *
 *   pnpm import:blog          # upload images and write the posts
 *   pnpm import:blog --dry    # convert only, print a summary
 *
 * Reads NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_WRITE_TOKEN (Editor role) from .env.local. Document ids are
 * `post-<slug>`, so re-running overwrites those posts and nothing else.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import matter from "gray-matter";
import type {
  Blockquote,
  Code,
  Heading,
  List,
  Nodes,
  Paragraph,
  PhrasingContent,
  Root,
  Table,
} from "mdast";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const PUBLIC_DIR = path.join(ROOT, "public");

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(4, "0")}`;

type Json = Record<string, unknown>;

function imageAsset(src: string): Json {
  const file = path.join(PUBLIC_DIR, src.replace(/^\/+/, ""));
  if (!fs.existsSync(file)) {
    throw new Error(`Image not found in public/: ${src}`);
  }

  return { _type: "image", _localFile: file };
}

function codeLang(lang: string | null | undefined): string {
  switch (lang) {
    case "ts":
    case "typescript":
      return "typescript";
    case "py":
    case "python":
      return "python";
    case "":
    case null:
    case undefined:
      return "text";
    default:
      return lang;
  }
}

type SpanState = { children: Json[]; markDefs: Json[] };

function spans(
  nodes: PhrasingContent[],
  marks: string[],
  state: SpanState,
): void {
  for (const node of nodes) {
    switch (node.type) {
      case "text":
        state.children.push({ _type: "span", _key: key(), text: node.value, marks });
        break;
      case "inlineCode":
        state.children.push({
          _type: "span",
          _key: key(),
          text: node.value,
          marks: [...marks, "code"],
        });
        break;
      case "strong":
        spans(node.children, [...marks, "strong"], state);
        break;
      case "emphasis":
        spans(node.children, [...marks, "em"], state);
        break;
      case "break":
        state.children.push({ _type: "span", _key: key(), text: "\n", marks });
        break;
      case "link": {
        const markKey = key();
        state.markDefs.push({ _type: "link", _key: markKey, href: node.url });
        spans(node.children, [...marks, markKey], state);
        break;
      }
      default:
        throw new Error(`Unsupported inline node: ${node.type}`);
    }
  }
}

function textBlock(
  nodes: PhrasingContent[],
  extra: Json = { style: "normal" },
): Json {
  const state: SpanState = { children: [], markDefs: [] };
  spans(nodes, [], state);

  return {
    _type: "block",
    _key: key(),
    ...extra,
    markDefs: state.markDefs,
    children: state.children.length
      ? state.children
      : [{ _type: "span", _key: key(), text: "", marks: [] }],
  };
}

function listBlocks(node: List, level: number): Json[] {
  const listItem = node.ordered ? "number" : "bullet";
  const out: Json[] = [];

  for (const item of node.children) {
    const [first, ...rest] = item.children;
    if (first?.type !== "paragraph") {
      throw new Error("List item must start with a paragraph");
    }

    out.push(textBlock(first.children, { style: "normal", listItem, level }));

    for (const child of rest) {
      if (child.type === "list") {
        out.push(...listBlocks(child, level + 1));
      } else {
        throw new Error(`Unsupported list item child: ${child.type}`);
      }
    }
  }

  return out;
}

function block(node: Nodes): Json[] {
  switch (node.type) {
    case "heading": {
      const style = (node as Heading).depth === 2 ? "h2" : "h3";
      return [textBlock((node as Heading).children, { style })];
    }
    case "paragraph": {
      const p = node as Paragraph;
      if (p.children.length === 1 && p.children[0].type === "image") {
        const img = p.children[0];
        return [{ ...imageAsset(img.url), _key: key(), alt: img.alt ?? "" }];
      }
      return [textBlock(p.children)];
    }
    case "list":
      return listBlocks(node as List, 1);
    case "blockquote":
      return (node as Blockquote).children.flatMap((child) => {
        if (child.type !== "paragraph") {
          throw new Error(`Unsupported blockquote child: ${child.type}`);
        }
        return [textBlock(child.children, { style: "blockquote" })];
      });
    case "code": {
      const code = node as Code;
      return [
        {
          _type: "code",
          _key: key(),
          language: codeLang(code.lang),
          code: code.value,
        },
      ];
    }
    case "table": {
      const [head, ...body] = (node as Table).children;
      return [
        {
          _type: "postTable",
          _key: key(),
          header: head.children.map((cell) => toString(cell)),
          rows: body.map((row) => ({
            _type: "tableRow",
            _key: key(),
            cells: row.children.map((cell) => toString(cell)),
          })),
        },
      ];
    }
    case "thematicBreak":
      return [{ _type: "divider", _key: key() }];
    case "mdxJsxFlowElement": {
      if (node.name !== "CodeSwitcher") {
        throw new Error(`Unsupported MDX component: ${node.name}`);
      }
      const snippets: Json = {};
      for (const child of node.children) {
        if (child.type !== "code") continue;
        const lang = codeLang(child.lang);
        if (lang === "typescript" || lang === "python") {
          snippets[lang] = child.value.replace(/\n$/, "");
        }
      }
      return [{ _type: "codeSwitcher", _key: key(), ...snippets }];
    }
    default:
      throw new Error(`Unsupported block node: ${node.type}`);
  }
}

const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);

function convert(file: string): Json {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const tree = parser.parse(content) as Root;

  return {
    _id: `post-${slug}`,
    _type: "post",
    title: String(data.title),
    slug: { _type: "slug", current: slug },
    date: String(data.date),
    author: String(data.author ?? "Linea Labs"),
    excerpt: String(data.excerpt ?? ""),
    image: imageAsset(String(data.image)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body: tree.children.flatMap((child) => block(child as Nodes)),
  };
}

/** Uploads every `_localFile` image (once per file) and swaps in an asset reference. */
async function withUploadedImages<T>(
  value: T,
  upload: (file: string) => Promise<string>,
): Promise<T> {
  if (Array.isArray(value)) {
    return (await Promise.all(
      value.map((item) => withUploadedImages(item, upload)),
    )) as T;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record._localFile === "string") {
      const { _localFile, ...rest } = record;
      return {
        ...rest,
        asset: { _type: "reference", _ref: await upload(_localFile) },
      } as T;
    }

    const entries = await Promise.all(
      Object.entries(record).map(
        async ([k, v]) => [k, await withUploadedImages(v, upload)] as const,
      ),
    );
    return Object.fromEntries(entries) as T;
  }

  return value;
}

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).sort();
  const docs = files.map(convert);

  if (process.argv.includes("--dry")) {
    for (const doc of docs) {
      const body = doc.body as Json[];
      console.log(`${doc.slug && (doc.slug as Json).current}: ${body.length} blocks`);
    }
    console.log(`Dry run: ${docs.length} posts converted, nothing written.`);
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2026-01-01",
    useCdn: false,
  });

  const uploaded = new Map<string, Promise<string>>();
  const upload = (file: string) => {
    let pending = uploaded.get(file);
    if (!pending) {
      pending = client.assets
        .upload("image", fs.createReadStream(file), {
          filename: path.basename(file),
        })
        .then((asset) => asset._id);
      uploaded.set(file, pending);
    }
    return pending;
  };

  const ready = await Promise.all(docs.map((doc) => withUploadedImages(doc, upload)));

  const tx = client.transaction();
  for (const doc of ready) {
    tx.createOrReplace(doc as { _id: string; _type: string });
  }
  await tx.commit();

  console.log(
    `Imported ${ready.length} posts (${uploaded.size} images) into ${projectId}/${dataset}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
