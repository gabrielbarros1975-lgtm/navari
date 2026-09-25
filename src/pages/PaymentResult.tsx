import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, CreditCard, QrCode, XCircle } from "lucide-react";
import { mockWorkshop } from "@/data/mockData";

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
    title: "Pagamento não aprovado",
    text: "Nada foi cobrado. Você pode garantir sua vaga de outra forma:",
  },
} as const;

const PaymentResult = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const result = RESULTS[status as keyof typeof RESULTS] ?? RESULTS.pendente;
  const Icon = result.icon;

  /*
   * Na recusa, o Mercado Pago devolve o ingresso em external_reference. Com
   * ele dá para oferecer o checkout alternativo (Kiwify) do ingresso certo:
   * o antifraude do Mercado Pago recusa cartões em conta nova, e lá a análise
   * usa o histórico da plataforma. Sem ingresso conhecido (ou no de teste,
   * que não está na Kiwify), fica só o Pix.
   */
  const tier = mockWorkshop.tiers.find((t) => t.id === params.get("external_reference"));
  const fallbackUrl = status === "recusado" ? tier?.cardFallbackUrl : undefined;

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

            {status === "recusado" ? (
              <div className="space-y-4 text-left">
                <div className="rounded-xl border border-border bg-background/60 p-5">
                  <p className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <QrCode aria-hidden className="w-5 h-5 text-gold" />
                    Pague com Pix
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A aprovação é na hora e os dados de acesso chegam no seu e-mail em seguida.
                  </p>
                  <Link to="/#inscricao" className="mt-4 block">
                    <Button variant="hero" className="w-full">
                      Pagar com Pix
                    </Button>
                  </Link>
                </div>

                {fallbackUrl && (
                  <div className="rounded-xl border border-border bg-background/60 p-5">
                    <p className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                      <CreditCard aria-hidden className="w-5 h-5 text-gold" />
                      Prefere cartão?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tente por outra plataforma de pagamento, a Kiwify, em até 12x.
                    </p>
                    <a href={fallbackUrl} className="mt-4 block">
                      <Button variant="outline" className="w-full">
                        Pagar com cartão pela Kiwify
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/">
                <Button variant="hero">Voltar ao início</Button>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResult;
