import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(({ category }) => ({
    category: category.toLowerCase(),
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  return {
    title: `${decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)} Posts`,
    description: `Browse all posts in the ${decodedCategory} category.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  const categoryTitle = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {categoryTitle}
        </h1>
        <p className="text-lg text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} in this category
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
