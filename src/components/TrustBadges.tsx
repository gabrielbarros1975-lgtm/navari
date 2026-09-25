import { PaymentLogos } from "@/components/PaymentLogos";

/*
 * Faixa de confiança do rodapé. Os três quadros de texto ("Compra segura",
 * "Mercado Pago", "Garantia de 7 dias") saíram: pareciam genéricos. O selo de
 * garantia em imagem entra aqui quando o arquivo estiver em public/.
 */
export function TrustBadges() {
  return (
    <div className="flex flex-col items-center gap-6">
      <PaymentLogos />
    </div>
  );
}
