import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";
import "katex/dist/katex.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "MyBlog - A Personal Tech Blog",
    template: "%s | MyBlog",
  },
  description: "A personal blog about technology, programming, and life. Sharing thoughts and learnings along the way.",
  keywords: ["blog", "technology", "programming", "web development", "tutorials"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourblog.com",
    siteName: "MyBlog",
    title: "MyBlog - A Personal Tech Blog",
    description: "A personal blog about technology, programming, and life.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyBlog - A Personal Tech Blog",
    description: "A personal blog about technology, programming, and life.",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts();

  // Website JSON-LD structured data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MyBlog",
    description: "A personal blog about technology, programming, and life.",
    url: "https://yourblog.com",
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yourblog.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header posts={posts} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
