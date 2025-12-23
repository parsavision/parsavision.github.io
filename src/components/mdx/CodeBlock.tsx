"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ children, className, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  
  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const language = className?.replace(/language-/, "") || "";
  
  const copy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || "";
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get display name for language
  const getLanguageDisplayName = (lang: string): string => {
    const languageNames: Record<string, string> = {
      js: "JavaScript",
      javascript: "JavaScript",
      ts: "TypeScript",
      typescript: "TypeScript",
      tsx: "TSX",
      jsx: "JSX",
      py: "Python",
      python: "Python",
      rb: "Ruby",
      ruby: "Ruby",
      go: "Go",
      rust: "Rust",
      rs: "Rust",
      java: "Java",
      cpp: "C++",
      c: "C",
      cs: "C#",
      csharp: "C#",
      php: "PHP",
      swift: "Swift",
      kotlin: "Kotlin",
      scala: "Scala",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      sass: "Sass",
      less: "Less",
      json: "JSON",
      yaml: "YAML",
      yml: "YAML",
      xml: "XML",
      md: "Markdown",
      markdown: "Markdown",
      mdx: "MDX",
      sql: "SQL",
      graphql: "GraphQL",
      gql: "GraphQL",
      sh: "Shell",
      bash: "Bash",
      zsh: "Zsh",
      powershell: "PowerShell",
      ps1: "PowerShell",
      dockerfile: "Dockerfile",
      docker: "Docker",
      nginx: "Nginx",
      vim: "Vim",
      lua: "Lua",
      r: "R",
      matlab: "MATLAB",
      julia: "Julia",
      elixir: "Elixir",
      erlang: "Erlang",
      haskell: "Haskell",
      clojure: "Clojure",
      lisp: "Lisp",
      scheme: "Scheme",
      perl: "Perl",
      toml: "TOML",
      ini: "INI",
      diff: "Diff",
      git: "Git",
      makefile: "Makefile",
      cmake: "CMake",
      prisma: "Prisma",
      solidity: "Solidity",
      vue: "Vue",
      svelte: "Svelte",
      astro: "Astro",
    };
    return languageNames[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className="group relative my-6">
      {/* Language label and copy button */}
      {language && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">
            {getLanguageDisplayName(language)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copy}
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}
      
      {/* Code block */}
      <pre
        ref={preRef}
        className={`rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 overflow-x-auto ${
          language ? "rounded-t-none" : ""
        } ${showLineNumbers ? "code-with-line-numbers" : ""}`}
      >
        {children}
      </pre>
      
      {/* Copy button for code without language */}
      {!language && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copy}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      )}
    </div>
  );
}

// Wrapper component to extract code content and language from pre > code structure
export function PreWithCodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  // Check if children is a code element
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === "code"
  ) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;

  if (codeElement) {
    const { className, children: codeChildren } = codeElement.props;
    return (
      <CodeBlock className={className} {...props}>
        <code className={className}>{codeChildren}</code>
      </CodeBlock>
    );
  }

  // Fallback to regular pre if no code element found
  return (
    <div className="group relative my-6">
      <pre className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 overflow-x-auto" {...props}>
        {children}
      </pre>
    </div>
  );
}
