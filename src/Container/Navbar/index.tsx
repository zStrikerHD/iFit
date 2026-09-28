import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "Planos", href: "#planos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > 24));

  const closeMenu = (): void => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        aria-label="Principal"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5",
          isScrolled || isOpen
            ? "border-white/10 bg-zinc-950/70 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="#topo" aria-label="iFIT — início" onClick={closeMenu}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ShimmerButton href="#contato" size="md" className="hidden sm:inline-flex">
            Aula experimental
          </ShimmerButton>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 md:hidden"
          >
            {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-zinc-950/85 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-base text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ShimmerButton href="#contato" size="md" onClick={closeMenu} className="mt-2 flex w-full sm:hidden">
              Agendar aula experimental
            </ShimmerButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
