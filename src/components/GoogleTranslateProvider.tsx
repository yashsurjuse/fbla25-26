"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

/* ------------------------------------------------------------------ */
/* Google Translate codes — map our app codes to google translate codes */
/* ------------------------------------------------------------------ */
const GT_LANG_MAP: Record<string, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
  ar: "ar",
  ru: "ru",
};

/* Extend window for Google Translate */
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: {
          new (
            opts: {
              pageLanguage: string;
              autoDisplay: boolean;
              includedLanguages: string;
            },
            id: string
          ): unknown;
          InlineLayout: { SIMPLE: number };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

/**
 * Invisible provider that loads the Google Translate widget and keeps it
 * hidden. The LanguageSelector drives the zustand store; this component
 * watches the store and programmatically switches Google Translate.
 */
export default function GoogleTranslateProvider() {
  const language = useAppStore((s) => s.language);
  const ready = useRef(false);

  /* 1. Inject the Google Translate script once */
  useEffect(() => {
    // If already loaded, skip
    if (document.getElementById("gt-script")) return;

    // Create hidden container for the widget
    let container = document.getElementById("google_translate_element");
    if (!container) {
      container = document.createElement("div");
      container.id = "google_translate_element";
      container.style.display = "none";
      document.body.appendChild(container);
    }

    // Define the init callback
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          includedLanguages: Object.values(GT_LANG_MAP).join(","),
        },
        "google_translate_element"
      );
      ready.current = true;
    };

    // Append the script
    const script = document.createElement("script");
    script.id = "gt-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* 2. When language changes, drive Google Translate */
  useEffect(() => {
    const targetLang = GT_LANG_MAP[language] || "en";

    const switchLang = () => {
      // Google Translate creates a hidden <select> element.
      // We find it and change its value, then fire a "change" event.
      const selects = document.querySelectorAll<HTMLSelectElement>(
        ".goog-te-combo"
      );
      if (!selects.length) return false;

      const select = selects[0];
      if (targetLang === "en") {
        // To restore original, we pick empty string or "en"
        // Google Translate uses an internal restore mechanism via cookie
        // We'll clear the googtrans cookie to restore English
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
          window.location.hostname;
        // Try using the restore bar if available
        const restoreBtn = document.querySelector<HTMLElement>(
          "#goog-gt-tt .close, .goog-te-banner-frame"
        );
        if (restoreBtn) restoreBtn.click();
        // Also try setting select to empty
        select.value = "en";
        select.dispatchEvent(new Event("change"));
        return true;
      }

      select.value = targetLang;
      select.dispatchEvent(new Event("change"));
      return true;
    };

    // The widget may take a moment to initialize
    if (switchLang()) return;
    const interval = setInterval(() => {
      if (switchLang()) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [language]);

  /* 3. Hide all Google Translate visual artifacts with a style tag */
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "gt-hide-styles";
    style.textContent = `
      /* Hide the Google Translate banner frame */
      .goog-te-banner-frame,
      .goog-te-balloon-frame,
      #goog-gt-tt,
      .goog-te-ftab-link,
      .goog-tooltip,
      .goog-tooltip:hover,
      .goog-text-highlight,
      #google_translate_element,
      .VIpgJd-ZVi9od-ORHb-OEVmcd,
      .VIpgJd-ZVi9od-xl07Ob-lTBxed,
      .VIpgJd-ZVi9od-SmfZ-OEVmcd,
      .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
      .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,
      .skiptranslate {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
      }
      /* Fix body top offset that Google Translate adds */
      body {
        top: 0 !important;
        position: static !important;
      }
      /* Prevent Google Translate from messing with font styling */
      .translated-ltr, .translated-rtl {
        font: inherit !important;
      }
      /* Hide the Google branding tooltip on translated text */
      .goog-te-spinner-pos,
      .goog-te-spinner {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  return null; // This component renders nothing
}
