"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accessibility } from "lucide-react";
import { useCart } from "@/components/CartContext";
import CustomDropdown from "@/components/CustomDropdown";

type ColorblindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";
type FontFamilyOption = "default" | "system" | "serif" | "mono" | "dyslexia";

type AccessibilitySettings = {
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  textScale: number;
  colorblindMode: ColorblindMode;
  colorblindStrength: number;
  invertColors: boolean;
  grayscale: number;
  saturation: number;
  contrastBoost: number;
  fontFamily: FontFamilyOption;
  highlightCursor: boolean;
  letterSpacing: number;
  lineHeight: number;
  screenReaderMode: boolean;
  keyboardHints: boolean;
};

const STORAGE_KEY = "met-a11y-settings-v3";
const CLOSE_ANIMATION_MS = 210;

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
  textScale: 1,
  colorblindMode: "none",
  colorblindStrength: 50,
  invertColors: false,
  grayscale: 0,
  saturation: 100,
  contrastBoost: 100,
  fontFamily: "default",
  highlightCursor: false,
  letterSpacing: 0,
  lineHeight: 1.5,
  screenReaderMode: false,
  keyboardHints: false,
};

function getFontFamily(option: FontFamilyOption) {
  switch (option) {
    case "system":
      return 'system-ui, -apple-system, "Segoe UI", sans-serif';
    case "serif":
      return 'Georgia, "Times New Roman", serif';
    case "mono":
      return '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace';
    case "dyslexia":
      return 'Verdana, Tahoma, "Segoe UI", sans-serif';
    default:
      return 'var(--font-source-sans), "Trebuchet MS", "Segoe UI", sans-serif';
  }
}

function getDisplayFontFamily(option: FontFamilyOption) {
  switch (option) {
    case "default":
      return 'var(--font-cormorant), Georgia, "Times New Roman", serif';
    case "serif":
      return 'Georgia, "Times New Roman", serif';
    case "mono":
      return '"IBM Plex Mono", "SFMono-Regular", Menlo, monospace';
    case "system":
      return 'system-ui, -apple-system, "Segoe UI", sans-serif';
    case "dyslexia":
      return 'Verdana, Tahoma, "Segoe UI", sans-serif';
    default:
      return 'var(--font-cormorant), Georgia, "Times New Roman", serif';
  }
}

function parseRgba(color: string): [number, number, number, number] | null {
  const match = color.match(/^rgba?\(([^)]+)\)$/i);
  if (!match) {
    return null;
  }

  const parts = match[1].split(",").map((part) => part.trim());
  if (parts.length < 3) {
    return null;
  }

  const r = Number(parts[0]);
  const g = Number(parts[1]);
  const b = Number(parts[2]);
  const a = parts.length > 3 ? Number(parts[3]) : 1;

  if ([r, g, b, a].some((value) => Number.isNaN(value))) {
    return null;
  }

  return [
    Math.min(255, Math.max(0, r)),
    Math.min(255, Math.max(0, g)),
    Math.min(255, Math.max(0, b)),
    Math.min(1, Math.max(0, a)),
  ];
}

function getBackgroundColorFromTree(element: Element | null): string | null {
  let current = element as HTMLElement | null;

  while (current) {
    const bgColor = window.getComputedStyle(current).backgroundColor;
    const parsed = parseRgba(bgColor);
    if (parsed && parsed[3] > 0.02) {
      return bgColor;
    }
    current = current.parentElement;
  }

  return window.getComputedStyle(document.body).backgroundColor;
}

