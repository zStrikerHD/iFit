import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Spotlight } from "@/components/ui/Spotlight";
import {
  TransformationBackdrop,
  useTransformationCycle,
} from "@/components/ui/TransformationBackdrop";
import type { TransformationPhase } from "@/components/ui/TransformationBackdrop";
import { easeOutExpo, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PHASES: readonly { id: TransformationPhase; label: string }[] = [
  { id: "antes", label: "Antes" },
  { id: "depois", label: "Depois" },
];

const AVATAR_GRADIENTS: readonly string[] = [
  "from-sky-300 to-blue-600",
  "from-cyan-300 to-sky-600",
  "from-sky-300 to-indigo-500",
  "from-zinc-200 to-zinc-500",
];

const Hero = () => {
  const { position, phase } = useTransformationCycle();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const cursorLight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(59, 158, 255, 0.07), transparent 75%)`;

  const handleMouseMove = (event: MouseEvent<HTMLElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <section
      id="topo"
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-svh overflow-hidden"
    >
      {/* ===== Imagem de fundo: alterna sozinha entre antes e depois =====
          Mobile: ocupa o topo e dissolve-se para baixo.
          Desktop: ocupa a direita (pessoas centradas nessa área) e dissolve-se
          para a esquerda, deixando o texto sobre o fundo escuro. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
        className={cn(
          "absolute inset-x-0 top-0 -z-10 h-[58svh]",
          "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent)]",
          "xl:inset-y-0 xl:left-[35vw] xl:right-0 xl:h-auto",
          "xl:[mask-image:linear-gradient(to_right,transparent,black_28%),linear-gradient(to_bottom,transparent,black_16%,black_76%,transparent)]",
          "xl:[mask-composite:intersect]",
        )}
      >
        <TransformationBackdrop
          position={position}
          beforeSrc="/images/antes.jpg"
          afterSrc="/images/depois.jpg"
          beforeAlt="Aluno antes do programa de treino, em frente à academia"
          afterAlt="Aluno depois do programa de treino, com físico definido, em frente à academia"
          className="absolute inset-0"
        />
      </motion.div>

      {/* ===== Iluminação ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Escurece o topo para o menu ficar legível sobre o céu da foto */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/90 via-ink/50 to-transparent" />
        <div className="absolute -left-40 top-0 h-[520px] w-[720px] -translate-y-1/3 rounded-full bg-neon/15 blur-[140px]" />
        <motion.div className="absolute inset-0" style={{ background: cursorLight }} />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-24" fill="#3b9eff" />

      {/* ===== Conteúdo ===== */}
      <div
        className={cn(
          "flex min-h-svh flex-col justify-end px-4 pb-16 pt-[54svh] sm:px-6",
          "xl:justify-center xl:pb-24 xl:pt-32 xl:pl-[max(6vw,calc(50vw-40rem))] xl:pr-0",
        )}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-xl flex-col items-center text-center xl:mx-0 xl:w-[min(35vw,34rem)] xl:max-w-none xl:items-start xl:text-left"
        >
          <motion.div variants={fadeUp} custom={0.1}>
            <motion.a
              href="#planos"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 py-1.5 pl-1.5 pr-4 text-xs text-zinc-300 backdrop-blur-md transition-colors hover:border-neon/40 sm:text-sm"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-neon/15 px-2.5 py-1 text-[11px] font-semibold text-neon sm:text-xs">
                <Flame className="size-3.5" aria-hidden />
                Novo
              </span>
              <span>
                Estúdio de Força<span className="hidden sm:inline"> · Academia de Musculação</span>
              </span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              <span aria-hidden className="absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
            </motion.a>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.2}
            className="mt-7 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-balance text-white sm:text-6xl xl:text-[clamp(2.75rem,4.1vw,4.5rem)]"
          >
            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Transforme esforço em
            </span>{" "}
            <GradientText>resultado visível.</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.3}
            className="mt-6 text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg"
          >
            Treino de força guiado, avaliação física mensal e um time que acompanha cada
            repetição. O resultado fala por si.
          </motion.p>

          {/* Indicador da fase atual da imagem */}
          <motion.div
            variants={fadeUp}
            custom={0.35}
            className="mt-7 flex items-center gap-3"
          >
            <div
              className="inline-flex items-center rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md"
              aria-hidden
            >
              {PHASES.map((item) => {
                const isActive = phase === item.id;
                return (
                  <span
                    key={item.id}
                    className="relative rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="hero-phase"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full border border-neon/40 bg-neon/15"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative transition-colors duration-300",
                        isActive ? "text-neon" : "text-zinc-500",
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                );
              })}
            </div>
            <span className="text-xs text-zinc-500">Resultados variam de pessoa para pessoa.</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.45}
            className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          >
            <ShimmerButton href="#contato" className="w-full sm:w-auto">
              Agendar aula experimental
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ShimmerButton>
            <a
              href="#planos"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Ver planos
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.55}
            className="mt-8 flex items-center gap-3 text-sm text-zinc-400"
          >
            <div className="flex -space-x-2" aria-hidden>
              {AVATAR_GRADIENTS.map((gradient) => (
                <span
                  key={gradient}
                  className={`size-8 rounded-full border-2 border-ink bg-gradient-to-br ${gradient}`}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5 text-neon" aria-label="Avaliação 4,9 de 5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-3.5 fill-current" aria-hidden />
                ))}
              </div>
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-white">4,9/5</span> por mais de 1.200 alunos
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
