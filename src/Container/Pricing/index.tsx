import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { fadeUp } from "@/lib/motion";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  tagline: string;
  /** Valor mensal em reais. */
  monthlyPrice: number;
  /** Duração do contrato em meses (1 = sem fidelidade). */
  months: number;
  features: readonly string[];
  highlighted?: boolean;
  badge?: string;
}

/** Valores de exemplo — substitua pelos preços reais da academia. */
const PLANS: readonly Plan[] = [
  {
    name: "Mensal",
    tagline: "Para começar sem compromisso.",
    monthlyPrice: 149,
    months: 1,
    features: [
      "Acesso livre à musculação",
      "Todos os horários de funcionamento",
      "Treino personalizado no app",
      "Avaliação física inicial",
    ],
  },
  {
    name: "Semestral",
    tagline: "O equilíbrio ideal entre preço e resultado.",
    monthlyPrice: 129,
    months: 6,
    highlighted: true,
    badge: "Mais escolhido",
    features: [
      "Tudo do plano Mensal",
      "Bioimpedância todo mês",
      "Reavaliação e ajuste do treino mensal",
      "Acompanhamento de coach no salão",
    ],
  },
  {
    name: "Anual",
    tagline: "Para quem já decidiu mudar de vez.",
    monthlyPrice: 99,
    months: 12,
    badge: "Melhor custo",
    features: [
      "Tudo do plano Semestral",
      "Consulta com nutricionista",
      "Congelamento de até 30 dias",
      "1 convite por mês para um amigo",
    ],
  },
];

const BASE_MONTHLY_PRICE = PLANS[0].monthlyPrice;

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

function billingNote(plan: Plan): string {
  if (plan.months === 1) return "Sem fidelidade · cancele quando quiser";
  return `${currency.format(plan.monthlyPrice * plan.months)} a cada ${plan.months} meses`;
}

function savingsPercent(plan: Plan): number {
  return Math.round((1 - plan.monthlyPrice / BASE_MONTHLY_PRICE) * 100);
}

interface PlanCardProps {
  plan: Plan;
  index: number;
}

function PlanCard({ plan, index }: PlanCardProps) {
  const savings = savingsPercent(plan);
  const ctaHref = whatsappLink(`Olá! Quero assinar o plano ${plan.name} da iFIT.`);

  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.1}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl p-px",
        plan.highlighted
          ? "bg-zinc-900 shadow-[0_30px_80px_-24px_rgba(21,146,220,0.65)] lg:-my-6"
          : "bg-zinc-200 shadow-[0_1px_2px_rgba(9,9,11,0.06)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(21,146,220,0.45)]",
      )}
    >
      {/* Borda animada do plano em destaque */}
      {plan.highlighted ? (
        <span aria-hidden className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-shimmer-spin bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,var(--color-neon)_310deg,#a5f3fc_345deg,transparent_360deg)]" />
        </span>
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500 via-blue-300/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div
        className={cn(
          "relative flex h-full flex-col rounded-[calc(1.5rem-1px)] p-7 sm:p-8",
          plan.highlighted ? "bg-[#0b0b0f] lg:py-12" : "bg-white",
        )}
      >
        {plan.highlighted ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(90%_60%_at_50%_0%,rgba(59,158,255,0.18),transparent_70%)]"
          />
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <h3
            className={cn(
              "font-display text-xl font-bold tracking-tight",
              plan.highlighted ? "text-white" : "text-zinc-950",
            )}
          >
            {plan.name}
          </h3>
          {plan.badge ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                plan.highlighted
                  ? "bg-neon text-ink"
                  : "border border-blue-200 bg-blue-50 text-blue-700",
              )}
            >
              {plan.highlighted ? <Sparkles className="size-3.5" aria-hidden /> : null}
              {plan.badge}
            </span>
          ) : null}
        </div>
        <p className={cn("mt-2 text-sm", plan.highlighted ? "text-zinc-400" : "text-zinc-600")}>
          {plan.tagline}
        </p>

        <div className="mt-8 flex items-end gap-1">
          <span className={cn("mb-2 text-sm font-semibold", plan.highlighted ? "text-zinc-400" : "text-zinc-500")}>
            R$
          </span>
          <span
            className={cn(
              "font-display text-5xl font-bold tracking-tight sm:text-6xl",
              plan.highlighted ? "text-white" : "text-zinc-950",
            )}
          >
            {plan.monthlyPrice}
          </span>
          <span className="mb-2 text-sm text-zinc-500">/mês</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500">{billingNote(plan)}</span>
          {savings > 0 ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-semibold",
                plan.highlighted ? "bg-cyan-400/10 text-cyan-300" : "bg-sky-100 text-sky-700",
              )}
            >
              Economize {savings}%
            </span>
          ) : null}
        </div>

        <span
          aria-hidden
          className={cn(
            "my-8 h-px w-full bg-gradient-to-r to-transparent",
            plan.highlighted ? "from-white/10 via-white/5" : "from-zinc-200 via-zinc-100",
          )}
        />

        <ul className="flex flex-1 flex-col gap-3.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-3 text-sm",
                plan.highlighted ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                  plan.highlighted ? "bg-neon text-ink" : "bg-blue-50 text-blue-600",
                )}
              >
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {plan.highlighted ? (
            <ShimmerButton
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full"
            >
              Assinar {plan.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </ShimmerButton>
          ) : (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Assinar {plan.name}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const Pricing = () => {
  return (
    <section id="planos" className="relative isolate scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/50 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          tone="light"
          eyebrow="Planos"
          title={
            <>
              Escolha o seu plano e comece{" "}
              <GradientText className="from-blue-700 via-sky-500 to-blue-700">hoje.</GradientText>
            </>
          }
          description="Sem taxas escondidas. Todos os planos incluem avaliação física e treino montado para o seu objetivo."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-16 grid max-w-md gap-6 lg:mt-20 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-5"
        >
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-xs text-zinc-500">
          Valores por pessoa. Pagamento via cartão, Pix ou boleto.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
