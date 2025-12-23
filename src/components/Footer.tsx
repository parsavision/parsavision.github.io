import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Rss, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
              <span>MyBlog</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A personal blog about technology, programming, and life. Sharing
              thoughts and learnings along the way.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/category/technology/"
                  className="transition-colors hover:text-foreground"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/programming/"
                  className="transition-colors hover:text-foreground"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/category/tutorials/"
                  className="transition-colors hover:text-foreground"
                >
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="/feed.xml"
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Rss className="h-4 w-4" />
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>© {currentYear} MyBlog. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
