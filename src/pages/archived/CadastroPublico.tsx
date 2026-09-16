/**
 * ARQUIVADA. Era o auto-cadastro público ("/register").
 * A conta passou a ser criada pela equipe a partir do email da compra,
 * com a senha enviada por email. Fora das rotas.
 */
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/auth/auth-context";
import { type FormEvent, useState } from "react";

const Register = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao cadastrar";
      toast({ title: "Não foi possível cadastrar", description: message, variant: "destructive" });
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
            <h1 className="font-display text-2xl font-bold mb-2">Criar conta</h1>
            <p className="text-muted-foreground mb-6">
              Cadastre-se para acessar os cursos e sua área.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>

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
                  placeholder="Crie uma senha"
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Já tem conta?{" "}
                <Link to="/login" className="text-primary underline underline-offset-4">
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
