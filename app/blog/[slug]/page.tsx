import type { Metadata } from "next";
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
import { LinkCards } from "@/components/landing/blocks";
import { getProduct, PRODUCTS, type ProductSlug } from "@/lib/product";
import { articleGraph, breadcrumbGraph } from "@/lib/schema";
import { ogImageUrl, pageMeta } from "@/lib/seo";

/** Posts are about the runtime, so an untagged one still points at that page. */
const FALLBACK_PRODUCT: ProductSlug = "runtime";

/** The product pages a post's tags name, in the order the tags are given. */
function productsFor(tags: readonly string[]) {
  const slugs = tags
    .map((tag) => PRODUCTS.find((product) => product.name.toLowerCase() === tag.toLowerCase())?.slug)
    .filter((slug): slug is ProductSlug => slug !== undefined);

  return [...new Set(slugs.length > 0 ? slugs : [FALLBACK_PRODUCT])].map(
    (slug) => {
      const product = getProduct(slug);

      return {
        href: product.href,
        title: product.name,
        copy: product.hint,
        icon: product.slug,
      };
    },
  );
}

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
      modifiedTime: meta.updated,
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
  const products = productsFor(meta.tags);

  return (
    <SiteChrome cta={false}>
      <JsonLd
        data={articleGraph({
          title: meta.title,
          description: meta.excerpt,
          path: `/blog/${slug}`,
          date: meta.date,
          modified: meta.updated,
          author: meta.author,
          image: ogImageUrl(`/blog/${slug}`),
        })}
      />
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: meta.title, path: `/blog/${slug}` },
        ])}
      />
      <main>
        <Band rule={false}>
          <article className="px-5 sm:px-8">
            <header
              className={`mx-auto flex max-w-3xl flex-col items-center text-center ${SECTION_PT}`}
            >
              <h1 className="text-4xl leading-[1.05] font-medium tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.5rem]">
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

            <div className={`mx-auto max-w-3xl ${HEADING_GAP} ${SECTION_PB}`}>
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

        <Section id="product">
          <SectionHeading eyebrow="In the product" title="Where this lives in Linea." />
          <div className={HEADING_GAP}>
            <LinkCards items={products} />
          </div>
        </Section>

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
