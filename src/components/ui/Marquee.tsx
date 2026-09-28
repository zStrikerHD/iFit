import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CSSVariables = CSSProperties & Record<`--${string}`, string>;

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Duração de um ciclo completo, em segundos. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Quantas cópias do conteúdo renderizar para preencher telas largas. */
  repeat?: number;
}

/** Carrossel infinito horizontal com esvanecimento nas bordas. */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  repeat = 3,
}: MarqueeProps) {
  const style: CSSVariables = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": "1rem",
  };

  return (
    <div
      style={style}
      className={cn(
        "group flex gap-(--marquee-gap) overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div
          key={index}
          aria-hidden={index > 0}
          className={cn(
            "flex shrink-0 items-center justify-around gap-(--marquee-gap)",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
