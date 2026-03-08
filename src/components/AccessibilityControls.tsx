"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);
}

export default function AccessibilityControls() {
  const pathname = usePathname();
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
      // Ignore malformed storage and continue with defaults.
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
      // Some browsers block storage in privacy mode.
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
    setLauncherLightMode(darkVotes >= 2);
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
      | "highlightCursor",
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
            className={`${closing ? "popup-backdrop-exit" : "popup-backdrop-enter"} fixed inset-0 z-[67] bg-black/45 backdrop-blur-[1px]`}
            aria-label="Close accessibility controls"
            onClick={closePanel}
          />

          <div className={`${closing ? "popup-panel-exit" : "popup-panel-enter"} fixed inset-x-4 bottom-20 z-[69] max-h-[78vh] overflow-hidden rounded-2xl border border-black/20 bg-[#fdfdfb] shadow-[0_24px_70px_rgba(0,0,0,0.32)] sm:inset-x-auto sm:right-6 sm:w-[26rem]`}>
            <div className="flex items-center justify-between border-b border-black/10 bg-[#f4f3ef] px-5 py-4">
              <h2 className="font-display text-3xl font-semibold text-black">Accessibility</h2>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-md border border-black/25 px-3 py-1 text-xs font-semibold text-black hover:bg-black/5"
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
                  className="w-full"
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Colorblind mode</span>
                <select
                  value={settings.colorblindMode}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, colorblindMode: event.target.value as ColorblindMode }))
                  }
                  className="w-full border border-black/25 bg-white px-2 py-2"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Protanopia</option>
                  <option value="deuteranopia">Deuteranopia</option>
                  <option value="tritanopia">Tritanopia</option>
                </select>
              </label>

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
                  className="w-full"
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
                  className="w-full"
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
                  className="w-full"
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
                  className="w-full"
                />
              </label>

              <label className="block rounded-lg border border-black/20 bg-white px-3 py-2">
                <span className="mb-1 block font-medium">Font family</span>
                <select
                  value={settings.fontFamily}
                  onChange={(event) =>
                    setSettings((prev) => ({ ...prev, fontFamily: event.target.value as FontFamilyOption }))
                  }
                  className="w-full border border-black/25 bg-white px-2 py-2"
                >
                  <option value="default">Site default</option>
                  <option value="system">System sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Mono</option>
                  <option value="dyslexia">Dyslexia-friendly</option>
                </select>
              </label>

              <button
                type="button"
                onClick={() => toggleSetting("highlightCursor")}
                className="flex w-full items-center justify-between rounded-lg border border-black/20 bg-white px-3 py-2 text-left transition-colors hover:bg-black/5"
                aria-pressed={settings.highlightCursor}
              >
                <span>Highlight cursor</span>
                <span>{settings.highlightCursor ? "On" : "Off"}</span>
              </button>

              <div className="rounded-lg border border-black/20 bg-white px-3 py-2">
                <p className="mb-2 font-medium text-black">Text to speech</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSpeak}
                    className="flex-1 rounded-md border border-black bg-black px-3 py-2 text-sm font-semibold text-white"
                  >
                    {speechState === "speaking" ? "Re-read" : "Read selection/page"}
                  </button>
                  <button
                    type="button"
                    onClick={handleStopSpeak}
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="w-full rounded-md border border-black bg-black px-3 py-2 text-sm font-semibold text-white"
              >
                Reset accessibility settings
              </button>
            </div>
          </div>
        </>
      ) : null}

      <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
        <button
          ref={launcherRef}
          type="button"
          onClick={togglePanel}
          className={`border px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] shadow-lg transition-colors duration-200 ${
            launcherLightMode
              ? "border-white bg-white text-black hover:bg-[#f1f1f1]"
              : "border-black bg-black text-white hover:bg-[#1a1a1a]"
          }`}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          Accessibility
        </button>
      </div>
    </>
  );
}
