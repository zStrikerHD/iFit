import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

interface ContactItem {
  icon: LucideIcon;
  label: string;
  href?: string;
}

const COLUMNS: readonly FooterColumn[] = [
  {
    title: "Academia",
    links: [
      { label: "Estrutura", href: "#estrutura" },
      { label: "Resultados", href: "#resultados" },
      { label: "Modalidades", href: "#modalidades" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Aula experimental", href: "#contato" },
      { label: "Planos", href: "#contato" },
      { label: "Trabalhe conosco", href: "#contato" },
    ],
  },
];

const CONTACT: readonly ContactItem[] = [
  { icon: MapPin, label: SITE.address },
  { icon: Phone, label: SITE.phoneLabel, href: SITE.phoneHref },
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: SITE.hours },
];

const LEGAL_LINKS: readonly FooterLink[] = [
  { label: "Privacidade", href: "#" },
  { label: "Termos de uso", href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Estúdio de força e academia de musculação. Treino com método, acompanhamento e
              resultado que se mede.
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:col-span-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-zinc-300 transition-colors hover:text-neon">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Contato</h3>
            <ul className="mt-4 space-y-3">
              {CONTACT.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-zinc-300">
                  <Icon className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-neon">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {year} {SITE.name}. Todos os direitos reservados.</p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-zinc-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Marca d'água */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none text-center font-display text-[26vw] font-bold leading-none tracking-tighter bg-gradient-to-b from-white/[0.07] to-transparent to-75% bg-clip-text text-transparent lg:text-[18rem]"
      >
        iFit
      </p>
    </footer>
  );
};

export default Footer;
