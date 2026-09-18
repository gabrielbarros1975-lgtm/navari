import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/auth-context";
import { navaMonograma } from "@/data/images";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY < 12);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/courses", label: "Cursos" },
  ];

  const linkClass = (target: string) => {
    const active = location.pathname === target;
    return cn(
      "relative py-1 text-sm transition-colors text-muted-foreground hover:text-foreground",
      active && "text-foreground font-medium",
      active &&
        "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary"
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-shadow duration-300",
        !isAtTop && "shadow-sm"
      )}
    >
      {/* Barra de progresso de leitura: dá noção de quanto falta da página */}
      <div
        aria-hidden
        className="absolute left-0 top-full h-0.5 bg-gradient-to-r from-gold/80 to-gold-light transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0 tap-scale">
            {/* O logo vem sobre fundo escuro: "screen" descarta o preto e mantém o dourado */}
            <img
              src={navaMonograma}
              alt=""
              aria-hidden
              className="h-10 w-auto mix-blend-screen"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base sm:text-lg text-foreground whitespace-nowrap">
                Dr. Wyllian Nava
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap">
                Registro de Imóveis
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className={linkClass(link.to)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Minha Área
                  </Button>
                </Link>
                <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden -mr-2 p-2.5 text-foreground tap-scale relative"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            <Menu
              className={cn(
                "w-6 h-6 transition-all duration-200",
                mobileMenuOpen ? "opacity-0 rotate-90 scale-50 absolute inset-2.5" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "w-6 h-6 transition-all duration-200",
                mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50 absolute inset-2.5"
              )}
            />
          </button>
        </div>

        {/* Grid-rows 0fr→1fr anima a altura do menu sem precisar medir px em JS,
            e mantém a saída (fechar) animada em vez de sumir de golpe. */}
        <div
          className={cn(
            "md:hidden grid transition-[grid-template-rows] duration-300 ease-out",
            mobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 py-4 border-t border-border/50">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground active:bg-accent/10 transition-colors py-3 px-2 -mx-2 rounded-lg text-base"
                  style={
                    mobileMenuOpen
                      ? { animation: `fade-in-up 300ms ease-out both`, animationDelay: `${index * 40}ms` }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}

              <div
                className="flex flex-col gap-2.5 pt-3 mt-2 border-t border-border/40"
                style={
                  mobileMenuOpen
                    ? { animation: `fade-in-up 300ms ease-out both`, animationDelay: `${navLinks.length * 40}ms` }
                    : undefined
                }
              >
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" className="w-full">
                        Minha Área
                      </Button>
                    </Link>
                    <Button type="button" variant="outline" className="w-full" onClick={handleLogout}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button variant="default" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
