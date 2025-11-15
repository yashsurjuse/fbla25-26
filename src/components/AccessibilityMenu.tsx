"use client";

import { startTransition, type ChangeEvent, type CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "a11y-settings-v1";

type ColorblindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";

type AccessibilitySettings = {
  highContrast: boolean;
  colorblindMode: ColorblindMode;
  colorblindStrength: number;
  textScale: number;
  fontFamily: "default" | "system" | "serif" | "mono";
  invertColors: boolean;
  grayscale: number;
  saturation: number;
  contrastBoost: number;
  highlightCursor: boolean;
};

const dropdownOptionStyle: CSSProperties = {
  color: "#000",
  backgroundColor: "#fff",
};
const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  colorblindMode: "none",
  colorblindStrength: 50,
  textScale: 1,
  fontFamily: "default",
  invertColors: false,
  grayscale: 0,
  saturation: 100,
  contrastBoost: 100,
  highlightCursor: false,
};

function getFontFamily(option: AccessibilitySettings["fontFamily"]) {
  switch (option) {
    case "system":
      return "system-ui, -apple-system, \"Segoe UI\", sans-serif";
    case "serif":
      return "\"Georgia\", \"Times New Roman\", serif";
    case "mono":
      return "\"IBM Plex Mono\", \"SFMono-Regular\", Menlo, monospace";
    default:
      return "var(--font-geist-sans), system-ui, -apple-system, \"Segoe UI\", sans-serif";
  }
}

