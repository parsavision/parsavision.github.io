"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { Menu, X, Github, Twitter, Rss } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { PostMeta } from "@/lib/posts";

interface HeaderProps {
  posts: PostMeta[];
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog/" },
  { name: "About", href: "/about/" },
];

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight transition-colors hover:text-muted-foreground"
          >
            <span className="text-2xl">✦</span>
            <span>MyBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
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
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
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
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
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
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
