"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  themeVariables: {
    primaryColor: "#333",
    primaryTextColor: "#fff",
    primaryBorderColor: "#555",
    lineColor: "#666",
    secondaryColor: "#222",
    tertiaryColor: "#111",
  },
});

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div ref={containerRef} className="mermaid my-6">
      {chart}
    </div>
  );
}
