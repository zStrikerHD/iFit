import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BicepsFlexed,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  Scale,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientText } from "@/components/ui/GradientText";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
}

interface Modality {
  icon: LucideIcon;
  label: string;
}

const STATS: readonly Stat[] = [
  { value: 1200, suffix: "+", label: "Alunos ativos", detail: "treinando todos os meses" },
  { value: 18.4, suffix: " t", decimals: 1, label: "De gordura eliminada", detail: "medidas por bioimpedância" },
  { value: 12, label: "Anos de estúdio", detail: "formando atletas e iniciantes" },
  { value: 98, suffix: "%", label: "Renovam o plano", detail: "depois do primeiro trimestre" },
];

const MODALITIES: readonly Modality[] = [
  { icon: BicepsFlexed, label: "Hipertrofia" },
  { icon: Trophy, label: "Powerlifting" },
  { icon: Flame, label: "Emagrecimento" },
  { icon: Zap, label: "Funcional" },
  { icon: HeartPulse, label: "Condicionamento" },
  { icon: Footprints, label: "Mobilidade" },
  { icon: Target, label: "Performance" },
];

const EQUIPMENT: readonly Modality[] = [
  { icon: Dumbbell, label: "Halteres até 50 kg" },
  { icon: Scale, label: "Bioimpedância" },
  { icon: Timer, label: "Treinos cronometrados" },
  { icon: Dumbbell, label: "Plataforma olímpica" },
  { icon: Dumbbell, label: "Racks de agachamento" },
  { icon: Dumbbell, label: "Hack squat" },
  { icon: Dumbbell, label: "Crossover duplo" },
];

interface PillProps {
  item: Modality;
  highlighted?: boolean;
}

function Pill({ item, highlighted = false }: PillProps) {
  const Icon = item.icon;
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-3.5 backdrop-blur-md transition-colors duration-300",
        highlighted
          ? "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-neon/40 hover:text-white"
          : "border-white/[0.06] bg-transparent text-zinc-500 hover:text-zinc-200",
      )}
    >
      <Icon className={cn("size-5", highlighted && "text-neon")} strokeWidth={1.75} aria-hidden />
      <span className="whitespace-nowrap font-display text-base font-medium sm:text-lg">{item.label}</span>
    </div>
  );
}

const Stats = () => {
  return (
    <section id="resultados" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resultados"
          title={
            <>
              Resultados que aparecem na balança <GradientText>e no espelho.</GradientText>
            </>
          }
        />

        {/* gap-px sobre fundo claro desenha as divisórias entre células */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={index * 0.08}
              className="group relative flex flex-col gap-2 bg-ink/95 p-6 backdrop-blur-xl sm:p-8"
            >
              <span aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-neon/0 to-transparent transition-colors duration-500 group-hover:via-neon/70" />
              <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="text-sm font-medium text-zinc-200">{stat.label}</p>
              <p className="text-xs text-zinc-500 sm:text-sm">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div id="modalidades" className="mt-20 flex scroll-mt-32 flex-col gap-4 sm:mt-24">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Modalidades e estrutura
        </p>
        <Marquee duration={45}>
          {MODALITIES.map((item) => (
            <Pill key={item.label} item={item} highlighted />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {EQUIPMENT.map((item) => (
            <Pill key={item.label} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Stats;
