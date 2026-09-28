import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Classes de grid (col-span / row-span) e ajustes pontuais. */
  className?: string;
  /** Visual opcional renderizado acima do texto. */
  children?: ReactNode;
  /** Posição na grelha, usada para escalonar a entrada. */
  index?: number;
}

/**
 * Card de Bento Grid com borda iluminada que segue o cursor,
 * brilho interno suave e ligeira escala no hover.
 */
export function BentoCard({
  icon: Icon,
  title,
  description,
  className,
  children,
  index = 0,
}: BentoCardProps) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const borderGlow = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgba(59, 158, 255, 0.6), transparent 70%)`;
  const surfaceGlow = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(59, 158, 255, 0.07), transparent 70%)`;

  const handleMouseMove = (event: MouseEvent<HTMLElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.07}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl bg-white/[0.07] p-px",
        className,
      )}
    >
      {/* Borda iluminada (visível apenas no hover) */}
      <motion.div
        aria-hidden
        style={{ background: borderGlow }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-zinc-950/90 backdrop-blur-xl">
        <motion.div
          aria-hidden
          style={{ background: surfaceGlow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {children ? <div className="relative min-h-0 flex-1">{children}</div> : null}

        <div className={cn("relative p-6 sm:p-7", !children && "flex flex-1 flex-col")}>
          <div
            className={cn(
              "mb-5 inline-flex size-11 items-center justify-center rounded-xl text-zinc-200",
              "border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors duration-300",
              "group-hover:border-neon/40 group-hover:text-neon",
            )}
          >
            <Icon className="size-5" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className={cn("font-display text-lg font-semibold tracking-tight text-white", !children && "mt-auto")}>
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
