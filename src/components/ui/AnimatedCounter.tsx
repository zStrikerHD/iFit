import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Duração da contagem em segundos. */
  duration?: number;
  className?: string;
}

/** Conta de 0 até `value` quando entra no viewport (apenas uma vez). */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2.2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView) return;

    const formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const render = (current: number): void => {
      node.textContent = `${prefix}${formatter.format(current)}${suffix}`;
    };

    if (prefersReducedMotion) {
      render(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: render,
      onComplete: () => render(value),
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix, decimals, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
