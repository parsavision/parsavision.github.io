"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Languages, Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
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
    relatedPosts: "Related Posts",
    switchLang: "فارسی",
  },
  fa: {
    backToBlog: "بازگشت به بلاگ",
    relatedPosts: "پست‌های مرتبط",
    switchLang: "English",
  },
};

export function BlogPostContent({
  frontmatter,
  readingTime,
  englishContent,
  persianContent,
  hasPersian,
}: BlogPostContentProps) {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const isPersian = lang === "fa";
  const t = uiText[lang];

  // Get localized content
  const title = isPersian && frontmatter.title_fa ? frontmatter.title_fa : frontmatter.title;
  const description = isPersian && frontmatter.description_fa ? frontmatter.description_fa : frontmatter.description;
  const category = isPersian && frontmatter.category_fa ? frontmatter.category_fa : frontmatter.category;
  const tags = isPersian && frontmatter.tags_fa ? frontmatter.tags_fa : frontmatter.tags;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar: Back Button and Language Toggle */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog/">
              {isPersian ? (
                <ArrowRight className="ml-2 h-4 w-4" />
              ) : (
                <ArrowLeft className="mr-2 h-4 w-4" />
              )}
              {t.backToBlog}
            </Link>
          </Button>

          {hasPersian && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "fa" : "en")}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {t.switchLang}
            </Button>
          )}
        </div>

        {/* Post Header */}
        <header
          className={`space-y-6 mb-12 ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
          dir={isPersian ? "rtl" : "ltr"}
        >
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
        <article
          className={`prose prose-lg prose-invert max-w-none ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
          dir={isPersian ? "rtl" : "ltr"}
        >
          {isPersian && persianContent ? persianContent : englishContent}
        </article>
      </div>
    </div>
  );
}
