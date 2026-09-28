import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export type TransformationPhase = "antes" | "depois";

interface TransformationCycleOptions {
  /** Tempo parado em cada imagem, em segundos. */
  holdSeconds?: number;
  /** Duração da varredura entre imagens, em segundos. */
  sweepSeconds?: number;
}

interface TransformationCycle {
  /** % da imagem "antes" visível, da esquerda para a direita (100 = só antes). */
  position: MotionValue<number>;
  phase: TransformationPhase;
}

/**
 * Alterna sozinho entre "antes" e "depois" num ciclo infinito:
 * pausa → varredura → pausa → varredura de volta.
 */
export function useTransformationCycle({
  holdSeconds = 3.5,
  sweepSeconds = 1.4,
}: TransformationCycleOptions = {}): TransformationCycle {
  const position = useMotionValue<number>(100);
  const [phase, setPhase] = useState<TransformationPhase>("antes");
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(position, "change", (value) => {
    setPhase(value < 50 ? "depois" : "antes");
  });

  useEffect(() => {
    // Sem animação: troca direta entre as imagens no mesmo ritmo.
    if (prefersReducedMotion) {
      const id = window.setInterval(() => {
        position.set(position.get() < 50 ? 100 : 0);
      }, (holdSeconds + sweepSeconds) * 1000);
      return () => window.clearInterval(id);
    }

    const total = 2 * (holdSeconds + sweepSeconds);
    const controls = animate(position, [100, 100, 0, 0, 100], {
      duration: total,
      times: [
        0,
        holdSeconds / total,
        (holdSeconds + sweepSeconds) / total,
        (2 * holdSeconds + sweepSeconds) / total,
        1,
      ],
      ease: ["linear", "easeInOut", "linear", "easeInOut"],
      repeat: Infinity,
      delay: 0.6,
    });
    return () => controls.stop();
  }, [prefersReducedMotion, holdSeconds, sweepSeconds, position]);

  return { position, phase };
}

interface TransformationBackdropProps {
  position: MotionValue<number>;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

/** Duas imagens sobrepostas, reveladas por uma linha de luz que as percorre. */
export function TransformationBackdrop({
  position,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: TransformationBackdropProps) {
  const hiddenFromRight = useTransform(position, (value) => 100 - value);
  const clipPath = useMotionTemplate`inset(0 ${hiddenFromRight}% 0 0)`;
  const lineLeft = useMotionTemplate`${position}%`;
  const lineOpacity = useTransform(position, [0, 3, 97, 100], [0, 1, 1, 0]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        fetchPriority="high"
        className="absolute inset-0 size-full select-none object-cover"
      />
      <motion.img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        fetchPriority="high"
        style={{ clipPath }}
        className="absolute inset-0 size-full select-none object-cover"
      />
      <motion.div
        aria-hidden
        style={{ left: lineLeft, opacity: lineOpacity }}
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-neon to-transparent shadow-[0_0_28px_6px_rgba(59,158,255,0.55)]"
      />
    </div>
  );
}
