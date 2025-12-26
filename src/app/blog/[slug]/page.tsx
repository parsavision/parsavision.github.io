import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/TableOfContents";
import { PostCard } from "@/components/PostCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Separator } from "@/components/ui/separator";
import { BlogPostContent } from "@/components/BlogPostContent";
import { Giscus } from "@/components/Giscus";
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
  // Disable inline code highlighting to prevent styling conflicts
  bypassInlineCode: true,
  onVisitLine(node) {
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

// Content delimiter for Persian translations
const PERSIAN_DELIMITER = "<!-- PERSIAN -->";

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

  // Split content into English and Persian parts
  const contentParts = post.content.split(PERSIAN_DELIMITER);
  const englishContent = contentParts[0].trim();
  const persianContent = contentParts[1]?.trim();
  const hasPersian = !!persianContent;

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
      name: post.frontmatter.author || "Parsa",
      url: "https://github.com/parsavision",
    },
    keywords: post.frontmatter.tags?.join(", "),
    articleSection: post.frontmatter.category,
    wordCount: post.content.split(/\s+/).length,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://parsavision.github.io/blog/${slug}`,
    },
    publisher: {
      "@type": "Person",
      name: "Parsa",
      url: "https://github.com/parsavision",
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mdxOptions: any = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [rehypePrettyCode, rehypePrettyCodeOptions],
      ],
    },
  };

  // Pre-render MDX content on the server
  const englishMdx = (
    <MDXRemote
      source={englishContent}
      components={mdxComponents}
      options={mdxOptions}
    />
  );

  const persianMdx = hasPersian ? (
    <MDXRemote
      source={persianContent}
      components={mdxComponents}
      options={mdxOptions}
    />
  ) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <ScrollToTop />

      <BlogPostContent
        frontmatter={post.frontmatter}
        readingTime={post.readingTime}
        englishContent={
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">{englishMdx}</div>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          </div>
        }
        persianContent={
          hasPersian ? (
            <div className="grid lg:grid-cols-4 gap-12 lg:grid-flow-dense">
              <div className="lg:col-span-3">{persianMdx}</div>
              <aside className="hidden lg:block lg:col-start-1 lg:row-start-1">
                <div className="sticky top-24">
                  <TableOfContents />
                </div>
              </aside>
            </div>
          ) : undefined
        }
        hasPersian={hasPersian}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <Separator className="mb-12" />
            <section className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight">Related Posts</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Separator className="mb-12" />
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
            <Giscus />
          </section>
        </div>
      </div>
    </>
  );
}
