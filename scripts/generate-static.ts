// This script generates static files during build
// Run with: npx tsx scripts/generate-static.ts

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// We need to build the modules first, so this uses dynamic imports
async function main() {
  console.log("Generating static files...");

  // Create public directory if it doesn't exist
  const publicDir = path.join(rootDir, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Import the necessary modules
  const { getAllPosts } = await import("../src/lib/posts");
  const { generateRSSFeed, generateAtomFeed, generateJSONFeed } = await import(
    "../src/lib/feed"
  );
  const { generateSitemap } = await import("../src/lib/sitemap");

  // Generate RSS feeds
  console.log("  - Generating RSS feed...");
  const rssFeed = generateRSSFeed();
  fs.writeFileSync(path.join(publicDir, "feed.xml"), rssFeed);

  console.log("  - Generating Atom feed...");
  const atomFeed = generateAtomFeed();
  fs.writeFileSync(path.join(publicDir, "atom.xml"), atomFeed);

  console.log("  - Generating JSON feed...");
  const jsonFeed = generateJSONFeed();
  fs.writeFileSync(path.join(publicDir, "feed.json"), jsonFeed);

  // Generate sitemap
  console.log("  - Generating sitemap...");
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

  // Generate search index
  console.log("  - Generating search index...");
  const posts = getAllPosts();
  const searchIndex = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags || [],
    category: post.frontmatter.category || "",
    readingTime: post.readingTime,
  }));
  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex, null, 2)
  );

  console.log("Static files generated successfully!");
}

main().catch(console.error);
