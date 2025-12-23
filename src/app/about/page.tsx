import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Mail, Linkedin, MapPin, Calendar } from "lucide-react";
import { GitHubStatsClient } from "@/components/GitHubStatsClient";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me, my background, and what I do.",
};

// Skills and technologies
const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL",
  "REST APIs",
  "Git",
];

// Social links
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
];

export default function AboutPage() {
  // Set your GitHub username here
  const githubUsername = process.env.GITHUB_USERNAME || "octocat";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="space-y-6 text-center mb-12">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-1">
              <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-4xl">
                👋
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Hey, I&apos;m Your Name
            </h1>
            <p className="text-xl text-muted-foreground">
              Software Engineer & Tech Enthusiast
            </p>
          </div>
        </div>

        {/* Bio */}
        <Card className="mb-12">
          <CardContent className="pt-6 space-y-4">
            <p className="text-lg leading-relaxed">
              I&apos;m a passionate software engineer with a love for building
              elegant solutions to complex problems. Currently focused on web
              development, distributed systems, and developer experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding, you can find me exploring new technologies,
              contributing to open source, writing blog posts, or enjoying a good
              cup of coffee. I believe in continuous learning and sharing knowledge
              with the community.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Building since 2015
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="outline" asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </a>
            </Button>
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Skills */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-2 text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="mb-12" />

        {/* GitHub Stats */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            GitHub Activity
          </h2>
          <GitHubStatsClient username={githubUsername} />
        </section>
      </div>
    </div>
  );
}