function getColorblindFilter(mode: ColorblindMode, strength: number) {
  if (mode === "none" || strength <= 0) {
    return "";
  }

  const ratio = Math.min(Math.max(strength, 0), 100) / 100;

  if (mode === "protanopia") {
    return `sepia(${0.6 * ratio}) saturate(${1 - 0.25 * ratio}) hue-rotate(${10 * ratio}deg)`;
  }

  if (mode === "deuteranopia") {
    return `sepia(${0.5 * ratio}) saturate(${1 - 0.2 * ratio}) hue-rotate(${(-12) * ratio}deg)`;
  }

  return `sepia(${0.45 * ratio}) saturate(${1 - 0.3 * ratio}) hue-rotate(${18 * ratio}deg)`;
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [speechState, setSpeechState] = useState<"idle" | "speaking">("idle");
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [wasOpenedCompact, setWasOpenedCompact] = useState(false);

  const compactByWidth = viewport.width > 0 ? viewport.width < 1024 : false;
  const shouldUseCompact = isTouchDevice || compactByWidth;
  // Memoize isCompact to prevent it from changing when filters update
  const isCompact = useMemo(() => {
    // If menu is closed, just return the natural shouldUseCompact value
    if (!open) return shouldUseCompact;
    // If menu is open, lock to the mode it was opened in
    return wasOpenedCompact;
  }, [open, shouldUseCompact, wasOpenedCompact]);
  const isTextScaleLocked = viewport.width > 0 && (viewport.width < 630 || viewport.height < 700);
  const hideAdvancedSections = isCompact;
  const effectiveTextScale = isTextScaleLocked ? 1 : settings.textScale;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>;
        startTransition(() => {
          setSettings({ ...defaultSettings, ...parsed });
        });
      }
    } catch (error) {
      console.warn("Unable to read accessibility settings", error);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const filters: string[] = [];

    if (settings.highContrast) {
      filters.push("contrast(1.5) brightness(1.1)");
    }
    if (settings.invertColors) {
      filters.push("invert(1) hue-rotate(180deg)");
    }
    if (settings.grayscale > 0) {
      filters.push(`grayscale(${(settings.grayscale / 100).toFixed(2)})`);
    }
    if (settings.saturation !== 100) {
      filters.push(`saturate(${(settings.saturation / 100).toFixed(2)})`);
    }
    if (settings.contrastBoost !== 100) {
      filters.push(`contrast(${(settings.contrastBoost / 100).toFixed(2)})`);
    }

    const colorblindFilter = getColorblindFilter(settings.colorblindMode, settings.colorblindStrength);
    if (colorblindFilter) {
      filters.push(colorblindFilter);
    }

    const filterValue = filters.length ? filters.join(" ") : "none";

    const fontFamily = getFontFamily(settings.fontFamily);
    const fontSizePx = `${(16 * effectiveTextScale).toFixed(2)}px`;

    root.style.setProperty("--a11y-text-scale", effectiveTextScale.toString());
    root.style.setProperty("--a11y-filter", filterValue);
    root.style.setProperty("--a11y-font-family", fontFamily);
    root.style.fontSize = fontSizePx;
    body.style.filter = "";
    body.style.fontFamily = fontFamily;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn("Unable to persist accessibility settings", error);
    }
  }, [settings, effectiveTextScale]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const highlightId = "a11y-cursor-highlight";
    let highlightEl = document.getElementById(highlightId) as HTMLDivElement | null;

    const handleMove = (event: PointerEvent) => {
      if (highlightEl) {
        highlightEl.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    if (settings.highlightCursor) {
      if (!highlightEl) {
        highlightEl = document.createElement("div");
        highlightEl.id = highlightId;
        highlightEl.setAttribute("aria-hidden", "true");
        document.body.appendChild(highlightEl);
      }
      document.addEventListener("pointermove", handleMove, { passive: true });
    } else if (highlightEl) {
      highlightEl.remove();
      highlightEl = null;
    }

    return () => {
      document.removeEventListener("pointermove", handleMove);
      const existing = document.getElementById(highlightId);
      if (existing) {
        existing.remove();
      }
    };
  }, [settings.highlightCursor]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    // Reset after animation completes
    setTimeout(() => setWasOpenedCompact(false), 250);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        // Opening: save the compact mode state
        const needsCompact = isTouchDevice || (viewport.width > 0 && viewport.width < 1024);
        setWasOpenedCompact(needsCompact);
      }
      return next;
    });
  }, [isTouchDevice, viewport.width]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleToggle = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      const isOpen = Boolean(detail);
      setNavDrawerOpen(isOpen);
      if (isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("met-nav-drawer-toggle", handleToggle as EventListener);
    return () => window.removeEventListener("met-nav-drawer-toggle", handleToggle as EventListener);
  }, [closeMenu]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const coarseQuery = window.matchMedia?.("(pointer: coarse)");
    const updateTouch = () => setIsTouchDevice(Boolean(coarseQuery?.matches));
    updateTouch();
    coarseQuery?.addEventListener?.("change", updateTouch);
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
      coarseQuery?.removeEventListener?.("change", updateTouch);
    };
  }, []);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSlider = (key: keyof AccessibilitySettings) => (event: ChangeEvent<HTMLInputElement>) => {
    if (key === "textScale" && isTextScaleLocked) {
      return;
    }
    const value = parseFloat(event.target.value);
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelect = <K extends keyof AccessibilitySettings>(key: K) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as AccessibilitySettings[K];
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text to speech is not supported in this browser.");
      return;
    }

    const synthesis = window.speechSynthesis;
    synthesis.cancel();

    const selection = window.getSelection()?.toString().trim();
    const content = selection && selection.length > 0 ? selection : document.body.innerText;

    if (!content) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = effectiveTextScale > 1.2 ? 0.95 : 1;
    utterance.onend = () => setSpeechState("idle");
    utterance.onerror = () => setSpeechState("idle");

    setSpeechState("speaking");
    synthesis.speak(utterance);
  };

  const handleStopSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    setSpeechState("idle");
  };

  if (navDrawerOpen) {
    return null;
  }

  const panelContent = (
    <div
      className={`a11y-filter-target ${
        isCompact ? "w-full max-h-[80vh] max-w-md" : "w-[360px] max-h-[70vh]"
      } rounded-3xl border border-white/15 bg-[#081225]/95 text-white shadow-2xl shadow-black/40 backdrop-blur-lg`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Accessibility controls</h2>
        </div>
        <button
          type="button"
          onClick={closeMenu}
          className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:border-white/25 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          aria-label="Close accessibility menu"
        >
          ×
        </button>
      </div>

      <div className="custom-scrollbar max-h-[60vh] space-y-6 overflow-y-auto px-5 py-4">
              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Visual clarity</h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => toggleSetting("highContrast")}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                      settings.highContrast ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/15 bg-white/5 hover:border-white/25"
                    }`}
                    aria-pressed={settings.highContrast}
                  >
                    <span>High contrast</span>
                    <span className="text-xs text-white/60">{settings.highContrast ? "On" : "Off"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSetting("invertColors")}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                      settings.invertColors ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/15 bg-white/5 hover:border-white/25"
                    }`}
                    aria-pressed={settings.invertColors}
                  >
                    <span>Invert colors</span>
                    <span className="text-xs text-white/60">{settings.invertColors ? "On" : "Off"}</span>
                  </button>
                </div>
                <div>
                  <label className="flex items-center justify-between text-sm text-white/75">
                    <span>Contrast boost</span>
                    <span className="text-xs text-white/60">{settings.contrastBoost}%</span>
                  </label>
                  <input
                    type="range"
                    min={80}
                    max={140}
                    step={5}
                    value={settings.contrastBoost}
                    onChange={handleSlider("contrastBoost")}
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="flex items-center justify-between text-sm text-white/75">
                    <span>Grayscale</span>
                    <span className="text-xs text-white/60">{settings.grayscale}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={settings.grayscale}
                    onChange={handleSlider("grayscale")}
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="flex items-center justify-between text-sm text-white/75">
                    <span>Saturation</span>
                    <span className="text-xs text-white/60">{settings.saturation}%</span>
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={160}
                    step={5}
                    value={settings.saturation}
                    onChange={handleSlider("saturation")}
                    className="mt-1 w-full"
                  />
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Color assistance</h3>
                <div className="space-y-2">
                  <label className="block text-sm text-white/75">
                    Colorblind mode
                    <div className="relative mt-2">
                      <select
                        value={settings.colorblindMode}
                        onChange={handleSelect("colorblindMode")}
                        className="w-full appearance-none rounded-xl border border-white/15 bg-white/10 px-3 py-2 pr-10 text-white/80 shadow-inner shadow-white/5 transition focus:border-white/35 focus:outline-none focus:ring-0"
                      >
                        <option value="none" style={dropdownOptionStyle}>None</option>
                        <option value="protanopia" style={dropdownOptionStyle}>Protanopia</option>
                        <option value="deuteranopia" style={dropdownOptionStyle}>Deuteranopia</option>
                        <option value="tritanopia" style={dropdownOptionStyle}>Tritanopia</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">▾</span>
                    </div>
                  </label>
                  <div>
                    <label className="flex items-center justify-between text-sm text-white/75">
                      <span>Strength</span>
                      <span className="text-xs text-white/60">{settings.colorblindStrength}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={settings.colorblindStrength}
                      onChange={handleSlider("colorblindStrength")}
                      className="mt-1 w-full"
                      disabled={settings.colorblindMode === "none"}
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Readability</h3>
                <div>
                  <label className="flex items-center justify-between text-sm text-white/75">
                    <span>Text size</span>
                    <span className="text-xs text-white/60">{(effectiveTextScale * 100).toFixed(0)}%</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={1.6}
                    step={0.05}
                    value={effectiveTextScale}
                    onChange={handleSlider("textScale")}
                    className="mt-1 w-full"
                    disabled={isTextScaleLocked}
                  />
                  {isTextScaleLocked && <p className="mt-1 text-xs text-white/50">Scaling is disabled on smaller screens to preserve layout.</p>}
                </div>
                <label className="block text-sm text-white/75">
                  Font family
                  <div className="relative mt-2">
                    <select
                      value={settings.fontFamily}
                      onChange={handleSelect("fontFamily")}
                      className="w-full appearance-none rounded-xl border border-white/15 bg-white/10 px-3 py-2 pr-10 text-white/80 shadow-inner shadow-white/5 transition focus:border-white/35 focus:outline-none focus:ring-0"
                    >
                      <option value="default" style={dropdownOptionStyle}>Site default</option>
                      <option value="system" style={dropdownOptionStyle}>System sans-serif</option>
                      <option value="serif" style={dropdownOptionStyle}>Serif</option>
                      <option value="mono" style={dropdownOptionStyle}>Mono</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">▾</span>
                  </div>
                </label>
              </section>

              {hideAdvancedSections ? null : (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Pointer</h3>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleSetting("highlightCursor")}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                        settings.highlightCursor ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/15 bg-white/5 hover:border-white/25"
                      }`}
                      aria-pressed={settings.highlightCursor}
                    >
                      <span>Highlight cursor</span>
                      <span className="text-xs text-white/60">{settings.highlightCursor ? "On" : "Off"}</span>
                    </button>
                  </div>
                </section>
              )}

              {hideAdvancedSections ? null : (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Text to speech</h3>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleSpeak}
                      className="flex-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/85 transition hover:border-white/25 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      {speechState === "speaking" ? "Re-read" : "Read selection/page"}
                    </button>
                    <button
                      type="button"
                      onClick={handleStopSpeak}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/75 transition hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      Stop
                    </button>
                  </div>
                  <p className="text-xs text-white/50">Tip: Select text before pressing read to hear just that portion.</p>
                </section>
              )}
            </div>
    </div>
  );

  const panelInitial = isCompact ? { opacity: 0, scale: 0.9 } : { opacity: 0, y: 18, scale: 0.94 };
  const panelAnimate = isCompact ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 };
  const panelExit = isCompact ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 12, scale: 0.97 };
  const panelClass = isCompact ? "fixed inset-0 z-[65] flex items-center justify-center p-4" : "absolute bottom-full right-0 mb-4";

  return (
    <motion.div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && isCompact && (
          <motion.div
            key="a11y-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
            aria-hidden
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            key="a11y-panel"
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility menu"
            className={panelClass}
          >
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
            onClick={toggleMenu}
        className="a11y-filter-target flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white/85 shadow-lg shadow-black/35 backdrop-blur transition hover:border-white/25 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        aria-haspopup="dialog"
        aria-expanded={open}
        whileTap={{ scale: 0.97 }}
      >
        <span aria-hidden>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <circle cx="12" cy="5" r="2.5" fill="currentColor" />
            <path d="M6 11l6-2 6 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 21.5l3-6 3 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>Accessibility</span>
      </motion.button>
    </motion.div>
  );
}
