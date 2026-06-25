"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Syncs the <html lang="..."> attribute with the chosen language from the store.
 * This helps search engines and assistive technologies recognize the active language.
 */
export default function HtmlLangSync() {
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    document.documentElement.lang = language;
    // Set dir attribute for RTL languages (Arabic)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return null;
}
