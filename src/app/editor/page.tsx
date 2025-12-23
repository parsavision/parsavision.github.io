"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Download,
  Eye,
  Edit3,
  X,
  Plus,
} from "lucide-react";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your post...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] focus:outline-none p-4",
      },
    },
  });

  const addTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  }, [newTag, tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }, [tags]);

  const generateMarkdown = useCallback(() => {
    if (!editor) return "";

    const content = editor.getHTML();
    // Convert HTML to simple markdown (basic conversion)
    let markdown = content
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n\n")
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      .replace(/<s>(.*?)<\/s>/g, "~~$1~~")
      .replace(/<code>(.*?)<\/code>/g, "`$1`")
      .replace(/<blockquote><p>(.*?)<\/p><\/blockquote>/g, "> $1\n\n")
      .replace(/<ul>(.*?)<\/ul>/gs, (_, items) => {
        return items.replace(/<li><p>(.*?)<\/p><\/li>/g, "- $1\n") + "\n";
      })
      .replace(/<ol>(.*?)<\/ol>/gs, (_, items) => {
        let counter = 1;
        return items.replace(/<li><p>(.*?)<\/p><\/li>/g, () => {
          return `${counter++}. ` + "$1\n";
        }) + "\n";
      })
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .trim();

    const frontmatter = `---
title: "${title || "Untitled Post"}"
date: "${new Date().toISOString().split("T")[0]}"
description: "${description || "No description"}"
category: "${category || "Uncategorized"}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
featured: false
---

`;

    return frontmatter + markdown;
  }, [editor, title, description, category, tags]);

  const downloadPost = useCallback(() => {
    const markdown = generateMarkdown();
    const filename = title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : "untitled-post";

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generateMarkdown, title]);

  if (!editor) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Post Editor</h1>
            <p className="text-muted-foreground mt-1">
              Create and edit your blog posts locally
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            <Button onClick={downloadPost}>
              <Download className="h-4 w-4 mr-2" />
              Download MDX
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Input
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold h-14 bg-transparent border-none focus-visible:ring-0 px-0"
            />

            {/* Toolbar */}
            {!previewMode && (
              <div className="flex flex-wrap gap-1 p-2 rounded-lg border border-border bg-card">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive("bold") ? "bg-secondary" : ""}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive("italic") ? "bg-secondary" : ""}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive("strike") ? "bg-secondary" : ""}
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={editor.isActive("code") ? "bg-secondary" : ""}
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 1 }) ? "bg-secondary" : ""
                  }
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 2 }) ? "bg-secondary" : ""
                  }
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={
                    editor.isActive("heading", { level: 3 }) ? "bg-secondary" : ""
                  }
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive("bulletList") ? "bg-secondary" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={
                    editor.isActive("orderedList") ? "bg-secondary" : ""
                  }
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={editor.isActive("blockquote") ? "bg-secondary" : ""}
                >
                  <Quote className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Editor Content */}
            <Card>
              <CardContent className="p-0">
                {previewMode ? (
                  <div className="prose prose-invert max-w-none p-4 min-h-[400px]">
                    <pre className="text-sm whitespace-pre-wrap bg-secondary p-4 rounded-lg overflow-x-auto">
                      {generateMarkdown()}
                    </pre>
                  </div>
                ) : (
                  <EditorContent editor={editor} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Metadata */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Brief description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    placeholder="e.g., Technology"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button size="icon" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-white/20 rounded p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  1. Write your post using the rich text editor.
                </p>
                <p>
                  2. Fill in the metadata (title, description, category, tags).
                </p>
                <p>
                  3. Click &quot;Download MDX&quot; to save the file.
                </p>
                <p>
                  4. Place the downloaded .mdx file in your{" "}
                  <code className="bg-secondary px-1 rounded">
                    content/posts/
                  </code>{" "}
                  directory.
                </p>
                <p>
                  5. Commit and push to trigger a new build.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
