import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  image?: string;
  author?: string;
  lang?: "en" | "fa"; // Language: 'en' for English, 'fa' for Persian/Farsi
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (item.name.endsWith(".mdx") || item.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllPosts(): PostMeta[] {
  const files = getFilesRecursively(postsDirectory);

  const posts = files.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath
      .replace(/\.mdx?$/, "")
      .replace(/\\/g, "/")
      .replace(/\/index$/, "");

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      readingTime: readingTime(content).text,
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getPostBySlug(slug: string): Post | null {
  const decodedSlug = decodeURIComponent(slug);
  
  // Try different file paths
  const possiblePaths = [
    path.join(postsDirectory, `${decodedSlug}.mdx`),
    path.join(postsDirectory, `${decodedSlug}.md`),
    path.join(postsDirectory, decodedSlug, "index.mdx"),
    path.join(postsDirectory, decodedSlug, "index.md"),
  ];

  let filePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: decodedSlug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags?.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const categoryCount: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categoryCount[post.frontmatter.category] =
        (categoryCount[post.frontmatter.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCount)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(category: string): PostMeta[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) =>
      post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedPosts(): PostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.frontmatter.featured);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): PostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0;

    // Score for matching category
    if (
      post.frontmatter.category &&
      post.frontmatter.category === currentPost.frontmatter.category
    ) {
      score += 2;
    }

    // Score for matching tags
    currentPost.frontmatter.tags?.forEach((tag) => {
      if (post.frontmatter.tags?.includes(tag)) {
        score += 1;
      }
    });

    return { ...post, score };
  });

  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
