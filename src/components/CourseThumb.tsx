import { cn } from "@/lib/utils";

interface CourseThumbProps {
  /** Área do curso, ex.: "Registro de Imóveis". */
  category: string;
  className?: string;
}

/**
 * Capa do curso: painel tipográfico com pauta discreta, no lugar de foto de banco
 * de imagens. Remete ao livro de registro e mantém a identidade da marca.
 */
export function CourseThumb({ category, className }: CourseThumbProps) {
  return (
    <div
      className={cn(
        "aspect-video relative overflow-hidden bg-background border-b border-border",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 13px, hsl(var(--foreground)) 13px, hsl(var(--foreground)) 14px)",
        }}
      />

      <div className="relative h-full flex flex-col justify-between p-5">
        <span aria-hidden className="font-display text-3xl text-gold/50 leading-none">
          §
        </span>

        <div>
          <div className="w-9 h-px bg-gold mb-3" />
          <p className="font-display text-foreground/90 text-xs uppercase tracking-[0.18em] leading-relaxed">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
}
