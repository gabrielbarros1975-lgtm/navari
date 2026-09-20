import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em ms, para escalonar itens de uma mesma lista. */
  delayMs?: number;
  /**
   * Ajuste do ponto de disparo. Blocos mais altos que a tela precisam disparar
   * mais tarde, senão a animação roda com o conteúdo ainda abaixo da dobra.
   */
  rootMargin?: string;
  threshold?: number;
}

/**
 * Revela o conteúdo conforme ele entra na viewport.
 *
 * O conteúdo nunca pode ficar preso invisível: se o IntersectionObserver não
 * existir, não disparar, ou se o usuário preferir menos animação, o conteúdo
 * aparece do mesmo jeito.
 */
const SAFETY_TIMEOUT_MS = 1500;

export function Reveal({
  children,
  className,
  delayMs = 0,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    // Rede de segurança: só força a exibição se o elemento já estiver perto da
    // tela (sinal de que o observer deveria ter disparado e não disparou). Sem
    // essa checagem, o timeout revelava conteúdo fora da tela antes mesmo do
    // usuário rolar até ele, "queimando" animações de entrada como a do
    // pergaminho antes de serem vistas.
    const fallback = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const nearViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (nearViewport) {
        setVisible(true);
      }
    }, SAFETY_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
