"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import type { PostFrontmatter } from "@/lib/posts";

interface BlogPostContentProps {
  frontmatter: PostFrontmatter;
  readingTime: string;
  englishContent: ReactNode;
  persianContent?: ReactNode;
  hasPersian: boolean;
}

const uiText = {
  en: {
    backToBlog: "Back to Blog",
  },
  fa: {
    backToBlog: "بازگشت به بلاگ",
  },
};

export function BlogPostContent({
  frontmatter,
  readingTime,
  englishContent,
  persianContent,
  hasPersian,
}: BlogPostContentProps) {
  const { lang, isRtl } = useLanguage();
  const t = uiText[lang];

  // Get localized content
  const title = isRtl && frontmatter.title_fa ? frontmatter.title_fa : frontmatter.title;
  const description = isRtl && frontmatter.description_fa ? frontmatter.description_fa : frontmatter.description;
  const category = isRtl && frontmatter.category_fa ? frontmatter.category_fa : frontmatter.category;
  const tags = isRtl && frontmatter.tags_fa ? frontmatter.tags_fa : frontmatter.tags;

  // Show Persian content if available and language is Persian, otherwise show English
  const showPersian = isRtl && hasPersian;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog/">
              {isRtl ? (
                <ArrowRight className="me-2 h-4 w-4" />
              ) : (
                <ArrowLeft className="me-2 h-4 w-4" />
              )}
              {t.backToBlog}
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <header className="space-y-6 mb-12">
          {category && (
            <Link href={`/category/${frontmatter.category?.toLowerCase()}/`}>
              <Badge variant="outline" className="hover:bg-secondary transition-colors">
                {category}
              </Badge>
            </Link>
          )}

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime}
            </span>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {tags.map((tag, index) => (
                <Link key={index} href={`/tag/${(frontmatter.tags?.[index] || tag).toLowerCase()}/`}>
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

        {/* Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          {showPersian && persianContent ? persianContent : englishContent}
        </article>
      </div>
    </div>
  );
}
