import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-neon text-ink shadow-[0_0_24px_rgba(59,158,255,0.45)]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        i<span className="text-neon">Fit</span>
      </span>
    </span>
  );
}
