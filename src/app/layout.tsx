import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
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
    default: "Parsa's Blog - Tech, Programming & Systems",
    template: "%s | Parsa's Blog",
  },
  description: "Personal blog by Parsa about Rust, systems programming, security, DevOps, and low-level development. I use Arch btw.",
  keywords: ["blog", "Rust", "systems programming", "security", "DevOps", "Linux", "Arch Linux", "programming"],
  authors: [{ name: "Parsa", url: "https://github.com/parsavision" }],
  creator: "Parsa",
  metadataBase: new URL("https://parsavision.github.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parsavision.github.io",
    siteName: "Parsa's Blog",
    title: "Parsa's Blog - Tech, Programming & Systems",
    description: "Personal blog about Rust, systems programming, security, and DevOps. I use Arch btw.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parsa's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa's Blog - Tech, Programming & Systems",
    description: "Personal blog about Rust, systems programming, security, and DevOps.",
    creator: "@parsavision",
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
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/atom.xml",
      "application/json": "/feed.json",
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
    name: "Parsa's Blog",
    description: "Personal blog about Rust, systems programming, security, and DevOps.",
    url: "https://parsavision.github.io",
    author: {
      "@type": "Person",
      name: "Parsa",
      url: "https://github.com/parsavision",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://parsavision.github.io/blog/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header posts={posts} />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
