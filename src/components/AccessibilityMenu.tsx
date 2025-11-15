"use client";

import { useEffect, useRef, useState } from "react";

interface AccessibilitySettings {
  customCursor: boolean;
  visualClarity: boolean;
  colorblindMode: boolean;
}

function getInitialSettings(): AccessibilitySettings {
  if (typeof window === "undefined") {
    return {
      customCursor: false,
      visualClarity: false,
      colorblindMode: false,
    };
  }

  const savedSettings = localStorage.getItem("accessibilitySettings");
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error("Failed to parse accessibility settings", e);
    }
  }

  return {
    customCursor: false,
    visualClarity: false,
    colorblindMode: false,
  };
}

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);
  const isFirstRender = useRef(true);

  // Function to apply settings to the DOM
  const applySettings = (settings: AccessibilitySettings) => {
    // Apply custom cursor
    if (settings.customCursor) {
      document.body.style.cursor = "url(/cursor.png), auto";
      // Apply to clickable elements
      let style = document.getElementById("custom-cursor-style") as HTMLStyleElement;
      if (!style) {
        style = document.createElement("style");
        style.id = "custom-cursor-style";
        document.head.appendChild(style);
      }
      style.innerHTML = `
        a, button, [role="button"], input[type="button"], input[type="submit"] {
          cursor: url(/cursor_select.png), pointer !important;
        }
      `;
    } else {
      document.body.style.cursor = "";
      const existingStyle = document.getElementById("custom-cursor-style");
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    // Apply visual clarity
    if (settings.visualClarity) {
      document.body.classList.add("visual-clarity");
    } else {
      document.body.classList.remove("visual-clarity");
    }

    // Apply colorblind mode
    if (settings.colorblindMode) {
      document.body.classList.add("colorblind-mode");
    } else {
      document.body.classList.remove("colorblind-mode");
    }
  };

  // Apply settings when they change
  useEffect(() => {
    // Skip on first render to avoid double application
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Apply initial settings
      applySettings(settings);
      return;
    }

    // Save to localStorage
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));

    // Apply settings
    applySettings(settings);
  }, [settings]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open accessibility menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      {/* Accessibility Menu Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-lg border border-white/20 bg-[#1a1d29] p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Accessibility</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 transition hover:text-white"
              aria-label="Close accessibility menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Custom Cursor Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="custom-cursor" className="text-sm text-white/90">
                Custom Cursor
              </label>
              <button
                id="custom-cursor"
                onClick={() => toggleSetting("customCursor")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.customCursor ? "bg-blue-600" : "bg-gray-600"
                }`}
                role="switch"
                aria-checked={settings.customCursor}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.customCursor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Visual Clarity Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="visual-clarity" className="text-sm text-white/90">
                Visual Clarity
              </label>
              <button
                id="visual-clarity"
                onClick={() => toggleSetting("visualClarity")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.visualClarity ? "bg-blue-600" : "bg-gray-600"
                }`}
                role="switch"
                aria-checked={settings.visualClarity}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.visualClarity ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Colorblind Mode Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="colorblind-mode" className="text-sm text-white/90">
                Colorblind Mode
              </label>
              <button
                id="colorblind-mode"
                onClick={() => toggleSetting("colorblindMode")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.colorblindMode ? "bg-blue-600" : "bg-gray-600"
                }`}
                role="switch"
                aria-checked={settings.colorblindMode}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.colorblindMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs text-white/60">
              These settings are saved to your browser and will persist across sessions.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
