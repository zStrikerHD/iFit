import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Texto com gradiente néon em movimento contínuo. */
export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient-x bg-[length:200%_auto] bg-clip-text text-transparent",
        "bg-gradient-to-r from-neon via-cyan-300 to-neon",
        className,
      )}
    >
      {children}
    </span>
  );
}
