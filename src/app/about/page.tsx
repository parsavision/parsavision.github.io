import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Computer engineering student. Rust enthusiast. Arch Linux user. Vim keybindings everywhere.",
};

export default function AboutPage() {
  const githubUsername = process.env.GITHUB_USERNAME || "parsavision";

  return <AboutContent githubUsername={githubUsername} />;
}
