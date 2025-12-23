"use client";

import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language";
import type { PostMeta } from "@/lib/posts";

interface HomeContentProps {
  featuredPosts: PostMeta[];
  recentPosts: PostMeta[];
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
}

const content = {
  en: {
    welcome: "Welcome to my blog",
    heroTitle1: "Thoughts, stories, and",
    heroTitle2: "ideas worth sharing",
    heroDescription: "A personal space where I write about technology, programming, and the things I learn along the way. Join me on this journey of continuous learning.",
    browseArticles: "Browse Articles",
    aboutMe: "About Me",
    featuredPosts: "Featured Posts",
    featuredDescription: "Handpicked articles I think you'll enjoy",
    recentPosts: "Recent Posts",
    recentDescription: "The latest articles from the blog",
    viewAll: "View All",
    categories: "Categories",
    popularTags: "Popular Tags",
    posts: "posts",
    viewAllCategories: "View All Categories",
    stayUpdated: "Stay Updated",
    subscribeDescription: "Subscribe to the RSS feed to get notified when new articles are published. No spam, just quality content.",
    subscribeRss: "Subscribe to RSS",
  },
  fa: {
    welcome: "به بلاگ من خوش آمدید",
    heroTitle1: "افکار، داستان‌ها و",
    heroTitle2: "ایده‌هایی که ارزش اشتراک‌گذاری دارند",
    heroDescription: "فضایی شخصی که در آن درباره تکنولوژی، برنامه‌نویسی و چیزهایی که در مسیر یاد می‌گیرم می‌نویسم. در این سفر یادگیری مداوم همراه من باشید.",
    browseArticles: "مشاهده مقالات",
    aboutMe: "درباره من",
    featuredPosts: "پست‌های ویژه",
    featuredDescription: "مقالاتی که فکر می‌کنم دوست خواهید داشت",
    recentPosts: "پست‌های اخیر",
    recentDescription: "آخرین مقالات بلاگ",
    viewAll: "مشاهده همه",
    categories: "دسته‌بندی‌ها",
    popularTags: "برچسب‌های محبوب",
    posts: "پست",
    viewAllCategories: "مشاهده همه دسته‌بندی‌ها",
    stayUpdated: "به‌روز بمانید",
    subscribeDescription: "برای دریافت اعلان مقالات جدید، در فید RSS عضو شوید. بدون اسپم، فقط محتوای با کیفیت.",
    subscribeRss: "عضویت در RSS",
  },
};

export function HomeContent({ featuredPosts, recentPosts, categories, tags }: HomeContentProps) {
  const { lang, isRtl } = useLanguage();
  const t = content[lang];
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>{t.welcome}</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          {t.heroTitle1}
          <br />
          <span className="text-muted-foreground">{t.heroTitle2}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.heroDescription}
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/blog/">
              {t.browseArticles}
              <ArrowIcon className="ms-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about/">{t.aboutMe}</Link>
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
                {t.featuredPosts}
              </h2>
              <p className="text-muted-foreground mt-1">
                {t.featuredDescription}
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
              {t.recentPosts}
            </h2>
            <p className="text-muted-foreground mt-1">
              {t.recentDescription}
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/blog/">
              {t.viewAll}
              <ArrowIcon className="ms-2 h-4 w-4" />
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
          <h3 className="text-xl font-bold tracking-tight">{t.categories}</h3>
          <div className="space-y-3">
            {categories.map(({ category, count }) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}/`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-white/30 transition-colors"
              >
                <span className="font-medium">{category}</span>
                <Badge variant="secondary">{count} {t.posts}</Badge>
              </Link>
            ))}
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/blog/">{t.viewAllCategories}</Link>
          </Button>
        </div>

        {/* Tags */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">{t.popularTags}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase()}/`}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  {tag}
                  <span className="ms-1.5 text-muted-foreground">({count})</span>
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
            {t.stayUpdated}
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t.subscribeDescription}
          </p>
          <Button asChild size="lg">
            <a href="/feed.xml">
              {t.subscribeRss}
              <ArrowIcon className="ms-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
