import { defineArrayMember, defineField, defineType } from "sanity";

/** Same snippet in TypeScript and Python, rendered as a tabbed code block. */
export const codeSwitcher = defineType({
  name: "codeSwitcher",
  title: "Code (TypeScript + Python)",
  type: "object",
  fields: [
    defineField({ name: "typescript", type: "text", rows: 10 }),
    defineField({ name: "python", type: "text", rows: 10 }),
  ],
  preview: {
    prepare: () => ({ title: "Code switcher", subtitle: "TypeScript + Python" }),
  },
});

export const postTable = defineType({
  name: "postTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "header",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({ title: (cells ?? []).join("  |  ") }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { header: "header" },
    prepare: ({ header }) => ({
      title: "Table",
      subtitle: (header ?? []).join(" | "),
    }),
  },
});

/** Architecture or flow diagram written in Mermaid syntax, rendered in the site palette. */
export const mermaidDiagram = defineType({
  name: "mermaidDiagram",
  title: "Diagram (Mermaid)",
  type: "object",
  fields: [
    defineField({
      name: "code",
      title: "Mermaid source",
      type: "text",
      rows: 12,
      description: "flowchart, sequenceDiagram, or stateDiagram-v2. Preview it at mermaid.live.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      type: "string",
      description: "Shown under the diagram and used as its accessible label.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { caption: "caption" },
    prepare: ({ caption }) => ({ title: caption || "Diagram", subtitle: "Mermaid" }),
  },
});

export const divider = defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  fields: [defineField({ name: "style", type: "string", hidden: true })],
  preview: { prepare: () => ({ title: "Divider" }) },
});
