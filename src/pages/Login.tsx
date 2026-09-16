import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/auth-context";
import { type FormEvent, useState } from "react";

const Login = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from || "/dashboard";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao entrar";
      toast({ title: "Não foi possível entrar", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass-card p-8">
            <h1 className="font-display text-2xl font-bold mb-2">Entrar</h1>
            <p className="text-muted-foreground mb-6">
              Use o email e a senha que enviamos após a confirmação da sua compra.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Ainda não recebeu seu acesso? Escreva para{" "}
                <a
                  href="mailto:contato@cartorioedu.com.br"
                  className="text-primary underline underline-offset-4"
                >
                  contato@cartorioedu.com.br
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
