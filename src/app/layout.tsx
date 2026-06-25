import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AppChrome from "@/components/AppChrome";
import GlobalModalProvider from "@/components/GlobalModalProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppChrome>
          <GlobalModalProvider>
            {children}
          </GlobalModalProvider>
        </AppChrome>
      </body>
    </html>
  );
}
