"use client";

import { useEffect, useRef } from "react";

interface GiscusProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
}

export function Giscus({
  repo = "parsavision/parsavision.github.io",
  repoId = "", // You'll need to get this from giscus.app
  category = "Announcements",
  categoryId = "", // You'll need to get this from giscus.app
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  // Show placeholder if Giscus is not configured
  if (!repoId || !categoryId) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <p className="text-muted-foreground text-sm">
          Comments are powered by{" "}
          <a 
            href="https://giscus.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:no-underline"
          >
            Giscus
          </a>
          . To enable comments, configure the Giscus component with your repository details.
        </p>
        <p className="text-muted-foreground text-xs">
          Visit{" "}
          <a 
            href="https://giscus.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:no-underline"
          >
            giscus.app
          </a>
          {" "}to get your repo ID and category ID.
        </p>
      </div>
    );
  }

  return <div ref={ref} className="giscus" />;
}
