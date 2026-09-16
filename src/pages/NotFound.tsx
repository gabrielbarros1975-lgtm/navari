import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: rota inexistente acessada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-10 md:p-14 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <p className="font-display text-5xl font-bold text-gold mb-3">404</p>
            <h1 className="font-display text-xl font-semibold mb-3">Página não encontrada</h1>
            <p className="text-muted-foreground mb-8">
              O endereço que você tentou acessar não existe ou foi movido.
            </p>
            <Link to="/">
              <Button variant="hero">Voltar ao início</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
