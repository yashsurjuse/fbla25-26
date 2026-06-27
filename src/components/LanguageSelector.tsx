"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore, LANGUAGES } from "@/lib/store";

export default function LanguageSelector() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="notranslate relative" ref={containerRef} translate="no">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-black shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
        <span>{currentLang.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="popup-rise-in absolute bottom-full mb-4 left-0 md:left-auto md:right-0 z-[5000] w-56 rounded-[2rem] border border-white/20 bg-black/60 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <ul role="listbox">
            {LANGUAGES.map((lang) => (
              <li key={lang.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={language === lang.code}
                  className={`flex w-full items-center justify-between rounded-full px-5 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                    language === lang.code ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => {
                     setLanguage(lang.code);
                     setIsOpen(false);
                  }}
                >
                  {lang.name}
                  {language === lang.code && (
                    <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
