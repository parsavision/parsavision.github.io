import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const isPersian = post.frontmatter.lang === "fa";
  
  return (
    <Link href={`/blog/${post.slug}/`}>
      <Card
        className={`group h-full transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 ${
          featured ? "md:col-span-2 lg:col-span-2" : ""
        }`}
        dir={isPersian ? "rtl" : "ltr"}
      >
        {post.frontmatter.image && (
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <img
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            {featured && (
              <div className={`absolute top-3 ${isPersian ? "right-3" : "left-3"}`}>
                <Badge variant="secondary" className="bg-white text-black">
                  {isPersian ? "ویژه" : "Featured"}
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardHeader className="space-y-2">
          {post.frontmatter.category && (
            <Badge variant="outline" className="w-fit text-xs">
              {post.frontmatter.category}
            </Badge>
          )}
          <h3
            className={`font-bold leading-tight tracking-tight transition-colors group-hover:text-white/80 ${
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            } ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
          >
            {post.frontmatter.title}
          </h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className={`text-muted-foreground line-clamp-2 text-sm leading-relaxed ${isPersian ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}>
            {post.frontmatter.description}
          </p>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.frontmatter.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.frontmatter.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
          {isPersian ? (
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
