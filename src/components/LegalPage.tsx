import { useEffect, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LegalPageProps {
  title: string;
  /** Ex.: "24 de setembro de 2026". */
  updatedAt: string;
  children: ReactNode;
}

/**
 * Moldura das páginas de política. O texto vem como HTML simples (h2, p, ul,
 * a) e ganha estilo aqui, pelos seletores de descendente: as páginas ficam
 * só com o conteúdo, sem classe em cada parágrafo.
 */
export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  // Sem isso, quem clica no link do rodapé abre a página já rolada até o fim:
  // o app não volta ao topo sozinho na troca de rota.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>

          <div
            className={[
              "mt-10 space-y-4 text-[15px] md:text-base leading-relaxed text-foreground/85",
              "[&_h2]:font-display [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:pt-6",
              "[&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:pt-2",
              "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:marker:text-gold",
              "[&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-foreground",
              "[&_strong]:font-semibold [&_strong]:text-foreground",
            ].join(" ")}
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
