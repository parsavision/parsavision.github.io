"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, Rss, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language";

const content = {
  en: {
    blogName: "Parsa",
    description: "A personal blog about technology, programming, and life. Sharing thoughts and learnings along the way.",
    navigation: "Navigation",
    home: "Home",
    blog: "Blog",
    about: "About",
    categories: "Categories",
    technology: "Technology",
    programming: "Programming",
    tutorials: "Tutorials",
    connect: "Connect",
    github: "GitHub",
    email: "Email",
    rssFeed: "RSS Feed",
    copyright: "All rights reserved.",
    madeWith: "Made with",
    using: "using Next.js",
  },
  fa: {
    blogName: "پارسا",
    description: "یک بلاگ شخصی درباره تکنولوژی، برنامه‌نویسی و زندگی. به اشتراک گذاشتن افکار و آموخته‌ها.",
    navigation: "ناوبری",
    home: "خانه",
    blog: "بلاگ",
    about: "درباره من",
    categories: "دسته‌بندی‌ها",
    technology: "تکنولوژی",
    programming: "برنامه‌نویسی",
    tutorials: "آموزش‌ها",
    connect: "ارتباط",
    github: "گیت‌هاب",
    email: "ایمیل",
    rssFeed: "فید RSS",
    copyright: "تمامی حقوق محفوظ است.",
    madeWith: "ساخته شده با",
    using: "با استفاده از Next.js",
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl tracking-tight"
            >
              <span className="text-2xl">✦</span>
              <span>{t.blogName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t.navigation}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t.categories}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/category/technology/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.technology}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/programming/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.programming}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/tutorials/"
                  className="transition-colors hover:text-foreground"
                >
                  {t.tutorials}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t.connect}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/parsavision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  {t.github}
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {t.email}
                </a>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Rss className="h-4 w-4" />
                  {t.rssFeed}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-start">
          <p>© {currentYear} {t.blogName}. {t.copyright}</p>
          <p className="flex items-center gap-1">
            {t.madeWith} <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {t.using}
          </p>
        </div>
      </div>
    </footer>
  );
}
