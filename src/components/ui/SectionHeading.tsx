import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "dark" para secções de fundo escuro (padrão), "light" para fundo claro. */
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
          isLight ? "text-blue-600" : "text-neon",
        )}
      >
        <span aria-hidden className={cn("h-px w-6", isLight ? "bg-blue-600/60" : "bg-neon/60")} />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={0.08}
        className={cn(
          "font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl",
          isLight ? "text-zinc-950" : "text-white",
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          custom={0.16}
          className={cn(
            "text-base leading-relaxed text-pretty sm:text-lg",
            isLight ? "text-zinc-600" : "text-zinc-400",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