function getLuminance(color: string): number {
  const parsed = parseRgba(color);
  if (!parsed) {
    return 1;
  }

  const [r, g, b, a] = parsed;
  if (a <= 0.02) {
    return 1;
  }

  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function hasDarkBackgroundHint(element: Element | null): boolean {
  const darkClassPattern = /bg-black|from-black|to-black|text-white|bg-\[#0/i;

  let current = element as HTMLElement | null;
  while (current) {
    const classes = typeof current.className === "string" ? current.className : "";
    if (darkClassPattern.test(classes)) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}

function getColorblindFilter(mode: ColorblindMode, strength: number) {
  if (mode === "none") {
    return "";
  }

  const ratio = Math.min(Math.max(strength, 0), 100) / 100;

  if (mode === "protanopia") {
    return `sepia(${(0.58 * ratio).toFixed(2)}) saturate(${(1 - 0.24 * ratio).toFixed(2)}) hue-rotate(${(8 * ratio).toFixed(2)}deg)`;
  }

  if (mode === "deuteranopia") {
    return `sepia(${(0.48 * ratio).toFixed(2)}) saturate(${(1 - 0.2 * ratio).toFixed(2)}) hue-rotate(${(-12 * ratio).toFixed(2)}deg)`;
  }

  return `sepia(${(0.44 * ratio).toFixed(2)}) saturate(${(1 - 0.28 * ratio).toFixed(2)}) hue-rotate(${(18 * ratio).toFixed(2)}deg)`;
}

function buildFilter(settings: AccessibilitySettings) {
  const filters: string[] = [];

  if (settings.highContrast) {
    filters.push("contrast(1.35) brightness(1.06)");
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

  const colorblind = getColorblindFilter(settings.colorblindMode, settings.colorblindStrength);
  if (colorblind) {
    filters.push(colorblind);
  }

  return filters.length ? filters.join(" ") : "none";
}

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.dataset.contrast = settings.highContrast ? "high" : "normal";
  root.dataset.motion = settings.reduceMotion ? "reduced" : "normal";
  root.style.setProperty("--user-text-scale", settings.textScale.toFixed(2));
  root.style.setProperty("--a11y-filter", buildFilter(settings));
  root.style.setProperty("--a11y-font-family", getFontFamily(settings.fontFamily));
  root.style.setProperty("--a11y-display-font-family", getDisplayFontFamily(settings.fontFamily));
  root.style.setProperty("--a11y-cursor", "auto");
  root.style.setProperty("--a11y-cursor-pointer", "pointer");
  root.style.setProperty("--a11y-letter-spacing", `${settings.letterSpacing}px`);
  root.style.setProperty("--a11y-line-height", settings.lineHeight.toString());
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);
  root.classList.toggle("a11y-screen-reader-mode", settings.screenReaderMode);
  root.classList.toggle("a11y-keyboard-hints", settings.keyboardHints);
}

export default function AccessibilityControls() {
  const pathname = usePathname();
  const { isOpen: cartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [speechState, setSpeechState] = useState<"idle" | "speaking">("idle");
  const [launcherLightMode, setLauncherLightMode] = useState(() => pathname === "/");
  const closeTimerRef = useRef<number | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") {
      return defaultSettings;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return defaultSettings;
      }
      const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
      return { ...defaultSettings, ...parsed };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
    }
  }, [settings]);

  useEffect(() => {
    setLauncherLightMode(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    if (!settings.highlightCursor || typeof document === "undefined") {
      const existing = document.getElementById("a11y-cursor-highlight");
      if (existing) {
        existing.remove();
      }
      return;
    }

    const highlightId = "a11y-cursor-highlight";
    let highlightEl = document.getElementById(highlightId) as HTMLDivElement | null;

    if (!highlightEl) {
      highlightEl = document.createElement("div");
      highlightEl.id = highlightId;
      highlightEl.setAttribute("aria-hidden", "true");
      document.body.appendChild(highlightEl);
    }

    const handleMove = (event: PointerEvent) => {
      if (highlightEl) {
        highlightEl.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    document.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handleMove);
      const existing = document.getElementById(highlightId);
      if (existing) {
        existing.remove();
      }
    };
  }, [settings.highlightCursor]);

  const updateLauncherContrast = useCallback(() => {
    if (typeof window === "undefined" || !launcherRef.current) {
      return;
    }

    const launcher = launcherRef.current;
    const rect = launcher.getBoundingClientRect();
    const samplePoints = [
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.25 },
      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.25 },
      { x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.75 },
      { x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.75 },
    ].map((point) => ({
      x: Math.min(window.innerWidth - 1, Math.max(0, point.x)),
      y: Math.min(window.innerHeight - 1, Math.max(0, point.y)),
    }));

    const previousPointerEvents = launcher.style.pointerEvents;
    launcher.style.pointerEvents = "none";

    let darkVotes = 0;

    for (const point of samplePoints) {
      const stack = document
        .elementsFromPoint(point.x, point.y)
        .filter((element) => element !== launcher);

      let pointIsDark = false;

      for (const element of stack.slice(0, 10)) {
        if (hasDarkBackgroundHint(element)) {
          pointIsDark = true;
          break;
        }

        const background = getBackgroundColorFromTree(element);
        if (background && getLuminance(background) < 0.58) {
          pointIsDark = true;
          break;
        }
      }

      if (pointIsDark) {
        darkVotes += 1;
      }
    }

    launcher.style.pointerEvents = previousPointerEvents;
    setLauncherLightMode(darkVotes < 2);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let rafId = 0;

    const schedule = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateLauncherContrast();
      });
    };

    updateLauncherContrast();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [updateLauncherContrast, open, pathname]);

  const toggleSetting = (
    key:
      | "highContrast"
      | "reduceMotion"
      | "underlineLinks"
      | "invertColors"
      | "highlightCursor"
      | "screenReaderMode"
      | "keyboardHints",
  ) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reset = () => {
    setSettings(defaultSettings);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeechState("idle");
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synthesis = window.speechSynthesis;
    synthesis.cancel();

    const selected = window.getSelection()?.toString().trim();
    const text = selected && selected.length > 0 ? selected : document.body.innerText;
    if (!text) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.textScale > 1.2 ? 0.95 : 1;
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

  const closePanel = () => {
    if (!open || closing) {
      return;
    }

    setClosing(true);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      closeTimerRef.current = null;
    }, CLOSE_ANIMATION_MS);
  };

  const togglePanel = () => {
    if (open) {
      closePanel();
      return;
    }

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setClosing(false);
    setOpen(true);
  };

  return (
    <>
      {open ? (
        <>
          <button
            type="button"
            className={`${closing ? "popup-backdrop-exit" : "popup-backdrop-enter"} fixed inset-0 z-[9998] bg-black/45 backdrop-blur-[1px]`}
            aria-label="Close accessibility controls"
            onClick={closePanel}
          />

          <div className={`${closing ? "popup-panel-exit" : "popup-panel-enter"} fixed inset-x-4 bottom-24 z-[9999] max-h-[78vh] overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/60 backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.15)] sm:inset-x-auto sm:right-6 sm:w-[26rem]`}>
            <div className="flex items-center justify-between border-b border-white/30 bg-white/40 px-6 py-5">
              <h2 className="font-display text-2xl font-bold text-black">Accessibility</h2>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-black/5 hover:border-black/30"
                aria-label="Close accessibility controls"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(78vh-4.15rem)] space-y-4 overflow-y-auto p-4 pb-6 text-sm text-black/80">
              <button
                type="button"
                onClick={() => toggleSetting("highContrast")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.highContrast}
              >
                <span>High contrast</span>
                <span>{settings.highContrast ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSetting("reduceMotion")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.reduceMotion}
              >
                <span>Reduced motion</span>
                <span>{settings.reduceMotion ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSetting("underlineLinks")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.underlineLinks}
              >
                <span>Underline links</span>
                <span>{settings.underlineLinks ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSetting("invertColors")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.invertColors}
              >
                <span>Invert colors</span>
                <span>{settings.invertColors ? "On" : "Off"}</span>
              </button>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Text scale: {Math.round(settings.textScale * 100)}%</span>
                <input
                  type="range"
                  min={0.9}
                  max={1.45}
                  step={0.05}
                  value={settings.textScale}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, textScale: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <div className="rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-2 block font-medium">Colorblind mode</span>
                <CustomDropdown
                  value={settings.colorblindMode}
                  onChange={(val) => setSettings((prev) => ({ ...prev, colorblindMode: val as ColorblindMode }))}
                  placeholder="Select mode"
                  options={[
                    { value: "none", label: "None" },
                    { value: "protanopia", label: "Protanopia" },
                    { value: "deuteranopia", label: "Deuteranopia" },
                    { value: "tritanopia", label: "Tritanopia" }
                  ]}
                  className="!w-full [&>button]:!px-3 [&>button]:!py-2 [&>button]:!bg-[#f7f7f7]"
                />
              </div>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Colorblind strength: {settings.colorblindStrength}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={settings.colorblindStrength}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, colorblindStrength: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                  disabled={settings.colorblindMode === "none"}
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Grayscale: {settings.grayscale}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={settings.grayscale}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, grayscale: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Saturation: {settings.saturation}%</span>
                <input
                  type="range"
                  min={60}
                  max={160}
                  step={5}
                  value={settings.saturation}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, saturation: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Contrast boost: {settings.contrastBoost}%</span>
                <input
                  type="range"
                  min={80}
                  max={160}
                  step={5}
                  value={settings.contrastBoost}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, contrastBoost: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <div className="rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-2 block font-medium">Font family</span>
                <CustomDropdown
                  value={settings.fontFamily}
                  onChange={(val) => setSettings((prev) => ({ ...prev, fontFamily: val as FontFamilyOption }))}
                  placeholder="Select font"
                  options={[
                    { value: "default", label: "Site default" },
                    { value: "system", label: "System sans-serif" },
                    { value: "serif", label: "Serif" },
                    { value: "mono", label: "Mono" },
                    { value: "dyslexia", label: "Dyslexia-friendly" }
                  ]}
                  className="!w-full [&>button]:!px-3 [&>button]:!py-2 [&>button]:!bg-[#f7f7f7]"
                />
              </div>

              <button
                type="button"
                onClick={() => toggleSetting("highlightCursor")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.highlightCursor}
              >
                <span>Highlight cursor</span>
                <span>{settings.highlightCursor ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSetting("screenReaderMode")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.screenReaderMode}
              >
                <span>Screen reader optimization</span>
                <span>{settings.screenReaderMode ? "On" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSetting("keyboardHints")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.keyboardHints}
              >
                <span>Keyboard navigation hints</span>
                <span>{settings.keyboardHints ? "On" : "Off"}</span>
              </button>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Letter spacing: {settings.letterSpacing}px</span>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={settings.letterSpacing}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, letterSpacing: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Line height: {settings.lineHeight}</span>
                <input
                  type="range"
                  min={1}
                  max={2.5}
                  step={0.1}
                  value={settings.lineHeight}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, lineHeight: Number(event.target.value) }))
                  }
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                />
              </label>

              <div className="rounded-xl border border-white/50 bg-white/50 px-4 py-4 backdrop-blur-md">
                <p className="mb-3 font-semibold text-black">Text to speech</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className="flex-1 pill-btn pill-btn-dark px-3 py-2 text-xs uppercase tracking-wider transition-all"
                  >
                    {speechState === "speaking" ? "Re-read" : "Read selection"}
                  </button>
                  <button
                    type="button"
                    onClick={handleStopSpeak}
                    className="pill-btn pill-btn-light px-4 py-2 text-xs uppercase tracking-wider transition-all"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="w-full pill-btn pill-btn-dark px-3 py-3 mt-2 text-xs uppercase tracking-wider transition-all"
              >
                Reset settings
              </button>
            </div>
          </div>
        </>
      ) : null}

      <div className={`fixed bottom-6 right-6 z-[10000] transition-opacity duration-300 ${cartOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <button
          ref={launcherRef}
          type="button"
          onClick={togglePanel}
          className={`group flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all hover:scale-110 border-none ${launcherLightMode ? "bg-black text-white" : "bg-white text-black"}`}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Accessibility controls"
        >
          <Accessibility className="h-6 w-6 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </>
  );
}
