import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: tag.toLowerCase(),
  }));
}

// Generate metadata for each tag
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `Browse all posts tagged with ${decodedTag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allTags = getAllTags();

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tagged:
          </h1>
          <Badge variant="secondary" className="text-xl px-4 py-2">
            {decodedTag}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} with this tag
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Other Tags */}
      {allTags.length > 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Other Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags
              .filter(({ tag: t }) => t.toLowerCase() !== decodedTag.toLowerCase())
              .slice(0, 15)
              .map(({ tag: t, count }) => (
                <Link key={t} href={`/tag/${t.toLowerCase()}/`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-secondary transition-colors cursor-pointer"
                  >
                    {t}
                    <span className="ml-1.5 text-muted-foreground">({count})</span>
                  </Badge>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
