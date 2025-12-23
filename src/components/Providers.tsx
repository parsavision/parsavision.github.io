"use client";

import { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

function BodyWrapper({ children }: { children: ReactNode }) {
  const { isRtl } = useLanguage();

  return (
    <div className={cn(isRtl && "font-[family-name:var(--font-vazirmatn)]")}>
      {children}
    </div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <BodyWrapper>{children}</BodyWrapper>
    </LanguageProvider>
  );
}
