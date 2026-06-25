"use client";

import { usePathname } from "next/navigation";
import AccessibilityControls from "@/components/AccessibilityControls";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartContext";
import PageTransitionShell from "@/components/PageTransitionShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const CHROMELESS_ROUTES = ["/checkout"];

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = CHROMELESS_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  return (
    <CartProvider>
      {!hideChrome ? <SiteHeader /> : null}
      <div className="app-root a11y-filter-target">
        <main id="main-content" className={pathname === "/" ? "" : "pt-20"}>
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        {!hideChrome ? <SiteFooter /> : null}
      </div>
      <CartDrawer />
      <AccessibilityControls />
    </CartProvider>
  );
}
