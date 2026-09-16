import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em ms, para escalonar itens de uma mesma lista. */
  delayMs?: number;
}

/**
 * Revela o conteúdo conforme ele entra na viewport.
 *
 * O conteúdo nunca pode ficar preso invisível: se o IntersectionObserver não
 * existir, não disparar, ou se o usuário preferir menos animação, o conteúdo
 * aparece do mesmo jeito.
 */
const SAFETY_TIMEOUT_MS = 1500;

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(el);

    // Rede de segurança: se o observer não responder, mostra o conteúdo assim mesmo.
    const fallback = window.setTimeout(() => setVisible(true), SAFETY_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

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
