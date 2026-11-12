import { BlogCatalog } from "@/components/blog/catalog";
import { PostCards } from "@/components/blog/post-cards";
import { PageHero, Section, SectionHeading } from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { HEADING_GAP } from "@/components/landing/ui";
import { listPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Notes on executing the graph, holding the checkpoint, and operating production agents.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await listPosts();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <SiteChrome cta={false}>
      <main>
        <PageHero
          eyebrow="Blog"
          title="From the Linea team."
          lead="Notes on the host, the checkpoint, and the loop after a failure."
        >
          <PostCards posts={featured} eager />
        </PageHero>
        {rest.length > 0 ? (
          <Section id="latest">
            <SectionHeading title="Read the latest" />
            <div className={HEADING_GAP}>
              <BlogCatalog posts={rest} />
            </div>
          </Section>
        ) : null}
      </main>
    </SiteChrome>
  );
}
