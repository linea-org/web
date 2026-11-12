import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      initialValue: "Linea Labs",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Shown under the title and used as the meta description.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      description: "Product screenshot, 1627 x 967 works best.",
      options: { hotspot: false },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      type: "array",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({ type: "code" }),
        defineArrayMember({ type: "codeSwitcher" }),
        defineArrayMember({ type: "postTable" }),
        defineArrayMember({ type: "divider" }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
