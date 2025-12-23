import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  
  // Base path for GitHub Pages (set to "" for user.github.io or "/repo-name" for project pages)
  basePath: "",
  
  // Disable image optimization for static export (required)
  images: {
    unoptimized: true,
  },
  
  // Enable trailing slashes for better GitHub Pages compatibility
  trailingSlash: true,
  
  // Strict mode for React
  reactStrictMode: true,
  
  // TypeScript config
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
