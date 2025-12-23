"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import { SearchBar } from "./SearchBar";
import { Menu, X, Languages, Rss } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { PostMeta } from "@/lib/posts";

interface HeaderProps {
  posts: PostMeta[];
}

const navigation = {
  en: [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: "About", href: "/about/" },
  ],
  fa: [
    { name: "خانه", href: "/" },
    { name: "بلاگ", href: "/blog/" },
    { name: "درباره من", href: "/about/" },
  ],
};

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, isRtl } = useLanguage();

  const navItems = navigation[lang];
  const blogName = lang === "fa" ? "پارسا" : "Parsa";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-bold text-xl tracking-tight transition-colors hover:text-muted-foreground",
              isRtl && "font-[family-name:var(--font-vazirmatn)]"
            )}
          >
            <span className="text-2xl">✦</span>
            <span>{blogName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden md:flex items-center gap-6",
            isRtl && "font-[family-name:var(--font-vazirmatn)]"
          )}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === item.href || pathname.startsWith(item.href.slice(0, -1) + "/")
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <SearchBar posts={posts} />
            
            <div className="hidden md:flex items-center gap-1">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLang}
                aria-label="Toggle language"
                title={lang === "en" ? "فارسی" : "English"}
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="/feed.xml" aria-label="RSS Feed">
                  <Rss className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <nav className={cn(
            "container mx-auto px-4 py-4 space-y-3",
            isRtl && "font-[family-name:var(--font-vazirmatn)]"
          )}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={toggleLang}>
                <Languages className="h-4 w-4 me-2" />
                {lang === "en" ? "فارسی" : "English"}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/feed.xml">
                  <Rss className="h-4 w-4 me-2" />
                  RSS
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
