"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/exhibitions", label: "Exhibitions" },
    { href: "/artists", label: "Artists" },
    { href: "/artifacts", label: "Artifacts" },
    { href: "/visit", label: "Visit" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("met-nav-drawer-toggle", { detail: open }));
      document.body.classList.toggle("nav-drawer-open", open);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("nav-drawer-open");
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="a11y-filter-target fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-none absolute inset-0 h-20 bg-gradient-to-b from-black/65 via-black/30 to-transparent backdrop-blur-md transition-opacity duration-300 ${
          hasScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white md:px-10">
        <Link href="/" className="flex items-center text-white">
          <span className="text-lg font-semibold uppercase tracking-[0.35em] text-white/90">THE MET</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/85 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            className="rounded-full border border-white/20 bg-white px-5 py-2 text-black shadow-sm backdrop-blur transition hover:brightness-[0.92]"
          >
            <Link href="/visit">Tickets</Link>
          </Button>
        </div>

        <button
          className="relative inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 p-2 text-white/90 backdrop-blur md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[80vw] flex-col border-l border-white/10 bg-[#05070d]/95 px-6 py-8 text-white/85 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/70">
            <span>THE MET</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full border border-white/20 bg-white/10 p-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-1 text-base">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="py-2" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/visit"
            className="mt-auto inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black"
            onClick={() => setOpen(false)}
          >
            Tickets
          </Link>
        </div>
      </div>
    </header>
  );
}
