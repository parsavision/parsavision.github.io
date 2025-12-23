"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageLightbox({
  src,
  alt,
  width = 800,
  height = 400,
  className = "",
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = useCallback(() => setIsOpen(true), []);
  const closeLightbox = useCallback(() => setIsOpen(false), []);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox]);

  const isExternal = src.startsWith("http");

  return (
    <>
      {/* Thumbnail */}
      <figure className={`my-8 group cursor-zoom-in ${className}`} onClick={openLightbox}>
        <div className="relative overflow-hidden rounded-lg border border-[hsl(var(--border))]">
          {isExternal ? (
            <img
              src={src}
              alt={alt}
              className="w-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="w-full transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5" />
          </Button>

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {isExternal ? (
              <img
                src={src}
                alt={alt}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={width * 2}
                height={height * 2}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            )}
          </div>

          {alt && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">
              {alt}
            </p>
          )}
        </div>
      )}
    </>
  );
}
