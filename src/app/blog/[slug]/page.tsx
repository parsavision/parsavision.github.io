import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/TableOfContents";
import { PostCard } from "@/components/PostCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";

// Rehype Pretty Code options for syntax highlighting
const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
  defaultLang: "plaintext",
  onVisitLine(node) {
    // Add a class to each line for styling
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = ["highlighted"];
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word"];
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Author"],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Determine if the post is in Persian (RTL)
  const isPersian = post.frontmatter.lang === "fa";
  const textDirection = isPersian ? "rtl" : "ltr";

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author || "Author",
    },
    keywords: post.frontmatter.tags?.join(", "),
    articleSection: post.frontmatter.category,
    wordCount: post.content.split(/\s+/).length,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourblog.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <ScrollToTop />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog/">
            {isPersian ? (
              <ArrowRight className="ml-2 h-4 w-4" />
            ) : (
              <ArrowLeft className="mr-2 h-4 w-4" />
            )}
            {isPersian ? "بازگشت به بلاگ" : "Back to Blog"}
          </Link>
        </Button>

        {/* Post Header */}
        <header 
          className={`space-y-6 mb-12 ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
          dir={textDirection}
        >
          {post.frontmatter.category && (
            <Link href={`/category/${post.frontmatter.category.toLowerCase()}/`}>
              <Badge variant="outline" className="hover:bg-secondary transition-colors">
                {post.frontmatter.category}
              </Badge>
            </Link>
          )}

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.frontmatter.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.frontmatter.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase()}/`}>
                  <Badge
                    variant="secondary"
                    className="hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </header>

        <Separator className="mb-12" />

        {/* Content with TOC */}
        <div className={`grid lg:grid-cols-4 gap-12 ${isPersian ? "lg:grid-flow-dense" : ""}`}>
          {/* Main Content */}
          <article 
            className={`lg:col-span-3 prose prose-lg prose-invert max-w-none ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
            dir={textDirection}
          >
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [
                    rehypeSlug, 
                    rehypeKatex,
                    [rehypePrettyCode, rehypePrettyCodeOptions],
                  ],
                },
              }}
            />
          </article>

          {/* Table of Contents */}
          <aside className={`hidden lg:block ${isPersian ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>

        <Separator className="my-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
        </div>
      </div>
    </>
  );
}
