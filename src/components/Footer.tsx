import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { navaMonograma } from "@/data/images";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={navaMonograma}
                alt=""
                aria-hidden
                className="h-9 w-auto mix-blend-screen"
              />
              <span className="font-display font-bold text-lg text-foreground">
                Dr. Wyllian Nava
              </span>
            </Link>
            <p className="text-muted-foreground text-xs text-center md:text-left max-w-xs">
              Cursos, imersões e conteúdos especializados em Registro de Imóveis.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <Link to="/courses" className="py-1 hover:text-primary transition-colors">
              Cursos
            </Link>
            <a href="/#inscricao" className="py-1 hover:text-primary transition-colors">
              Imersão
            </a>
            <a href="/#faq" className="py-1 hover:text-primary transition-colors">
              FAQ
            </a>
            <a
              href="https://wa.me/5598984923268"
              target="_blank"
              rel="noreferrer"
              className="py-1 hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>

        <div className="border-t border-border/50 mt-6 pt-6 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-3 text-xs text-muted-foreground text-center">
          <p>© 2026 Dr. Wyllian Nava. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a
              href="tel:98984923268"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Contato: (98) 98492-3268
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Localização: São Luís, MA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
