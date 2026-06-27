"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useRef } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
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
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { openCart, cartCount } = useCart();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.scrollTo(0, 0);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

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
    <>
      <header className="a11y-filter-target fixed top-0 w-full z-[100] bg-white border-b border-black/10">
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

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className={`hidden lg:flex items-center relative transition-all duration-500 ease-in-out ${searchOpen ? 'w-64' : 'w-10'} h-10`}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                className={`absolute right-0 h-10 rounded-full border border-black/5 bg-white/60 backdrop-blur-md px-4 pr-10 text-sm focus:border-black/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/10 transition-all duration-500 ease-in-out ${searchOpen ? 'w-full opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]' : 'w-10 opacity-0 cursor-pointer pointer-events-none'}`}
              />
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={(e) => {
                  if (!searchOpen) {
                    e.preventDefault();
                    setSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }
                }}
                className={`absolute right-0 z-10 flex h-10 w-10 items-center justify-center text-black hover:text-black transition-all duration-300 rounded-full ${searchOpen ? '' : 'bg-white/40 hover:bg-white/80 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.02)] backdrop-blur-sm'}`}
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <Link
              href="/visit"
              className="hidden sm:inline-flex pill-btn pill-btn-dark px-5 py-2.5 text-[11px] uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.1)] border-none !text-white hover:!bg-white hover:!text-black transition-colors"
            >
              Plan your visit
            </Link>
            <button
              type="button"
              onClick={() => openCart()}
              aria-label="Open cart"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-white/50 border border-white/50 backdrop-blur-sm text-black sm:inline-flex transition-all hover:bg-white/80 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.04)] after:absolute after:-inset-4 after:content-['']"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--accent)] text-[10px] font-bold text-white shadow-sm z-10">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <div id="account-menu-container" className="relative hidden sm:inline-block">
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                aria-label="Member account"
                className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-white/50 border border-white/50 backdrop-blur-sm text-black sm:inline-flex transition-all hover:bg-white/80 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.04)] after:absolute after:-inset-4 after:content-['']"
              >
                <User className="h-5 w-5" aria-hidden />
              </button>
              {accountMenuOpen && (
                <div className="popup-rise-in absolute right-0 top-full mt-4 w-48 rounded-[2rem] border border-white/50 bg-white/80 backdrop-blur-xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.08)] z-50">
                  <Link
                    href="/account"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block rounded-full px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5 transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block rounded-full px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5 transition-colors"
                  >
                    Past Orders
                  </Link>
                </div>
              )}
            </div>
            <button
              type="button"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-black lg:hidden shadow-sm"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="lg:hidden relative z-[101]" id="mobile-menu">
          <button
            type="button"
            className="a11y-filter-target popup-backdrop-enter fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          />
          <nav className="a11y-filter-target popup-drawer-enter fixed right-4 top-4 bottom-4 flex w-72 max-w-[85vw] flex-col gap-2 rounded-[2.5rem] border border-white/50 bg-white/70 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl overflow-y-auto">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="font-display font-semibold text-2xl text-black">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-black"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1">
              {navItems.map((item) => {
                const active = isActiveRoute(pathname, item.href);

                if (item.href === undefined) {
                  return (
                    <span
                      key={item.label}
                      aria-disabled
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-black/50"
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
                      className="block rounded-2xl px-4 py-3 text-sm font-bold text-black/70 hover:bg-white hover:text-black hover:shadow-sm transition-all"
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
                    className={`block rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      active ? "bg-white text-[color:var(--accent)] shadow-sm" : "text-black/70 hover:bg-white hover:text-black hover:shadow-sm"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <form onSubmit={handleSearch} className="mt-4 relative px-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-full border-2 border-black/10 bg-white/50 px-5 pr-12 text-sm backdrop-blur-md focus:border-black/30 focus:bg-white/80 shadow-inner outline-none transition-all placeholder-black/50 font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1 bottom-1 flex w-10 items-center justify-center rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
            
            <div className="mt-4 flex flex-col gap-3 px-2">
              <Link
                href="/visit"
                className="pill-btn pill-btn-dark w-full py-3.5 text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                onClick={() => setMenuOpen(false)}
              >
                Plan your visit
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openCart();
                }}
                className="pill-btn pill-btn-light w-full py-3.5 text-sm uppercase tracking-wider bg-white/50 backdrop-blur-sm border-black/10"
              >
                View Cart {cartCount > 0 ? `(${cartCount})` : ""}
              </button>
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="pill-btn pill-btn-light w-full py-3.5 text-sm uppercase tracking-wider bg-white/50 backdrop-blur-sm border-black/10"
              >
                Member Login
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
