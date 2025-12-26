import { Feed } from "feed";
import { getAllPosts } from "./posts";

export function generateRSSFeed(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parsavision.github.io";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Parsa's Blog",
    description: "Personal blog about Rust, systems programming, security, and DevOps. I use Arch btw.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/og-image.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa`,
    updated: posts.length > 0 ? new Date(posts[0].frontmatter.date) : new Date(),
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Parsa",
      email: "parsa@parsavision.com",
      link: "https://github.com/parsavision",
    },
  });

  posts.forEach((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}/`;

    feed.addItem({
      title: post.frontmatter.title,
      id: postUrl,
      link: postUrl,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags?.map((tag) => ({ name: tag })) || [],
      author: [
        {
          name: post.frontmatter.author || "Parsa",
        },
      ],
    });
  });

  return feed.rss2();
}

export function generateAtomFeed(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parsavision.github.io";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Parsa's Blog",
    description: "Personal blog about Rust, systems programming, security, and DevOps. I use Arch btw.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa`,
    updated: posts.length > 0 ? new Date(posts[0].frontmatter.date) : new Date(),
    feedLinks: {
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Parsa",
      email: "parsa@parsavision.com",
    },
  });

  posts.forEach((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}/`;

    feed.addItem({
      title: post.frontmatter.title,
      id: postUrl,
      link: postUrl,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
    });
  });

  return feed.atom1();
}

export function generateJSONFeed(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parsavision.github.io";
  const posts = getAllPosts();

  const feed = new Feed({
    title: "Parsa's Blog",
    description: "Personal blog about Rust, systems programming, security, and DevOps. I use Arch btw.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, Parsa`,
    updated: posts.length > 0 ? new Date(posts[0].frontmatter.date) : new Date(),
    feedLinks: {
      json: `${siteUrl}/feed.json`,
    },
    author: {
      name: "Parsa",
    },
  });

  posts.forEach((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}/`;

    feed.addItem({
      title: post.frontmatter.title,
      id: postUrl,
      link: postUrl,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
    });
  });

  return feed.json1();
}
