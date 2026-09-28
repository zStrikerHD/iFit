import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  ChartLine,
  ClipboardList,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { easeOutExpo, fadeUp } from "@/lib/motion";
import { SITE } from "@/lib/site";

interface Perk {
  icon: LucideIcon;
  label: string;
}

const PERKS: readonly Perk[] = [
  { icon: ClipboardList, label: "Avaliação física na 1.ª semana" },
  { icon: CalendarCheck, label: "Plano de treino individual" },
  { icon: ChartLine, label: "Reavaliação todo mês" },
];

const CallToAction = () => {
  return (
    <section id="contato" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Iluminação de fundo */}
        <div aria-hidden className="absolute -inset-4 -z-10 sm:-inset-10">
          <div className="absolute left-[10%] top-0 size-72 rounded-full bg-neon/25 blur-[110px]" />
          <div className="absolute bottom-0 right-[8%] size-72 rounded-full bg-indigo-500/25 blur-[110px]" />
        </div>

        {/* Card glassmorphism */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-14 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" />
          <div aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-neon/80 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex flex-col items-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0.15}
              className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl"
            >
              A sua versão <GradientText>“depois”</GradientText> começa no primeiro treino.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.25}
              className="mt-5 max-w-xl text-base text-pretty text-zinc-400 sm:text-lg"
            >
              Agende uma aula experimental, conheça o estúdio e saia com um plano claro para os
              próximos 90 dias.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.35}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <ShimmerButton
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="size-4" aria-hidden />
                Agendar pelo WhatsApp
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </ShimmerButton>
              <a
                href={SITE.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
              >
                <Phone className="size-4" aria-hidden />
                Ligar {SITE.phoneLabel}
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              custom={0.45}
              className="mt-10 flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6"
            >
              {PERKS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-neon" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
