# MyBlog - Premium Static Blog System

A modern, fast, and beautiful static blog built with Next.js 14+, Tailwind CSS, and MDX. Deploy to GitHub Pages with zero configuration.

## Features

- **Static Site Generation**: Fast, secure, and SEO-friendly
- **MDX Support**: Write posts in Markdown with React components
- **Dark Theme**: Beautiful pure black (#000) design with white text
- **Syntax Highlighting**: Code blocks with Shiki, line numbers, and copy button
- **Search**: Client-side full-text search with Fuse.js
- **Categories & Tags**: Organize your content effectively
- **Table of Contents**: Auto-generated sticky TOC for long posts
- **Reading Time**: Estimated reading time for each post
- **Related Posts**: Automatically suggest related content
- **RSS Feed**: RSS, Atom, and JSON feeds for subscribers
- **GitHub Stats**: Display your GitHub activity on the About page
- **Rich Editor**: WYSIWYG editor for creating posts locally
- **Mobile Responsive**: Looks great on all devices
- **GitHub Pages Ready**: One-click deployment with GitHub Actions

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

### 3. Create Your First Post

Create a new file in `content/posts/`:

```mdx
---
title: "My First Post"
date: "2024-01-01"
description: "This is my first blog post!"
category: "General"
tags: ["hello", "first-post"]
featured: false
---

# Hello World!

This is my first blog post. Welcome to my blog!
```

### 4. Build and Deploy

```bash
npm run build
```

This creates a static site in the `out/` directory.

## Deployment to GitHub Pages

### Automatic Deployment

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Push a commit to the `main` branch
5. Your site will be live at `https://yourusername.github.io/my-blog/`

### Manual Deployment

```bash
npm run build
# The `out/` directory contains your static site
```

## Project Structure

```
my-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── content/
│   └── posts/              # Your blog posts (MDX files)
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog listing and posts
│   │   ├── category/      # Category pages
│   │   ├── tag/           # Tag pages
│   │   └── editor/        # Local post editor
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── mdx/          # MDX-specific components
│   └── lib/              # Utilities
│       ├── posts.ts      # Post management
│       ├── search.ts     # Search functionality
│       └── github.ts     # GitHub API integration
└── scripts/
    └── generate-static.ts # Build-time static file generation
```

## Writing Posts

### Frontmatter Options

```yaml
---
title: "Post Title"           # Required
date: "2024-01-01"           # Required (YYYY-MM-DD)
description: "Description"    # Required
category: "Technology"        # Optional
tags: ["tag1", "tag2"]       # Optional
featured: true               # Optional (shows on homepage)
author: "Your Name"          # Optional
image: "/images/cover.jpg"   # Optional (cover image)
---
```

### MDX Components

You can use custom components in your MDX files:

```mdx
<Callout type="info" title="Note">
This is an informational callout.
</Callout>

<Callout type="warning">
This is a warning!
</Callout>

<Callout type="success">
Great job!
</Callout>

<Callout type="error">
Something went wrong.
</Callout>
```

### Code Blocks

````mdx
```typescript title="example.ts"
function hello(name: string): string {
  return `Hello, ${name}!`;
}
```
````

### Tables

```mdx
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

## Configuration

### Site Settings

Edit `src/app/layout.tsx` to customize:
- Site title and description
- Meta tags and Open Graph settings
- Author information

### Theme Customization

Edit `src/app/globals.css` to customize:
- Colors (CSS variables)
- Typography
- Spacing

### GitHub Pages Base Path

If deploying to `username.github.io/repo-name/`, update `next.config.ts`:

```typescript
const nextConfig = {
  basePath: "/repo-name",
  // ... other config
};
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Available variables:
- `NEXT_PUBLIC_SITE_URL`: Your site URL
- `GITHUB_USERNAME`: Your GitHub username (for About page)
- `GITHUB_TOKEN`: Optional, for higher API rate limits

## Local Editor

Visit `/editor` to use the built-in post editor:
1. Write your content with the rich text editor
2. Fill in metadata (title, description, tags)
3. Click "Download MDX" to save the file
4. Place the file in `content/posts/`
5. Commit and push to deploy

## License

MIT License - feel free to use this for your own blog!

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [MDX](https://mdxjs.com)
- [Lucide Icons](https://lucide.dev)
