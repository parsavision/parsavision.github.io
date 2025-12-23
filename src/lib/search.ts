import Fuse, { IFuseOptions } from "fuse.js";
import type { PostMeta } from "./posts";

export interface SearchResult {
  item: PostMeta;
  score?: number;
}

export function createSearchIndex(posts: PostMeta[]): Fuse<PostMeta> {
  const options: IFuseOptions<PostMeta> = {
    keys: [
      { name: "frontmatter.title", weight: 2 },
      { name: "frontmatter.description", weight: 1.5 },
      { name: "frontmatter.tags", weight: 1 },
      { name: "frontmatter.category", weight: 0.8 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  };

  return new Fuse(posts, options);
}

export function searchPosts(
  searchIndex: Fuse<PostMeta>,
  query: string
): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  return searchIndex.search(query.trim()).map((result) => ({
    item: result.item,
    score: result.score,
  }));
}

// Prepare posts data for client-side search
export function prepareSearchData(posts: PostMeta[]): PostMeta[] {
  return posts.map((post) => ({
    slug: post.slug,
    frontmatter: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      tags: post.frontmatter.tags,
      category: post.frontmatter.category,
    },
    readingTime: post.readingTime,
  }));
}
