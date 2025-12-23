"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3, h4");
    const items: TocItem[] = [];

    elements.forEach((element) => {
      if (element.id) {
        items.push({
          id: element.id,
          text: element.textContent || "",
          level: parseInt(element.tagName.charAt(1)),
        });
      }
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <List className="h-4 w-4" />
        <span>On this page</span>
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={cn(
                "flex items-center gap-1.5 transition-colors hover:text-foreground",
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 transition-transform",
                  activeId === heading.id && "rotate-90"
                )}
              />
              <span className="line-clamp-1">{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
