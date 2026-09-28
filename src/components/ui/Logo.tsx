import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Cor das letras (a seta mantém sempre o azul da marca). */
  letterClassName?: string;
}

const CHEVRON_BLUE = "#1592dc";

/** Wordmark "iFIT" + seta, recriado em SVG a partir do logotipo da marca. */
export function Logo({ className, letterClassName = "text-white" }: LogoProps) {
  return (
    <svg
      viewBox="10 15 890 266"
      role="img"
      aria-label="iFIT"
      className={cn("h-7 w-auto", className)}
    >
      <g fill="currentColor" className={letterClassName}>
        {/* i */}
        <rect x="15" y="20" width="60" height="58" rx="3" />
        <path d="M15 105H75V275H25Q15 275 15 265Z" />
        {/* F */}
        <path d="M115 65Q115 20 160 20H285V80H175V142H262V193H175V275H125Q115 275 115 265Z" />
        {/* I */}
        <path d="M325 20H385V275H335Q325 275 325 265Z" />
        {/* T */}
        <path d="M425 20H632V80H560V275H510Q500 275 500 265V80H425Z" />
      </g>
      {/* Seta */}
      <g fill={CHEVRON_BLUE}>
        <path d="M690 22H765Q778 22 787 32L808 55Q820 70 818 88L812 110Q806 124 796 124Z" />
        <path d="M688 276L832 132Q838 110 846 98Q852 92 860 100L886 128Q896 140 886 152L777 262Q765 276 748 276Z" />
      </g>
    </svg>
  );
}
