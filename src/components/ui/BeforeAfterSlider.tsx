import { useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Posição inicial do divisor, em % (0–100). */
  initialPosition?: number;
  className?: string;
}

const KEYBOARD_STEP = 5;

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

/**
 * Comparador "antes / depois" arrastável (rato, toque e teclado).
 * Ao entrar no ecrã faz um pequeno movimento para sugerir a interação.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  initialPosition = 50,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const hasInteracted = useRef<boolean>(false);

  const position = useMotionValue<number>(initialPosition);
  const hiddenFromRight = useTransform(position, (value) => 100 - value);
  const clipPath = useMotionTemplate`inset(0 ${hiddenFromRight}% 0 0)`;
  const handleLeft = useMotionTemplate`${position}%`;
  const beforeLabelOpacity = useTransform(position, [4, 22], [0, 1]);
  const afterLabelOpacity = useTransform(position, [78, 96], [1, 0]);

  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  // Mantém o aria-valuenow sincronizado sem re-renderizar a cada frame.
  useMotionValueEvent(position, "change", (value) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(value)));
  });

  useEffect(() => {
    if (!isInView || prefersReducedMotion || hasInteracted.current) return;
    const controls = animate(
      position,
      [initialPosition, 72, 28, initialPosition],
      { duration: 2.6, delay: 0.5, ease: "easeInOut" },
    );
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, initialPosition, position]);

  const setPosition = (value: number): void => {
    hasInteracted.current = true;
    position.stop();
    position.set(clamp(value));
  };

  const updateFromClientX = (clientX: number): void => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(((clientX - rect.left) / rect.width) * 100);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (isDragging.current) updateFromClientX(event.clientX);
  };

  const stopDragging = (): void => {
    isDragging.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const current = position.get();
    const keyMap: Record<string, number> = {
      ArrowLeft: current - KEYBOARD_STEP,
      ArrowDown: current - KEYBOARD_STEP,
      ArrowRight: current + KEYBOARD_STEP,
      ArrowUp: current + KEYBOARD_STEP,
      Home: 0,
      End: 100,
    };
    const next = keyMap[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setPosition(next);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={cn(
        "relative aspect-[16/9] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden",
        className,
      )}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <motion.img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        decoding="async"
        style={{ clipPath }}
        className="absolute inset-0 size-full object-cover"
      />

      {/* Vinheta para dar profundidade e legibilidade às etiquetas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(9,9,11,0.65))]"
      />

      <motion.span
        style={{ opacity: beforeLabelOpacity }}
        className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-md sm:left-5 sm:top-5 sm:text-xs"
      >
        {beforeLabel}
      </motion.span>
      <motion.span
        style={{ opacity: afterLabelOpacity }}
        className="pointer-events-none absolute right-3 top-3 rounded-full border border-neon/40 bg-neon/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neon backdrop-blur-md sm:right-5 sm:top-5 sm:text-xs"
      >
        {afterLabel}
      </motion.span>

      {/* Divisor + pega */}
      <motion.div
        style={{ left: handleLeft }}
        className="pointer-events-none absolute inset-y-0 w-0"
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-neon to-transparent shadow-[0_0_18px_2px_rgba(59,158,255,0.55)]" />
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label={`Comparar ${beforeLabel.toLowerCase()} e ${afterLabel.toLowerCase()}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={initialPosition}
          onKeyDown={handleKeyDown}
          className={cn(
            "pointer-events-auto absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-neon/60 bg-black/60 text-neon backdrop-blur-md",
            "shadow-[0_0_0_6px_rgba(59,158,255,0.12),0_0_30px_rgba(59,158,255,0.45)]",
            "transition-transform duration-200 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none",
          )}
        >
          <ChevronsLeftRight className="size-5" strokeWidth={2} aria-hidden />
        </div>
      </motion.div>
    </div>
  );
}
