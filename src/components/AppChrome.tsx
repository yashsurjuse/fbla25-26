"use client";

import { usePathname } from "next/navigation";
import AccessibilityControls from "@/components/AccessibilityControls";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartContext";
import PageTransitionShell from "@/components/PageTransitionShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import GoogleTranslateProvider from "@/components/GoogleTranslateProvider";
import HtmlLangSync from "@/components/HtmlLangSync";

const CHROMELESS_ROUTES = ["/checkout", "/slides", "/sources"];

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = CHROMELESS_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  return (
    <CartProvider>
      <GoogleTranslateProvider />
      <HtmlLangSync />
      {!hideChrome ? <SiteHeader /> : null}
      <div className="app-root">
        <main id="main-content" className={pathname === "/" || hideChrome ? "" : "pt-20"}>
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        {!hideChrome ? <SiteFooter /> : null}
      </div>
      <CartDrawer />
      <AccessibilityControls />
    </CartProvider>
  );
}
