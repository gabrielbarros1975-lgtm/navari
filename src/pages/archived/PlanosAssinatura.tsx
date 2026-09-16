/**
 * ARQUIVADA. Era a página de assinatura mensal ("/plans"), antes de a venda
 * passar a ser por curso. Fora das rotas; /plans agora redireciona para /courses.
 */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlanCard } from "@/components/PlanCard";
import { mockPlans } from "@/data/mockData";
import { Shield, CheckCircle, Zap } from "lucide-react";

const Plans = () => {
  const benefits = [
    "Acesso imediato após o pagamento",
    "Garantia de 7 dias",
    "Suporte técnico especializado",
    "Atualizações constantes",
    "Certificados reconhecidos",
    "Comunidade exclusiva",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Escolha o plano ideal para você
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Nossos <span className="gradient-text">Planos</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Invista no seu desenvolvimento profissional com nossos planos flexíveis. 
              Cancele quando quiser, sem burocracia.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {mockPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Benefits Section */}
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="font-display text-2xl font-bold">
                Todos os planos incluem
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Teaser */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              Tem dúvidas? Entre em contato conosco pelo email{" "}
              <a href="mailto:contato@cartorioedu.com.br" className="text-primary hover:underline">
                contato@cartorioedu.com.br
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Plans;
