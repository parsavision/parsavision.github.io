# Parsa's Blog - Premium Static Blog System

A modern, fast, and beautiful static blog built with Next.js 16+, Tailwind CSS v4, and MDX. Features bilingual support (English/Persian), dark theme, and GitHub Pages deployment.

## Features

### Core
- **Static Site Generation**: Fast, secure, and SEO-optimized with Next.js 16
- **MDX Support**: Write posts in Markdown with embedded React components
- **Dark Theme**: Pure black (#000) design with white text for optimal readability
- **Bilingual Support**: English and Persian (Farsi) with RTL layout support
- **Typography**: Beautiful prose styling with `@tailwindcss/typography`

### Content
- **Syntax Highlighting**: Code blocks with rehype-pretty-code (GitHub Dark theme)
- **Math Equations**: KaTeX support for mathematical notation
- **Tables**: Styled markdown tables with proper dark theme
- **Callouts**: Info, warning, success, and error callout components
- **Mermaid Diagrams**: Diagram support (coming soon)

### Navigation & Discovery
- **Search**: Client-side full-text search with Fuse.js (Cmd+K shortcut)
- **Categories & Tags**: Organize and filter your content
- **Table of Contents**: Auto-generated sticky TOC for long posts
- **Related Posts**: Automatically suggest related content
- **Reading Time**: Estimated reading time for each post

### Feeds & SEO
- **RSS/Atom/JSON Feeds**: Multiple feed formats for subscribers
- **Sitemap**: Auto-generated sitemap.xml
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, JSON-LD
- **Canonical URLs**: Proper canonical link handling

### Developer Experience
- **Rich Editor**: Built-in WYSIWYG editor at `/editor` route
- **GitHub Stats**: Display GitHub activity on the About page
- **Loading States**: Skeleton loaders for better UX
- **Mobile Responsive**: Fully responsive design
- **GitHub Pages Ready**: Automated deployment with GitHub Actions

## Quick Start

### 1. Install Dependencies

```bash
cd my-blog
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://parsavision.github.io
GITHUB_USERNAME=parsavision
GITHUB_TOKEN=your_github_token_optional
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

### 4. Create Your First Post

Create a new file in `content/posts/my-first-post.md`:

```mdx
---
title: "My First Post"
title_fa: "اولین پست من"
date: "2025-01-01"
description: "This is my first blog post!"
description_fa: "این اولین پست وبلاگ من است!"
category: "General"
category_fa: "عمومی"
tags: ["hello", "first-post"]
tags_fa: ["سلام", "اولین-پست"]
featured: false
author: "Parsa"
---

# Hello World!

This is my first blog post. Welcome to my blog!

<!-- PERSIAN -->

# سلام دنیا!

این اولین پست وبلاگ من است. به وبلاگ من خوش آمدید!
```

### 5. Build for Production

```bash
npm run build
```

This creates a static site in the `out/` directory with all feeds and sitemap.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to repository **Settings → Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Push a commit to the `main` branch
5. Your site will be live at `https://parsavision.github.io/`

### Manual Deployment

```bash
npm run build
# Upload the `out/` directory to your hosting provider
```

## Project Structure

```
my-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── content/
│   └── posts/                  # Blog posts (MDX/MD files)
│       ├── my-post.md
│       └── another-post.md
├── public/                     # Static assets (images, fonts)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── loading.tsx        # Loading skeleton
│   │   ├── about/page.tsx     # About page with GitHub stats
│   │   ├── blog/              # Blog listing and posts
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── category/[category]/
│   │   ├── tag/[tag]/
│   │   └── editor/page.tsx    # Local post editor
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── mdx/               # MDX components (Callout, etc.)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── BlogPostContent.tsx
│   │   └── GitHubStats.tsx
│   └── lib/
│       ├── posts.ts           # Post utilities
│       ├── search.ts          # Search with Fuse.js
│       ├── github.ts          # GitHub API integration
│       ├── language.ts        # i18n language context
│       ├── feed.ts            # RSS/Atom/JSON feed generation
│       ├── sitemap.ts         # Sitemap generation
│       └── utils.ts           # Utility functions
├── scripts/
│   └── generate-static.ts     # Build-time static file generation
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Writing Posts

### Frontmatter Options

```yaml
---
# Required
title: "Post Title"
date: "2025-01-01"
description: "A brief description of your post"

# Optional - Persian translations
title_fa: "عنوان پست"
description_fa: "توضیحات مختصر پست شما"
category_fa: "دسته‌بندی"
tags_fa: ["تگ۱", "تگ۲"]

# Optional - Metadata
category: "Technology"
tags: ["nextjs", "react", "tutorial"]
featured: true
author: "Parsa"
image: "/images/cover.jpg"
---
```

### Bilingual Content

Use the `<!-- PERSIAN -->` delimiter to separate English and Persian content:

```markdown
# English Title

English content goes here...

<!-- PERSIAN -->

# عنوان فارسی

محتوای فارسی اینجا قرار می‌گیرد...
```

Users can toggle between languages using the language switcher in the header.

### MDX Components

#### Callouts

```mdx
<Callout type="info" title="Note">
This is an informational callout.
</Callout>

<Callout type="warning">
This is a warning!
</Callout>

<Callout type="success">
Operation completed successfully.
</Callout>

<Callout type="error">
Something went wrong.
</Callout>
```

#### Code Blocks

````mdx
```typescript title="example.ts"
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
````

Features:
- Syntax highlighting (GitHub Dark theme)
- Optional title/filename display
- Line highlighting with `{1,3-5}` syntax
- Copy button (built-in)

#### Tables

```mdx
| Feature | Status |
|---------|--------|
| MDX     | ✅     |
| Search  | ✅     |
| RSS     | ✅     |
```

#### Math (KaTeX)

```mdx
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## Configuration

### Site Metadata

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Parsa's Blog",
    template: "%s | Parsa's Blog",
  },
  description: "Your site description",
  // ... other metadata
};
```

### Theme Customization

Edit `src/app/globals.css` CSS variables:

```css
:root {
  --background: 0 0% 0%;        /* Pure black */
  --foreground: 0 0% 100%;      /* White text */
  --card: 0 0% 3%;              /* Slightly lighter black */
  --muted-foreground: 0 0% 65%; /* Gray text */
  --border: 0 0% 18%;           /* Border color */
  /* ... more variables */
}
```

### GitHub Pages Base Path

For deployment to `username.github.io/repo-name/`, update `next.config.ts`:

```typescript
const nextConfig = {
  basePath: "/repo-name",
  assetPrefix: "/repo-name",
  // ... other config
};
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (generates static files) |
| `npm run start` | Start production server (for testing) |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site's public URL |
| `GITHUB_USERNAME` | No | GitHub username for About page stats |
| `GITHUB_TOKEN` | No | GitHub token for higher API rate limits |

## Local Editor

Visit `/editor` to use the built-in post editor:

1. Write content with the rich text editor
2. Fill in metadata (title, description, tags)
3. Toggle between English and Persian
4. Click "Download MDX" to save the file
5. Place the file in `content/posts/`
6. Commit and push to deploy

## Performance

The blog is optimized for performance:

- Static HTML generation (no server required)
- Optimized images with Next.js Image component
- Minimal JavaScript bundle
- Efficient CSS with Tailwind v4
- Fast client-side search with Fuse.js

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Components**: [shadcn/ui](https://ui.shadcn.com)
- **Content**: [MDX](https://mdxjs.com) with next-mdx-remote
- **Search**: [Fuse.js](https://fusejs.io)
- **Syntax Highlighting**: [rehype-pretty-code](https://rehype-pretty-code.netlify.app)
- **Math**: [KaTeX](https://katex.org)
- **Icons**: [Lucide React](https://lucide.dev)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) (optional)

## License

MIT License - feel free to use this for your own blog!

---

Built with care by [Parsa](https://github.com/parsavision)
