import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorLink } from "@/components/blog/author-link";
import { PostBodyContent } from "@/components/blog/portable-text";
import { PostCards } from "@/components/blog/post-cards";
import { TAG_PILL, tagBadge } from "@/components/blog/tag-style";
import { Band } from "@/components/landing/frame";
import { FramedShot } from "@/components/landing/framed-shot";
import {
  ArrowLink,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import {
  HEADING_GAP,
  SECTION_PB,
  SECTION_PT,
} from "@/components/landing/ui";
import { JsonLd } from "@/components/seo/json-ld";
import {
  formatPostDate,
  getPost,
  listPosts,
  relatedPosts,
} from "@/lib/blog";
import { articleGraph } from "@/lib/schema";
import { ogImageUrl, pageMeta } from "@/lib/seo";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await listPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return pageMeta({
      title: "Note",
      description: "A note from Linea Labs.",
      path: `/blog/${slug}`,
      index: false,
    });
  }

  const { meta } = post;
  const path = `/blog/${slug}`;
  const base = pageMeta({
    title: meta.title,
    description: meta.excerpt,
    path,
    type: "article",
  });

  return {
    ...base,
    authors: [{ name: meta.author }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: meta.date,
      modifiedTime: meta.date,
      authors: [meta.author],
      tags: meta.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const { meta, body } = post;
  const related = await relatedPosts(slug, meta.tags);

  const date = formatPostDate(meta.date);

  return (
    <SiteChrome cta={false}>
      <JsonLd
        data={articleGraph({
          title: meta.title,
          description: meta.excerpt,
          path: `/blog/${slug}`,
          date: meta.date,
          author: meta.author,
          image: ogImageUrl(`/blog/${slug}`),
        })}
      />
      <main>
        <Band rule={false}>
          <article className="px-5 sm:px-8">
            <header
              className={`mx-auto flex max-w-3xl flex-col items-center text-center ${SECTION_PT}`}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-3 pl-2 text-xs font-medium tracking-tight text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground motion-reduce:transition-none"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
                >
                  <path
                    d="M10.3 3.2 5.7 8l4.6 4.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                  />
                </svg>
                Blog
              </Link>
              <h1 className="mt-6 text-4xl leading-[1.05] font-medium tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.5rem]">
                {meta.title}
              </h1>
              {meta.excerpt ? (
                <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-muted sm:text-lg sm:leading-8">
                  {meta.excerpt}
                </p>
              ) : null}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-muted">
                <AuthorLink name={meta.author} showIcon />
                <span aria-hidden className="h-4 w-px bg-white/15" />
                <time dateTime={meta.date}>{date}</time>
                {meta.tags.length > 0 ? (
                  <>
                    <span aria-hidden className="h-4 w-px bg-white/15" />
                    <ul className="flex flex-wrap gap-1.5">
                      {meta.tags.map((item) => (
                        <li key={item}>
                          <span className={`${TAG_PILL} ${tagBadge(item)}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </header>

            <FramedShot
              src={meta.image}
              alt=""
              eager
              sizes="(min-width: 80rem) 80rem, 100vw"
              className={HEADING_GAP}
            />

            <div className={`mx-auto max-w-2xl ${HEADING_GAP} ${SECTION_PB}`}>
              <PostBodyContent value={body} />
              <div
                className={`${HEADING_GAP} flex items-center justify-between gap-4 border-t border-white/10 pt-6`}
              >
                <AuthorLink name={meta.author} />
                <ArrowLink href="/blog" className="-mr-3">
                  All posts
                </ArrowLink>
              </div>
            </div>
          </article>
        </Band>

        {related.length > 0 ? (
          <Section id="more">
            <SectionHeading
              title="Keep reading"
              action={<ArrowLink href="/blog">View all posts</ArrowLink>}
            />
            <div className={HEADING_GAP}>
              <PostCards posts={related.slice(0, 3)} />
            </div>
          </Section>
        ) : null}
      </main>
    </SiteChrome>
  );
}
