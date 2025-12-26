import { getAllPosts, getFeaturedPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { HomeContent } from "@/components/HomeContent";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  // Exclude featured posts from recent posts to avoid duplicates
  const nonFeaturedPosts = allPosts.filter(post => !post.frontmatter.featured);
  const recentPosts = nonFeaturedPosts.slice(0, 6);
  const categories = getAllCategories().slice(0, 5);
  const tags = getAllTags().slice(0, 10);

  return (
    <HomeContent
      featuredPosts={featuredPosts}
      recentPosts={recentPosts}
      categories={categories}
      tags={tags}
    />
  );
}
