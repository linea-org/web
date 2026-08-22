import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { AuthorLink } from "@/components/blog/author-link";
import { mdxComponents } from "@/components/blog/mdx";
import { tagBadge } from "@/components/blog/tag-style";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Container } from "@/components/landing/ui";
import {
  formatPostDate,
  getPost,
  listPosts,
  postExists,
  relatedPosts,
} from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return listPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!postExists(slug)) {
    return pageMeta({
      title: "Note",
      description: "A note from Linea Labs.",
      path: `/blog/${slug}`,
    });
  }

  const { meta } = getPost(slug);
  const url = `/blog/${slug}`;

  return {
    ...pageMeta({
      title: meta.title,
      description: meta.excerpt,
      path: url,
      type: "article",
    }),
    authors: [{ name: meta.author }],
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      url,
      publishedTime: meta.date,
      authors: [meta.author],
      tags: meta.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  if (!postExists(slug)) {
    notFound();
  }

  const { meta, content } = getPost(slug);
  const related = relatedPosts(slug, meta.tags);

  return (
    <SiteChrome>
      <main>
        <Band marks={false}>
          <div className="border-b border-white/12 px-5 py-3 sm:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white"
            >
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-3.5 shrink-0"
              >
                <path
                  d="M10.3 3.2 5.7 8l4.6 4.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="square"
                />
              </svg>
              All blogs
            </Link>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="lp-hatch border-b border-white/12 p-1.5 lg:order-2 lg:border-b-0 lg:border-l">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/12 lg:aspect-auto lg:min-h-80 lg:h-full">
                <Image
                  src={meta.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
            <Container className="flex flex-col justify-center py-10 sm:py-14">
              <p className="text-sm text-muted">{formatPostDate(meta.date)}</p>
              <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
                {meta.title}
              </h1>
              {meta.excerpt ? (
                <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                  {meta.excerpt}
                </p>
              ) : null}
              <div className="mt-5">
                <AuthorLink name={meta.author} showIcon />
              </div>
            </Container>
          </div>
        </Band>
        <Band marks={false}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:divide-x lg:divide-white/12">
            <Container className="min-w-0 py-8">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </Container>
            <aside className="self-start border-t border-white/12 px-5 py-8 sm:px-8 lg:sticky lg:top-6 lg:border-t-0">
              {meta.tags.length > 0 ? (
                <div>
                  <p className="text-sm text-white">Tags</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {meta.tags.map((item) => (
                      <li key={item}>
                        <span
                          className={`border px-1.5 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase ${tagBadge(item)}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {related.length > 0 ? (
                <div className={meta.tags.length > 0 ? "mt-8" : ""}>
                  <p className="text-sm text-white">More from the blog</p>
                  <ul className="mt-4 space-y-4">
                    {related.map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block text-sm leading-6 text-muted hover:text-white"
                        >
                          {post.title}
                          <span className="mt-0.5 block text-xs text-muted">
                            {formatPostDate(post.date)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </Band>
      </main>
    </SiteChrome>
  );
}
