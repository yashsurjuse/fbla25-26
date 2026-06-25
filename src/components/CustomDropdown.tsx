import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

type CustomDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  className?: string;
};

export default function CustomDropdown({ value, onChange, options, placeholder, className = "" }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-full border border-black/30 bg-white/50 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-black outline-none focus:border-black/50 focus:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all hover:bg-white"
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-3xl border border-black/10 bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.1)] popup-rise-in">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-black/5 ${
              value === "" ? "text-[color:var(--accent)]" : "text-black"
            }`}
          >
            {placeholder}
            {value === "" && <Check className="h-4 w-4" />}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-black/5 ${
                value === opt.value ? "text-[color:var(--accent)]" : "text-black"
              }`}
            >
              {opt.label}
              {value === opt.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
