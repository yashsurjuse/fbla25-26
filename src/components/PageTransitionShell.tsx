"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type PageTransitionShellProps = {
  children: ReactNode;
};

export default function PageTransitionShell({ children }: PageTransitionShellProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition-enter">
      {children}
    </div>
  );
}
