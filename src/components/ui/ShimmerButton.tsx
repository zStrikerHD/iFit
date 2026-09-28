import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShimmerButtonSize = "md" | "lg";

interface ShimmerButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  size?: ShimmerButtonSize;
}

const sizeClasses: Record<ShimmerButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/**
 * CTA estilo "Shimmer Button" (Magic UI): um feixe de luz percorre a borda
 * continuamente e, no hover, um brilho atravessa o botão e acende o halo.
 */
export function ShimmerButton({
  children,
  size = "lg",
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <a
      className={cn(
        "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full p-px",
        "transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon",
        className,
      )}
      {...props}
    >
      {/* Halo externo */}
      <span
        aria-hidden
        className="absolute inset-0 -z-20 rounded-full bg-neon/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Feixe giratório na borda */}
      <span aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-full bg-white/10">
        <span className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-shimmer-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,var(--color-neon)_330deg,#fff_350deg,transparent_360deg)]" />
        </span>
      </span>
      {/* Corpo do botão */}
      <span
        className={cn(
          "relative inline-flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-tight text-white",
          "bg-[radial-gradient(120%_120%_at_50%_0%,#27272a_0%,#0c0c0e_60%)]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          sizeClasses[size],
        )}
      >
        {/* Varrimento de brilho no hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
        />
        {/* Brilho néon inferior */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </span>
    </a>
  );
}
