import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Clock,
  Dumbbell,
  Salad,
  Smartphone,
  UserCheck,
  Users,
} from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { GradientText } from "@/components/ui/GradientText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easeOutExpo } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/*                                   Visuais                                  */
/* -------------------------------------------------------------------------- */

const LOAD_PROGRESSION: readonly number[] = [28, 34, 31, 42, 47, 45, 56, 61, 66, 72, 80, 92];

/** Gráfico de carga progressiva no agachamento (12 semanas). */
function ProgressionVisual() {
  return (
    <div className="relative flex h-full min-h-56 flex-col justify-end px-6 pt-6 sm:px-7 sm:pt-7">
      <div className="mb-auto flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Agachamento livre</p>
          <p className="mt-1 font-display text-3xl font-semibold text-white sm:text-4xl">
            +62 <span className="text-lg text-zinc-400">kg</span>
          </p>
        </div>
        <span className="rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-medium text-neon">
          12 semanas
        </span>
      </div>

      <div className="relative mt-8 flex h-40 items-end gap-1.5 sm:h-48 sm:gap-2">
        {/* Linhas de referência */}
        <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="h-px w-full bg-white/[0.06]" />
          ))}
        </div>
        {LOAD_PROGRESSION.map((height, index) => (
          <motion.span
            key={index}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: easeOutExpo }}
            style={{ height: `${height}%` }}
            className={
              index === LOAD_PROGRESSION.length - 1
                ? "relative flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-neon/60 to-neon shadow-[0_0_24px_rgba(59,158,255,0.5)]"
                : "relative flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-white/[0.04] to-white/20 transition-colors duration-300 group-hover:to-neon/40"
            }
          />
        ))}
      </div>
    </div>
  );
}

const COACHES: readonly { initials: string; gradient: string }[] = [
  { initials: "RS", gradient: "from-sky-300 to-blue-700" },
  { initials: "AM", gradient: "from-cyan-300 to-sky-700" },
  { initials: "JP", gradient: "from-sky-300 to-indigo-600" },
];

/** Coaches no salão + próximo treino agendado. */
function CoachVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6 pt-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:pt-7">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          {COACHES.map((coach) => (
            <span
              key={coach.initials}
              className={`inline-flex size-11 items-center justify-center rounded-full border-2 border-zinc-950 bg-gradient-to-br text-xs font-bold text-ink ${coach.gradient}`}
            >
              {coach.initials}
            </span>
          ))}
        </div>
        <div className="text-sm">
          <p className="flex items-center gap-2 font-medium text-white">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-neon" />
            </span>
            3 coaches no salão
          </p>
          <p className="text-zinc-500">agora mesmo</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm backdrop-blur-md"
      >
        <p className="text-xs text-zinc-500">Próximo treino</p>
        <p className="font-medium text-white">Costas + Bíceps · 18:30</p>
      </motion.div>
    </div>
  );
}

const RING_RADIUS = 52;

/** Anel de progresso da composição corporal. */
function BodyCompositionVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 pt-8 sm:px-7">
      <div className="relative size-40">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
          <motion.circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.72 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3, ease: easeOutExpo }}
          />
          <defs>
            <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b9eff" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-semibold text-white">−18%</span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">gordura</span>
        </div>
      </div>

      <dl className="grid w-full grid-cols-2 gap-2 text-center text-sm">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <dt className="text-xs text-zinc-500">Massa magra</dt>
          <dd className="font-semibold text-neon">+6,2 kg</dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <dt className="text-xs text-zinc-500">Gordura</dt>
          <dd className="font-semibold text-white">−14,1 kg</dd>
        </div>
      </dl>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Dados                                   */
/* -------------------------------------------------------------------------- */

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  className: string;
  visual?: ReactNode;
}

/**
 * Layout em desktop (4 colunas):
 *  ┌─────────┬─────────┐
 *  │         │    B    │
 *  │    A    ├────┬────┤
 *  │         │ C  │ D  │
 *  ├────┬────┤    ├────┤
 *  │ E  │ F  │    │ G  │
 *  └────┴────┴────┴────┘
 */
const FEATURES: readonly Feature[] = [
  {
    icon: Dumbbell,
    title: "Estrutura de força completa",
    description:
      "Racks, plataformas de levantamento, máquinas articuladas e halteres até 50 kg. Tudo pensado para quem leva hipertrofia a sério.",
    className: "md:col-span-2 lg:row-span-2",
    visual: <ProgressionVisual />,
  },
  {
    icon: UserCheck,
    title: "Coach que acompanha de perto",
    description: "Correção de técnica em tempo real e ajustes de carga a cada ciclo de treino.",
    className: "md:col-span-2",
    visual: <CoachVisual />,
  },
  {
    icon: Activity,
    title: "Bioimpedância mensal",
    description: "Números reais, não achismo. Acompanhe massa magra e gordura mês a mês.",
    className: "md:row-span-2",
    visual: <BodyCompositionVisual />,
  },
  {
    icon: Smartphone,
    title: "Treino no app",
    description: "Séries, cargas e descanso sempre no bolso.",
    className: "",
  },
  {
    icon: Clock,
    title: "Das 5h às 23h",
    description: "Treine no horário que cabe na sua rotina.",
    className: "",
  },
  {
    icon: Salad,
    title: "Nutrição integrada",
    description: "Plano alimentar alinhado ao seu treino.",
    className: "",
  },
  {
    icon: Users,
    title: "Comunidade que puxa",
    description: "Desafios mensais e treinos em grupo.",
    className: "",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Secção                                   */
/* -------------------------------------------------------------------------- */

const Features = () => {
  return (
    <section id="estrutura" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 -z-10 size-[480px] rounded-full bg-indigo-500/10 blur-[140px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Estrutura"
          title={
            <>
              Tudo o que o seu treino precisa. <GradientText>Nada que atrapalhe.</GradientText>
            </>
          }
          description="Equipamento de alto nível, acompanhamento técnico e dados reais para você evoluir com método — não com sorte."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid auto-rows-[minmax(13rem,auto)] grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature, index) => (
            <BentoCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={feature.className}
              index={index}
            >
              {feature.visual}
            </BentoCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
