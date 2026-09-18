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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsAtTop(window.scrollY < 12);
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            {/* O logo vem sobre fundo escuro: "screen" descarta o preto e mantém o dourado */}
            <img
              src={navaMonograma}
              alt=""
              aria-hidden
              className="h-10 w-auto mix-blend-screen"
            />
            <span className="font-display font-bold text-lg sm:text-xl text-foreground whitespace-nowrap">
              Dr. Wyllian Nava
            </span>
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
            className="md:hidden -mr-2 p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}

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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
