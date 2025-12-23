"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, Languages } from "lucide-react";
import { GitHubStatsClient } from "@/components/GitHubStatsClient";

interface AboutContentProps {
  githubUsername: string;
}

// Skills and technologies
const skills = [
  "Rust",
  "Vim",
  "Arch Linux",
  "Docker",
  "DevOps",
  "Security",
  "Systems Programming",
  "VHDL",
  "CLI Tools",
  "Git",
];

// Content in both languages
const content = {
  en: {
    greeting: "Hey! I'm Parsa",
    role: "Computer Engineering Student",
    bio1: "I use Arch btw.",
    bio2: "I'm really into Rust - the language just clicks with me. Also obsessed with Vim keybindings to the point where I beat Elden Ring and Dark Souls 3 using only keyboard with Vim keybindings. No mouse. Yeah, I'm that person.",
    bio3: "Into security, low-level programming, and breaking things to see how they work.",
    whatsHere: "What's Here",
    whatsHereDesc: "Some learning repos I made for myself:",
    whatsHereFooter: "Also some VHDL assignments from uni.",
    randomStuff: "Random Stuff",
    randomItems: [
      "Arch Linux user (btw)",
      "Vim keybindings everywhere",
      "Security and systems programming enthusiast",
      "Git commits keep me accountable",
      "Souls games with keyboard only was absolutely worth it",
    ],
    githubButton: "Check out my GitHub",
    skillsTitle: "Skills & Technologies",
    githubActivity: "GitHub Activity",
    switchLang: "فارسی",
    projects: [
      { name: "Rust Tiny Steps", description: "Learning Rust through small exercises" },
      { name: "DevOps & Docker Tiny Steps", description: "Containerization stuff" },
      { name: "Front-End Tiny Steps", description: "Web dev basics" },
      { name: "Rust CLI Mastery", description: "Command-line tools in Rust" },
    ],
  },
  fa: {
    greeting: "سلام! من پارسا هستم",
    role: "دانشجوی مهندسی کامپیوتر",
    bio1: "از Arch استفاده می‌کنم btw.",
    bio2: "خیلی به Rust علاقه دارم - این زبان واقعاً حس خوبی بهم میده. همچنین وسواس‌گونه عاشق Vim keybindings هستم، به حدی که Elden Ring و Dark Souls 3 رو فقط با کیبورد و کی‌بایندینگ‌های Vim تموم کردم. بدون موس. آره، من همون آدمم.",
    bio3: "به امنیت، برنامه‌نویسی سطح پایین، و خراب کردن چیزا برای فهمیدن نحوه کارشون علاقه دارم.",
    whatsHere: "اینجا چی هست",
    whatsHereDesc: "چندتا ریپوی یادگیری که برای خودم درست کردم:",
    whatsHereFooter: "یه کم هم تکالیف VHDL دانشگاه.",
    randomStuff: "چندتا چیز تصادفی",
    randomItems: [
      "کاربر Arch Linux (btw)",
      "Vim keybindings همه جا",
      "علاقه‌مند به امنیت و برنامه‌نویسی سیستم‌ها",
      "کامیت‌های Git پاسخگوم نگه می‌دارن",
      "بازی کردن Souls با فقط کیبورد کاملاً ارزشش رو داشت",
    ],
    githubButton: "سری به GitHub من بزن",
    skillsTitle: "مهارت‌ها و تکنولوژی‌ها",
    githubActivity: "فعالیت GitHub",
    switchLang: "English",
    projects: [
      { name: "Rust Tiny Steps", description: "یادگیری Rust از طریق تمرین‌های کوچیک" },
      { name: "DevOps & Docker Tiny Steps", description: "چیزای مربوط به کانتینرسازی" },
      { name: "Front-End Tiny Steps", description: "مبانی توسعه وب" },
      { name: "Rust CLI Mastery", description: "ابزارهای خط فرمان با Rust" },
    ],
  },
};

export function AboutContent({ githubUsername }: AboutContentProps) {
  const [lang, setLang] = useState<"en" | "fa">("en");
  const t = content[lang];
  const isRtl = lang === "fa";

  return (
    <div 
      className={`container mx-auto px-4 py-12 ${isRtl ? "font-[family-name:var(--font-vazirmatn)]" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        {/* Language Toggle */}
        <div className={`flex ${isRtl ? "justify-start" : "justify-end"} mb-8`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "en" ? "fa" : "en")}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {t.switchLang}
          </Button>
        </div>

        {/* Header */}
        <section className="mb-12">
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
                {t.greeting}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t.role}
              </p>
            </div>
          </div>

          {/* Bio */}
          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <p className="text-lg leading-relaxed">
                {t.bio1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.bio2}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.bio3}
              </p>
            </CardContent>
          </Card>

          {/* What's Here */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">{t.whatsHere}</h2>
            <p className="text-muted-foreground mb-4">{t.whatsHereDesc}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {t.projects.map((project) => (
                <Card key={project.name}>
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground mt-4">{t.whatsHereFooter}</p>
          </div>

          {/* Random Stuff */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">{t.randomStuff}</h2>
            <ul className="space-y-2 text-muted-foreground">
              {t.randomItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* GitHub Button */}
          <div className="flex justify-center mb-8">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/parsavision"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {t.githubButton}
              </a>
            </Button>
          </div>
        </section>

        <Separator className="mb-12" />

        {/* Skills */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            {t.skillsTitle}
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
            {t.githubActivity}
          </h2>
          <GitHubStatsClient username={githubUsername} />
        </section>
      </div>
    </div>
  );
}
