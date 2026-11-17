import { PostCards } from "@/components/blog/post-cards";
import { Section, SectionHeading } from "@/components/landing/section";
import { HEADING_GAP } from "@/components/landing/ui";
import { relatedPosts } from "@/lib/blog";

/** Latest posts that share a tag with the page, topped up with the newest ones. */
export async function RelatedPosts({
  tags,
  limit = 3,
}: {
  tags: string[];
  limit?: number;
}) {
  const posts = await relatedPosts("", tags, limit);

  if (posts.length === 0) {
    return null;
  }

  return (
    <Section id="reading">
      <SectionHeading eyebrow="From the blog" title="Keep reading." />
      <div className={HEADING_GAP}>
        <PostCards posts={posts} />
      </div>
    </Section>
  );
}
