"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, Clock, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

interface SearchBarProps {
  posts: PostMeta[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostMeta[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Create Fuse instance
  const fuse = new Fuse(posts, {
    keys: [
      { name: "frontmatter.title", weight: 2 },
      { name: "frontmatter.description", weight: 1.5 },
      { name: "frontmatter.tags", weight: 1 },
      { name: "frontmatter.category", weight: 0.8 },
    ],
    threshold: 0.3,
    includeScore: true,
  });

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search when query changes
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = fuse.search(query).map((result) => result.item);
    setResults(searchResults.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  // Handle navigation within results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        router.push(`/blog/${results[selectedIndex].slug}/`);
        setOpen(false);
        setQuery("");
      } else if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    },
    [results, selectedIndex, router]
  );

  const handleSelect = (slug: string) => {
    router.push(`/blog/${slug}/`);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search posts...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Search Posts</DialogTitle>
          </DialogHeader>
          <div className="border-b border-border">
            <div className="flex items-center px-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
              />
            </div>
          </div>

          {query.length >= 2 && (
            <ScrollArea className="max-h-[400px]">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <FileText className="h-10 w-10 mb-3 opacity-50" />
                  <p>No posts found for &quot;{query}&quot;</p>
                </div>
              ) : (
                <div className="p-2">
                  {results.map((post, index) => (
                    <button
                      key={post.slug}
                      onClick={() => handleSelect(post.slug)}
                      className={`w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                        index === selectedIndex
                          ? "bg-secondary"
                          : "hover:bg-secondary/50"
                      }`}
                    >
                      <FileText className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 space-y-1 overflow-hidden">
                        <p className="font-medium truncate">
                          {post.frontmatter.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.frontmatter.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime}
                          </span>
                          <span>{formatDate(post.frontmatter.date)}</span>
                          {post.frontmatter.category && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              {post.frontmatter.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}

          {query.length < 2 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search...
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
