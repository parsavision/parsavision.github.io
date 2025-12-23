import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Callout } from "./Callout";
import { MermaidDiagram } from "./Mermaid";
import { PreWithCodeBlock } from "./CodeBlock";
import { ImageLightbox } from "./ImageLightbox";

// Heading element types
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Custom heading components with anchor links
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const HeadingComponent = ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { id?: string }) => {
    const Tag = `h${level}` as HeadingTag;
    
    return React.createElement(
      Tag,
      { id, className: "group scroll-mt-20", ...props },
      <>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="heading-anchor text-muted-foreground hover:text-foreground"
            aria-label={`Link to ${children}`}
          >
            #
          </a>
        )}
      </>
    );
  };
  
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

// Custom link component
function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className="text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-colors"
      {...props}
    >
      {children}
    </a>
  );
}

// Custom image component with optimization
function CustomImage({
  src,
  alt,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number;
  height?: number;
}) {
  if (!src || typeof src !== "string") return null;

  // For external images or if dimensions are not provided, use regular img
  if (src.startsWith("http") || (!width && !height)) {
    return (
      <figure className="my-8">
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg border border-border w-full"
          {...props}
        />
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || ""}
        width={width || 800}
        height={height || 400}
        className="rounded-lg border border-border"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// Custom table component
function Table({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  );
}

// Export all MDX components
export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  img: CustomImage,
  pre: PreWithCodeBlock,
  table: Table,
  Image: CustomImage,
  ImageLightbox,
  Callout,
  Mermaid: MermaidDiagram,
};
