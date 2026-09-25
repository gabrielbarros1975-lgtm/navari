import { Lock, RotateCcw, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { ComponentType } from "react";
import { PaymentLogos } from "@/components/PaymentLogos";

type Badge = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  to?: string;
};

/*
 * Selos no padrão de loja online: só afirmações verdadeiras. O site é HTTPS
 * (Vercel), o pagamento acontece no Mercado Pago e os 7 dias são o direito de
 * arrependimento do CDC, explicado em /termos-de-compra.
 */
const BADGES: Badge[] = [
  { icon: ShieldCheck, title: "Compra segura", subtitle: "Site protegido com SSL" },
  { icon: Lock, title: "Mercado Pago", subtitle: "Pagamento processado com segurança" },
  { icon: RotateCcw, title: "Garantia de 7 dias", subtitle: "Direito de arrependimento", to: "/termos-de-compra" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-3">
        {BADGES.map(({ icon: Icon, title, subtitle, to }) => {
          const content = (
            <>
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold" />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                  {title}
                </span>
                <span className="block mt-0.5 text-xs text-muted-foreground">{subtitle}</span>
              </span>
            </>
          );
          const boxClass =
            "flex items-center gap-3 rounded-xl border border-gold/25 bg-background/70 px-4 py-3 shadow-sm h-full";
          return (
            <li key={title}>
              {to ? (
                <Link to={to} className={`${boxClass} transition-colors hover:border-gold/60`}>
                  {content}
                </Link>
              ) : (
                <div className={boxClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      <PaymentLogos />
    </div>
  );
}
