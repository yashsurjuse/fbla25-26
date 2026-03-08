import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

    const variants: Record<ButtonVariant, string> = {
      default: "bg-white text-black hover:brightness-95",
      ghost: "bg-transparent text-white hover:bg-white/10",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
