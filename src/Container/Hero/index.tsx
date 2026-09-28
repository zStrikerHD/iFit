import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { GradientText } from "@/components/ui/GradientText";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Spotlight } from "@/components/ui/Spotlight";
import { easeOutExpo, fadeUp } from "@/lib/motion";

const Hero = () => {
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
      className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28"
    >
      {/* ===== Fundo: grelha + spotlights + luz que segue o cursor ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/15 blur-[140px]" />
        <motion.div className="absolute inset-0" style={{ background: cursorLight }} />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-56" fill="#3b9eff" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge flutuante */}
          <motion.div variants={fadeUp} custom={0.1}>
            <motion.a
              href="#estrutura"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-xs text-zinc-300 backdrop-blur-md transition-colors hover:border-neon/40 sm:text-sm"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-neon/15 px-2.5 py-1 text-[11px] font-semibold text-neon sm:text-xs">
                <Flame className="size-3.5" aria-hidden />
                Novo
              </span>
              Estúdio de Força · Academia de Musculação
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              <span aria-hidden className="absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
            </motion.a>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.2}
            className="mt-8 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Transforme esforço em
            </span>{" "}
            <GradientText>resultado visível.</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.3}
            className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg"
          >
            Treino de força guiado, avaliação física mensal e um time que acompanha cada
            repetição. Arraste a imagem abaixo e veja o que a constância faz.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          >
            <ShimmerButton href="#contato" className="w-full sm:w-auto">
              Agendar aula experimental
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ShimmerButton>
            <a
              href="#estrutura"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Conhecer a estrutura
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.5}
            className="mt-8 flex items-center gap-3 text-sm text-zinc-400"
          >
            <div className="flex -space-x-2" aria-hidden>
              {["from-sky-300 to-blue-600", "from-cyan-300 to-sky-600", "from-sky-300 to-indigo-500", "from-zinc-200 to-zinc-500"].map((gradient) => (
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

        {/* ===== Comparador antes / depois ===== */}
        <div className="mt-16 [perspective:1400px] sm:mt-20">
          <motion.div
            initial={{ opacity: 0, rotateX: 22, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.55, ease: easeOutExpo }}
            className="relative mx-auto max-w-5xl"
          >
            <div aria-hidden className="absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-[3rem] bg-gradient-to-t from-neon/25 via-indigo-500/15 to-transparent blur-3xl" />
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:rounded-[2rem] sm:p-2">
              <BeforeAfterSlider
                beforeSrc="/images/antes.jpg"
                afterSrc="/images/depois.jpg"
                beforeAlt="Aluno antes do programa de treino, em frente à academia"
                afterAlt="Aluno depois do programa de treino, com físico definido, em frente à academia"
                className="rounded-[1.4rem] sm:rounded-[1.5rem]"
              />
            </div>
            <p className="mt-4 text-center text-xs text-zinc-500">
              Arraste o divisor para comparar · Resultados variam de pessoa para pessoa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
