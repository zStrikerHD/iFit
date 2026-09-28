import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
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
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-neon"
      >
        <span aria-hidden className="h-px w-6 bg-neon/60" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={0.08}
        className="font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          custom={0.16}
          className="text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
