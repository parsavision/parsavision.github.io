import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { BlogListContent } from "@/components/BlogListContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts - read articles about technology, programming, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags().slice(0, 15);

  return (
    <BlogListContent
      posts={posts}
      categories={categories}
      tags={tags}
    />
  );
}
