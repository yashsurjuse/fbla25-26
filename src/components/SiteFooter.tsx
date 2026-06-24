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
    <footer className="border-t border-black/15 bg-[#e8e8e8]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <section className="space-y-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">About</h4>
              <nav className="flex flex-col gap-2 text-sm font-semibold text-black/85">
                {footerLinks.about.map((item) => (
                  <Link key={item.href} href={item.href} className="swoop-link w-fit hover:text-black">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Support</h4>
              <nav className="flex flex-col gap-2 text-sm font-semibold text-black/85">
                {footerLinks.support.map((item) => (
                  <Link key={item.href} href={item.href} className="swoop-link w-fit hover:text-black">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-black/50">Legal</h4>
              <nav className="flex flex-col gap-2 text-sm font-semibold text-black/85">
                {footerLinks.legal.map((item) => (
                  <Link key={item.href} href={item.href} className="swoop-link w-fit hover:text-black">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <Image
            src="/TheMetFill.webp"
            alt="The Met logo"
            width={240}
            height={92}
            className="h-14 w-auto"
          />

          <div className="space-y-3">
            <h3 className="text-3xl font-bold tracking-tight text-black">Bring some culture to your inbox</h3>
            {isSubscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="popup-panel-enter max-w-md border border-black/20 bg-white px-4 py-3 text-sm font-semibold text-black"
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
                  className="h-11 flex-1 border border-black/30 bg-white px-3 text-sm text-black placeholder:text-black/45 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button type="submit" className="h-11 border border-black bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/90">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="flex flex-col text-left text-black/85 lg:items-end lg:text-right">
          <h3 className="font-display text-4xl font-semibold text-black">{museumInfo.name}</h3>
          <p className="mt-4 text-xl">
            {museumInfo.addressLines[0]}
            <br />
            {museumInfo.addressLines[1]}
            <br />
            Phone: {museumInfo.phone}
          </p>

          <div className="pt-6 text-lg font-semibold leading-tight sm:text-xl">
            <p>
              SUN-THU: <span className="font-normal">10:00 - 17:00</span>
            </p>
            <p>
              FRI-SAT: <span className="font-normal">10:00 - 21:00</span>
            </p>
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 lg:items-end">
            <LanguageSelector />
            
            <a
              href="#top"
              className="inline-flex items-center gap-2 border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] !text-white transition-colors duration-200 hover:bg-[#bf0024]"
            >
              <span className="text-base leading-none !text-white" aria-hidden>
                ↑
              </span>
              <span>Back to top</span>
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-black/15 py-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 text-sm font-semibold text-black/85 sm:px-6 md:flex-row md:justify-between lg:px-10">
          <p>© 2026 THE METROPOLITAN MUSEUM OF NEW YORK.</p>
          <p>Made by Yash Surjuse, competing for WWMS in Edison, NJ.</p>
        </div>
      </div>
    </footer>
  );
}
