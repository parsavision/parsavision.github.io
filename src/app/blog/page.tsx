import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          All articles about technology, programming, and life.
          {posts.length > 0 && ` ${posts.length} posts and counting.`}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Categories</h3>
              <div className="space-y-2">
                {categories.map(({ category, count }) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase()}/`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <span className="text-sm">{category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag }) => (
                  <Link key={tag} href={`/tag/${tag.toLowerCase()}/`}>
                    <Badge
                      variant="outline"
                      className="hover:bg-secondary transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
