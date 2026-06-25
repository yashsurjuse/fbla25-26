"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { footerLinks, museumInfo } from "@/data/site";
import LanguageSelector from "@/components/LanguageSelector";

export default function SiteFooter() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="relative bg-black text-white selection:bg-white/30">
      <div className="absolute inset-0 bg-[url('/met(1).jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      
      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:px-10">
        <section className="flex flex-col text-left lg:items-start">
          <h3 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-white/90 leading-none">THE MET</h3>
          <p className="mt-8 text-xl font-medium text-white/60 leading-relaxed max-w-md">
            {museumInfo.addressLines[0]}
            <br />
            {museumInfo.addressLines[1]}
            <br />
            Phone: {museumInfo.phone}
          </p>

          <div className="mt-12 space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-white">Join the digital collection</h3>
            {isSubscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="popup-panel-enter max-w-md rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-md"
              >
                Thank you! Your submission has been received!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="h-12 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <button type="submit" className="h-12 rounded-full bg-white px-6 text-sm font-bold text-black transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">About</h4>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-white/70">
                {footerLinks.about.map((item) => (
                  <Link key={item.href} href={item.href} className="w-fit hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Support</h4>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-white/70">
                {footerLinks.support.map((item) => (
                  <Link key={item.href} href={item.href} className="w-fit hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Legal</h4>
              <nav className="flex flex-col gap-3 text-sm font-semibold text-white/70">
                {footerLinks.legal.map((item) => (
                  <Link key={item.href} href={item.href} className="w-fit hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start lg:items-end gap-4">
            <LanguageSelector />
            
            <a
              href="#top"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-black backdrop-blur-sm"
            >
              <span>Back to top</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 group-hover:bg-black/10 transition-colors">
                <span className="text-base leading-none" aria-hidden>
                  ↑
                </span>
              </div>
            </a>
          </div>
        </section>
      </div>

      <div className="relative border-t border-white/10 bg-black/50 py-6 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 text-xs font-bold uppercase tracking-wider text-white/40 sm:flex-row sm:justify-between lg:px-10">
          <p>© 2026 THE METROPOLITAN MUSEUM OF NEW YORK.</p>
          <p>Made by Yash Surjuse, competing for WWMS in Edison, NJ.</p>
        </div>
      </div>
    </footer>
  );
}
