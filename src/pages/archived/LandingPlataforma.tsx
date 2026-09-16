/**
 * ARQUIVADA. Era a home ("/") antes do workshop virar a página principal.
 * Não está mais nas rotas. Mantida para consulta e possível retomada.
 */
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/PlanCard";
import { CourseThumb } from "@/components/CourseThumb";
import { PlatformFeatureCards } from "@/components/PlatformFeatures";
import { mockCourses, mockPlans } from "@/data/mockData";
import { User, Clock, CheckCircle, ArrowRight, Play } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/auth/auth-context";

const Index = () => {
  const { user } = useAuth();
  const landingCourses = useMemo(() => mockCourses.slice(0, 4), []);
  const totalCourses = mockCourses.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Educação continuada · Registro de imóveis
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Cursos para quem atua no{" "}
              <span className="gradient-text">registro de imóveis</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aulas gravadas e encontros ao vivo sobre matrícula, usucapião extrajudicial,
              incorporação imobiliária e LGPD, com professores que atuam no dia a dia do
              cartório.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="hero" size="xl" className="gap-2">
                      <Play className="w-5 h-5" />
                      Minha área
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button variant="heroOutline" size="xl">
                      Ver cursos
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="hero" size="xl" className="gap-2">
                      <Play className="w-5 h-5" />
                      Criar conta
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="heroOutline" size="xl">
                      Entrar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              O que você encontra na plataforma
            </h2>
            <p className="text-muted-foreground">
              {totalCourses} cursos organizados por módulos, pensados para a rotina de quem
              trabalha em cartório de registro de imóveis.
            </p>
          </div>

          <PlatformFeatureCards />
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-card/30 border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Cursos em destaque
              </h2>
              <p className="text-muted-foreground">
                Os módulos mais procurados por profissionais de cartório
              </p>
            </div>
            <Link to={user ? "/courses" : "/login"}>
              <Button variant="outline" className="gap-2">
                Ver todos os cursos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingCourses.map((course) => (
              <div key={course.id} className="glass-card-hover overflow-hidden">
                <div className="relative">
                  <CourseThumb category={course.category} />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/90 border border-border text-xs font-medium">
                    {course.modules.length} {course.modules.length === 1 ? "módulo" : "módulos"}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display font-semibold text-lg line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {course.instructor}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Planos</h2>
            <p className="text-muted-foreground">
              Escolha o plano de acordo com o número de cursos que você precisa acompanhar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Comece a estudar hoje
            </h2>
            <p className="text-primary-foreground/80">
              Crie sua conta e escolha o plano que faz sentido para a sua rotina no
              cartório.
            </p>
            <div className="flex justify-center pt-2">
              <Link to="/register">
                <Button variant="secondary" size="xl">
                  Criar minha conta
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Acesso imediato após o cadastro
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Cobrança mensal, cancele quando quiser
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Suporte por email
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
