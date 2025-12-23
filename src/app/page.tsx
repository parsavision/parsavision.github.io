import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = allPosts.slice(0, 6);
  const categories = getAllCategories().slice(0, 5);
  const tags = getAllTags().slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Welcome to my blog</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Thoughts, stories, and
          <br />
          <span className="text-muted-foreground">ideas worth sharing</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A personal space where I write about technology, programming, and the
          things I learn along the way. Join me on this journey of continuous learning.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/blog/">
              Browse Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about/">About Me</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Featured Posts
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked articles I think you&apos;ll enjoy
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.slice(0, 2).map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Recent Posts
            </h2>
            <p className="text-muted-foreground mt-1">
              The latest articles from the blog
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/blog/">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Categories and Tags */}
      <section className="py-12 grid gap-12 md:grid-cols-2">
        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Categories</h3>
          <div className="space-y-3">
            {categories.map(({ category, count }) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}/`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-white/30 transition-colors"
              >
                <span className="font-medium">{category}</span>
                <Badge variant="secondary">{count} posts</Badge>
              </Link>
            ))}
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/blog/">View All Categories</Link>
          </Button>
        </div>

        {/* Tags */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase()}/`}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  {tag}
                  <span className="ml-1.5 text-muted-foreground">({count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Stay Updated
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Subscribe to the RSS feed to get notified when new articles are published.
            No spam, just quality content.
          </p>
          <Button asChild size="lg">
            <a href="/feed.xml">
              Subscribe to RSS
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
