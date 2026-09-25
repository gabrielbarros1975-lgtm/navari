import { Link } from "react-router-dom";
import { PaymentLogos } from "@/components/PaymentLogos";

/*
 * Faixa de confiança do rodapé: selo de garantia + carrossel de formas de
 * pagamento. O selo é do Designi (#10002431, licença gratuita para uso
 * comercial, sem atribuição). O arquivo baixado era um JPEG com o xadrez de
 * "transparência" desenhado no fundo; o xadrez foi removido e a imagem
 * reduzida para 256px em WebP. Os 7 dias são o direito de arrependimento do
 * CDC, por isso o selo leva aos termos.
 */
export function TrustBadges() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        to="/termos-de-compra"
        className="rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src="/selo-garantia-7-dias.webp"
          alt="Selo de garantia de 7 dias: veja os Termos de Compra e Reembolso"
          width={256}
          height={256}
          loading="lazy"
          decoding="async"
          className="h-24 w-24 sm:h-28 sm:w-28"
        />
      </Link>
      <PaymentLogos />
    </div>
  );
}
