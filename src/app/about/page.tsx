import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";
import { GitHubStatsClient } from "@/components/GitHubStatsClient";

export const metadata: Metadata = {
  title: "About",
  description: "Computer engineering student. Rust enthusiast. Arch Linux user. Vim keybindings everywhere.",
};

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

// Projects/repos
const projects = [
  { name: "Rust Tiny Steps", description: "Learning Rust through small exercises" },
  { name: "DevOps & Docker Tiny Steps", description: "Containerization stuff" },
  { name: "Front-End Tiny Steps", description: "Web dev basics" },
  { name: "Rust CLI Mastery", description: "Command-line tools in Rust" },
];

export default function AboutPage() {
  const githubUsername = process.env.GITHUB_USERNAME || "parsavision";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* English Section */}
        <section className="mb-16">
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
                Hey! I&apos;m Parsa
              </h1>
              <p className="text-xl text-muted-foreground">
                Computer Engineering Student
              </p>
            </div>
          </div>

          {/* Bio */}
          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <p className="text-lg leading-relaxed">
                I use Arch btw.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m really into Rust - the language just clicks with me. Also obsessed with 
                Vim keybindings to the point where I beat Elden Ring and Dark Souls 3 using only 
                keyboard with Vim keybindings. No mouse. Yeah, I&apos;m that person.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Into security, low-level programming, and breaking things to see how they work.
              </p>
            </CardContent>
          </Card>

          {/* What's Here */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">What&apos;s Here</h2>
            <p className="text-muted-foreground mb-4">Some learning repos I made for myself:</p>
            <div className="grid gap-3 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.name}>
                  <CardContent className="pt-4 pb-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground mt-4">Also some VHDL assignments from uni.</p>
          </div>

          {/* Random Stuff */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Random Stuff</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Arch Linux user (btw)</li>
              <li>• Vim keybindings everywhere</li>
              <li>• Security and systems programming enthusiast</li>
              <li>• Git commits keep me accountable</li>
              <li>• Souls games with keyboard only was absolutely worth it</li>
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
                <Github className="h-4 w-4" />
                Check out my GitHub
              </a>
            </Button>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* Persian Section */}
        <section className="mb-16 font-[family-name:var(--font-vazirmatn)]" dir="rtl">
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
                سلام! من پارسا هستم
              </h1>
              <p className="text-xl text-muted-foreground">
                دانشجوی مهندسی کامپیوتر
              </p>
            </div>
          </div>

          {/* Bio */}
          <Card className="mb-8">
            <CardContent className="pt-6 space-y-4">
              <p className="text-lg leading-relaxed">
                از Arch استفاده می‌کنم btw.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                خیلی به Rust علاقه دارم - این زبان واقعاً حس خوبی بهم میده. همچنین وسواس‌گونه 
                عاشق Vim keybindings هستم، به حدی که Elden Ring و Dark Souls 3 رو فقط با 
                کیبورد و کی‌بایندینگ‌های Vim تموم کردم. بدون موس. آره، من همون آدمم.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                به امنیت، برنامه‌نویسی سطح پایین، و خراب کردن چیزا برای فهمیدن نحوه کارشون علاقه دارم.
              </p>
            </CardContent>
          </Card>

          {/* What's Here */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">اینجا چی هست</h2>
            <p className="text-muted-foreground mb-4">چندتا ریپوی یادگیری که برای خودم درست کردم:</p>
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold">Rust Tiny Steps</h3>
                  <p className="text-sm text-muted-foreground">یادگیری Rust از طریق تمرین‌های کوچیک</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold">DevOps & Docker Tiny Steps</h3>
                  <p className="text-sm text-muted-foreground">چیزای مربوط به کانتینرسازی</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold">Front-End Tiny Steps</h3>
                  <p className="text-sm text-muted-foreground">مبانی توسعه وب</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4">
                  <h3 className="font-semibold">Rust CLI Mastery</h3>
                  <p className="text-sm text-muted-foreground">ابزارهای خط فرمان با Rust</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground mt-4">یه کم هم تکالیف VHDL دانشگاه.</p>
          </div>

          {/* Random Stuff */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">چندتا چیز تصادفی</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• کاربر Arch Linux (btw)</li>
              <li>• Vim keybindings همه جا</li>
              <li>• علاقه‌مند به امنیت و برنامه‌نویسی سیستم‌ها</li>
              <li>• کامیت‌های Git پاسخگوم نگه می‌دارن</li>
              <li>• بازی کردن Souls با فقط کیبورد کاملاً ارزشش رو داشت</li>
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
                <Github className="h-4 w-4" />
                سری به GitHub من بزن
              </a>
            </Button>
          </div>
        </section>

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
