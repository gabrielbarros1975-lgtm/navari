import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";

/** Destino das back_urls do Checkout Pro (ver api/checkout.ts). */
const RESULTS = {
  aprovado: {
    icon: CheckCircle,
    title: "Inscrição confirmada!",
    text: "Seu pagamento foi aprovado. Em breve você receberá os dados de acesso à Imersão no e-mail informado na inscrição.",
  },
  pendente: {
    icon: Clock,
    title: "Pagamento em análise",
    text: "Assim que o Mercado Pago confirmar o pagamento (boleto e Pix podem levar alguns instantes), enviaremos os dados de acesso para o seu e-mail.",
  },
  recusado: {
    icon: XCircle,
    title: "Pagamento não concluído",
    text: "O pagamento não foi aprovado e nada foi cobrado. Você pode tentar novamente com outro meio de pagamento.",
  },
} as const;

const PaymentResult = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const result = RESULTS[status as keyof typeof RESULTS] ?? RESULTS.pendente;
  const Icon = result.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-10 md:p-14 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-semibold mb-3">{result.title}</h1>
            <p className="text-muted-foreground mb-8">{result.text}</p>
            <Link to={status === "recusado" ? "/#inscricao" : "/"}>
              <Button variant="hero">
                {status === "recusado" ? "Tentar novamente" : "Voltar ao início"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResult;
