"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  theme?: "dark" | "light";
};

type CalendarDay = {
  date: Date;
  inMonth: boolean;
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    return null;
  }
  return parsed;
}

function getMonthMatrix(monthDate: Date): CalendarDay[][] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);
  const weeks: CalendarDay[][] = [];
  const cursor = new Date(gridStart);

  for (let week = 0; week < 6; week++) {
    const days: CalendarDay[] = [];
    for (let day = 0; day < 7; day++) {
      days.push({ date: new Date(cursor), inMonth: cursor.getMonth() === month });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(days);
  }

  return weeks;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const displayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function DatePicker({ value, onChange, placeholder = "Select a date", theme = "dark" }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => parseISODate(value), [value]);
  const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
    selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date(),
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const syncMonthToSelection = () => {
    const target = selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date();

    setVisibleMonth((prev) => {
      if (prev.getFullYear() === target.getFullYear() && prev.getMonth() === target.getMonth()) {
        return prev;
      }
      return target;
    });
  };

  useEffect(() => {
    if (!open) return undefined;

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const calendar = useMemo(() => getMonthMatrix(visibleMonth), [visibleMonth]);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const handleSelect = (date: Date) => {
    onChange(formatISODate(date));
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setOpen(false);
  };

  const displayValue = selectedDate ? displayFormatter.format(selectedDate) : placeholder;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => {
            const next = !prev;
            if (!prev && next) {
              syncMonthToSelection();
            }
            return next;
          })
        }
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2",
          theme === "dark"
            ? "border border-white/15 bg-white/10 text-white/80 focus-visible:border-white/40 focus-visible:ring-cyan-300/40"
            : "border border-black/20 bg-white text-black/80 focus-visible:border-black/45 focus-visible:ring-black/15",
          selectedDate ? (theme === "dark" ? "text-white" : "text-black") : theme === "dark" ? "text-white/60" : "text-black/50",
        )}
      >
        <span>{displayValue}</span>
        <svg
          className={cn("h-4 w-4", theme === "dark" ? "text-white/60" : "text-black/60")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="4" ry="4" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease }}
            className={cn(
              "absolute z-50 mt-3 w-72 rounded-2xl p-4 shadow-2xl backdrop-blur",
              theme === "dark" ? "border border-white/10 bg-[#0b1220] text-white shadow-black/35" : "border border-black/10 bg-white text-black shadow-black/20",
            )}
          >
            <header className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                }
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                  theme === "dark"
                    ? "border border-white/10 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/15"
                    : "border border-black/10 bg-black/5 text-black/80 hover:border-black/25 hover:bg-black/10",
                )}
                aria-label="Previous month"
              >
                <span aria-hidden>‹</span>
              </button>
              <div className={cn("text-sm font-medium uppercase tracking-[0.24em]", theme === "dark" ? "text-white/70" : "text-black/70")}>
                {monthFormatter.format(visibleMonth)}
              </div>
              <button
                type="button"
                onClick={() =>
                  setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                }
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full transition",
                  theme === "dark"
                    ? "border border-white/10 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/15"
                    : "border border-black/10 bg-black/5 text-black/80 hover:border-black/25 hover:bg-black/10",
                )}
                aria-label="Next month"
              >
                <span aria-hidden>›</span>
              </button>
            </header>

            <div className={cn("mb-3 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em]", theme === "dark" ? "text-white/40" : "text-black/40")}>
              {dayLabels.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-sm">
              {calendar.flat().map((day) => {
                const isSelected = isSameDay(day.date, selectedDate);
                const isToday = isSameDay(day.date, today);
                return (
                  <button
                    key={day.date.toISOString()}
                    type="button"
                    onClick={() => handleSelect(day.date)}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-full border border-transparent transition",
                      day.inMonth ? (theme === "dark" ? "text-white" : "text-black") : theme === "dark" ? "text-white/40" : "text-black/40",
                      isSelected
                        ? theme === "dark"
                          ? "border-cyan-300/60 bg-cyan-400/15 text-white shadow-[0_0_20px_rgba(72,211,255,0.25)]"
                          : "border-black/50 bg-black text-white"
                        : isToday
                        ? theme === "dark"
                          ? "border-white/15 bg-white/10"
                          : "border-black/20 bg-black/5"
                        : theme === "dark"
                          ? "hover:border-white/20 hover:bg-white/10"
                          : "hover:border-black/20 hover:bg-black/5",
                    )}
                  >
                    {day.date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className={cn("mt-4 flex items-center justify-between text-xs", theme === "dark" ? "text-white/60" : "text-black/60")}>
              <button
                type="button"
                onClick={() => handleSelect(today)}
                className={cn(
                  "rounded-full px-3 py-1.5 font-medium transition",
                  theme === "dark"
                    ? "border border-white/10 bg-white/10 text-white/80 hover:border-white/25 hover:bg-white/20"
                    : "border border-black/10 bg-black/5 text-black/80 hover:border-black/25 hover:bg-black/10",
                )}
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleClear}
                className={cn("underline-offset-4 transition hover:underline", theme === "dark" ? "text-white/50 hover:text-white/80" : "text-black/50 hover:text-black/80")}
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
