import { getAllPosts, getAllCategories, getAllTags } from "./posts";

interface SitemapPage {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

export function generateSitemap(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.github.io";
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  const staticPages: SitemapPage[] = [
    { url: "/", priority: 1.0, changefreq: "daily" },
    { url: "/blog/", priority: 0.9, changefreq: "daily" },
    { url: "/about/", priority: 0.8, changefreq: "monthly" },
  ];

  const postPages: SitemapPage[] = posts.map((post) => ({
    url: `/blog/${post.slug}/`,
    priority: 0.7,
    changefreq: "weekly",
    lastmod: post.frontmatter.date,
  }));

  const categoryPages: SitemapPage[] = categories.map(({ category }) => ({
    url: `/category/${category.toLowerCase()}/`,
    priority: 0.6,
    changefreq: "weekly",
  }));

  const tagPages: SitemapPage[] = tags.map(({ tag }) => ({
    url: `/tag/${tag.toLowerCase()}/`,
    priority: 0.5,
    changefreq: "weekly",
  }));

  const allPages: SitemapPage[] = [...staticPages, ...postPages, ...categoryPages, ...tagPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
}
