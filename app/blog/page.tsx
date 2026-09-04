import { BlogCatalog } from "@/components/blog/catalog";
import { PostCards } from "@/components/blog/post-cards";
import { Band, Separator } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Container } from "@/components/landing/ui";
import { listPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "How we think about checkpoints, replay, and the work a framework leaves on you.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = listPosts();
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <SiteChrome>
      <main>
        <Band marks={false}>
          <Container className="py-8 sm:py-10">
            <p className="text-sm text-muted">From the team</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              Featured
            </h1>
          </Container>
          <Container className="pb-12 sm:pb-16">
            <PostCards posts={featured} />
          </Container>
        </Band>
        <Separator marks={false} />
        <Band marks={false}>
          <Container className="flex items-center py-8 sm:py-10">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Read the latest
            </h2>
          </Container>
          <BlogCatalog posts={rest} />
        </Band>
      </main>
    </SiteChrome>
  );
}
