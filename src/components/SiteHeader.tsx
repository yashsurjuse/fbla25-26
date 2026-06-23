"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { navItems } from "@/data/site";

function isActiveRoute(pathname: string, href?: string) {
  if (!href || href === "") {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { openCart, cartCount } = useCart();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("#account-menu-container")) {
        setAccountMenuOpen(false);
      }
    };
    if (accountMenuOpen) document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [accountMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="a11y-filter-target fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[color:var(--paper)] backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center"
          aria-label="Go to museum home page"
        >
          <Image
            src="/TheMetTrasparant.png"
            alt="The Met logo"
            width={236}
            height={82}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-[0.95rem] font-semibold lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            if (item.href === undefined) {
              return (
                <span key={item.label} className="cursor-default text-black/80" aria-disabled>
                  {item.label}
                </span>
              );
            }

            if (item.href === "") {
              return (
                <a
                  key={item.label}
                  href=""
                  onClick={(event) => event.preventDefault()}
                  className="swoop-link text-black/70 transition-colors duration-200 hover:text-black"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`swoop-link transition-colors duration-200 ${
                  active ? "text-[color:var(--ink)]" : "text-black/70 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/visit"
            className="hidden rounded-none border border-black bg-black px-4 py-2 text-sm font-semibold !text-white transition-colors duration-200 hover:bg-transparent hover:!text-black sm:inline-flex"
          >
            Plan your visit
          </Link>
          <button
            type="button"
            onClick={() => openCart()}
            aria-label="Open cart"
            className="relative hidden h-10 w-10 items-center justify-center border border-black/20 bg-white text-black sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="9" cy="20" r="1.7" />
              <circle cx="18" cy="20" r="1.7" />
              <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H7.2" />
            </svg>
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center bg-black px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <div id="account-menu-container" className="relative hidden sm:inline-block">
            <button
              type="button"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="Member account"
              className="hidden h-10 w-10 items-center justify-center border border-black/20 bg-white text-black sm:inline-flex hover:bg-black/5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
              </svg>
            </button>
            {accountMenuOpen && (
              <div className="popup-rise-in absolute right-0 top-full mt-2 w-48 border border-black/15 bg-white py-2 shadow-xl z-50">
                <Link
                  href="/account"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setAccountMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
                >
                  Past Orders
                </Link>
              </div>
            )}
          </div>
          <button
            type="button"
            className="inline-flex h-10 min-w-10 items-center justify-center border border-black/25 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-black lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="lg:hidden" id="mobile-menu">
          <button
            type="button"
            className="popup-backdrop-enter fixed inset-0 z-30 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <nav className="popup-drawer-enter absolute right-0 z-40 flex w-72 max-w-[85vw] flex-col gap-1 border-l border-black/10 bg-[color:var(--paper)] p-6 shadow-xl">
            {navItems.map((item) => {
              const active = isActiveRoute(pathname, item.href);

              if (item.href === undefined) {
                return (
                  <span
                    key={item.label}
                    aria-disabled
                    className="border-b border-black/10 py-3 text-sm font-semibold text-black/80"
                  >
                    {item.label}
                  </span>
                );
              }

              if (item.href === "") {
                return (
                  <a
                    key={item.label}
                    href=""
                    onClick={(event) => event.preventDefault()}
                    className="swoop-link border-b border-black/10 py-3 text-sm font-semibold text-black/80"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`swoop-link border-b border-black/10 py-3 text-sm font-semibold ${
                    active ? "text-[color:var(--accent)]" : "text-black/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/visit"
              className="mt-4 inline-flex justify-center border border-black bg-black px-4 py-2 text-sm font-semibold !text-white transition-colors duration-200 hover:bg-transparent hover:!text-black"
            >
              Plan your visit
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="mt-2 inline-flex justify-center border border-black/20 bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              View Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </button>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex justify-center border border-black/20 bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Member Login
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
