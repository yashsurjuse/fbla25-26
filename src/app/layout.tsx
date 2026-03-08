import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AccessibilityControls from "@/components/AccessibilityControls";
import PageTransitionShell from "@/components/PageTransitionShell";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Metropolitan Museum of Art",
  description: "Explore exhibitions, artists, artifacts, and visit details for The Metropolitan Museum of Art.",
  icons: {
    icon: "/MET.ico",
    shortcut: "/MET.ico",
    apple: "/MET.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${sourceSans.variable} ${cormorant.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <div className="app-root a11y-filter-target">
          <main id="main-content" className="pt-20">
            <PageTransitionShell>{children}</PageTransitionShell>
          </main>
          <SiteFooter />
        </div>
        <AccessibilityControls />
      </body>
    </html>
  );
}
