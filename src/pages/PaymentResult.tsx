import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, CreditCard, Loader2, QrCode, RefreshCw, XCircle } from "lucide-react";
import { mockWorkshop } from "@/data/mockData";

type Phase = "aprovado" | "pendente" | "recusado";

/** O Mercado Pago volta com status em inglês ou no formato das back_urls. */
function phaseFromUrl(status: string | null): Phase {
  if (status === "aprovado" || status === "approved") return "aprovado";
  if (status === "recusado" || status === "rejected" || status === "failure") return "recusado";
  return "pendente";
}

/** Consulta a cada 4s enquanto pendente, por até 30 min (validade usual do Pix). */
const POLL_MS = 4000;
const POLL_MAX = 450;

/**
 * Destino das back_urls do Checkout Pro (ver api/checkout.ts) e da página de
 * obrigado da Kiwify.
 *
 * Com payment_id na URL (retornos do Mercado Pago), a situação vem da API
 * (/api/payment-status), não do "status" da URL: ele pode estar desatualizado
 * (Pix pago depois de a pessoa voltar ao site) ou ter sido editado. Enquanto
 * estiver pendente, a página consulta sozinha e muda de tela quando o
 * pagamento é aprovado ou recusado. Sem payment_id (Kiwify, que só redireciona
 * depois de aprovar), vale o status da URL.
 */
const PaymentResult = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id") || params.get("collection_id");
  const validPaymentId = paymentId && /^\d{6,20}$/.test(paymentId) ? paymentId : null;

  const [phase, setPhase] = useState<Phase>(phaseFromUrl(params.get("status")));
  const [method, setMethod] = useState<string | null>(params.get("payment_type"));
  const [tierId, setTierId] = useState<string | null>(params.get("external_reference"));
  const [reason, setReason] = useState<string | null>(null);
  // Até a primeira resposta, não afirma aprovação nem recusa.
  const [confirming, setConfirming] = useState(Boolean(validPaymentId));
  const [gaveUp, setGaveUp] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!validPaymentId) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let tries = 0;
    setGaveUp(false);

    const check = async () => {
      let finished = false;
      let slow = false;
      try {
        const res = await fetch(`/api/payment-status?payment_id=${validPaymentId}`, { cache: "no-store" });
        if (res.ok && !cancelled) {
          const data = await res.json();
          setPhase(data.phase);
          if (data.method) setMethod(data.method);
          if (data.tier) setTierId(data.tier);
          setReason(data.reason ?? null);
          finished = data.phase !== "pendente";
          // Boleto leva dias: não adianta ficar consultando com a página aberta.
          slow = data.method === "ticket";
        }
      } catch {
        // Falha de rede: tenta de novo no próximo ciclo.
      }
      if (cancelled) return;
      setConfirming(false);
      if (finished || slow) return;
      tries += 1;
      if (tries >= POLL_MAX) {
        setGaveUp(true);
        return;
      }
      timer = setTimeout(check, POLL_MS);
    };

    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [validPaymentId, round]);

  const tier = mockWorkshop.tiers.find((t) => t.id === tierId);
  const fallbackUrl = tier?.cardFallbackUrl;

  let content: JSX.Element;
  if (confirming) {
    content = (
      <>
        <StatusIcon icon={Loader2} spin />
        <h1 className="font-display text-2xl font-semibold mb-3">Confirmando seu pagamento…</h1>
        <p className="text-muted-foreground">Só um instante.</p>
      </>
    );
  } else if (phase === "aprovado") {
    content = (
      <>
        <StatusIcon icon={CheckCircle} />
        <h1 className="font-display text-2xl font-semibold mb-3">Pagamento aprovado!</h1>
        <p className="text-muted-foreground mb-2">
          Sua vaga na Imersão está garantida. Enviamos os dados de acesso para o e-mail informado na
          inscrição.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Não encontrou em alguns minutos? Confira a caixa de spam ou de promoções.
        </p>
        <Link to="/">
          <Button variant="hero">Voltar ao início</Button>
        </Link>
      </>
    );
  } else if (phase === "pendente") {
    const isPix = method === "bank_transfer";
    const isBoleto = method === "ticket";
    content = (
      <>
        <StatusIcon icon={Loader2} spin={!gaveUp && !isBoleto} />
        <h1 className="font-display text-2xl font-semibold mb-3">
          {isPix
            ? "Aguardando o pagamento do Pix"
            : isBoleto
              ? "Aguardando a compensação do boleto"
              : "Pagamento em análise"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isBoleto
            ? "O boleto pode levar até 3 dias úteis para ser compensado. Quando for confirmado, enviamos os dados de acesso para o seu e-mail. Não precisa deixar esta página aberta."
            : isPix
              ? "Assim que o Pix for pago, esta página se atualiza sozinha e enviamos os dados de acesso para o seu e-mail. Pode deixar esta página aberta."
              : "Estamos aguardando a confirmação do Mercado Pago. Esta página se atualiza sozinha, e os dados de acesso vão para o seu e-mail assim que o pagamento for aprovado."}
        </p>
        {gaveUp || isBoleto ? (
          <>
            {gaveUp && (
              <p className="text-sm text-muted-foreground mb-4">
                Ainda não recebemos a confirmação. Se você já pagou, ela pode demorar um pouco mais:
                o acesso chega por e-mail assim que for confirmado.
              </p>
            )}
            <Button variant="outline" className="gap-2" onClick={() => setRound((r) => r + 1)}>
              <RefreshCw aria-hidden className="w-4 h-4" />
              Verificar novamente
            </Button>
          </>
        ) : (
          validPaymentId && (
            <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Verificando automaticamente
            </p>
          )
        )}
      </>
    );
  } else {
    content = (
      <>
        <StatusIcon icon={XCircle} />
        <h1 className="font-display text-2xl font-semibold mb-3">Pagamento não aprovado</h1>
        {reason && <p className="text-foreground/85 mb-2">{reason}</p>}
        <p className="text-muted-foreground mb-8">Nada foi cobrado. Você pode garantir sua vaga de outra forma:</p>

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

          {/*
            Checkout alternativo (Kiwify) do ingresso que a pessoa tentou
            comprar: o antifraude do Mercado Pago recusa cartões em conta nova,
            e lá a análise usa o histórico da plataforma.
          */}
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
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Margem menor no celular: com p-10, numa tela de 320px os quadros
              de Pix e cartão ficavam com uns 170px de texto. aria-live avisa
              leitores de tela quando a situação muda sozinha. */}
          <div
            aria-live="polite"
            className="glass-card px-5 py-8 sm:p-10 md:p-14 text-center max-w-lg mx-auto"
          >
            {content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function StatusIcon({ icon: Icon, spin = false }: { icon: typeof CheckCircle; spin?: boolean }) {
  return (
    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
      <Icon aria-hidden className={spin ? "w-5 h-5 text-primary animate-spin" : "w-5 h-5 text-primary"} />
    </div>
  );
}

export default PaymentResult;
