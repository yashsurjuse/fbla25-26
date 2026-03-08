'use client';

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TicketButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function TicketButton({ children, className, ...props }: TicketButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-full border border-white/20 bg-white px-5 py-2 text-black font-semibold shadow-lg shadow-black/25 transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      {children ?? "Buy Tickets"}
    </button>
  );
}
