import { Barcode } from "lucide-react";
import { MERCADO_PAGO_PATH, PIX_PATH } from "@/data/brand-icons";

/*
 * Bandeiras de cartão: as imagens oficiais que a API do Mercado Pago devolve
 * para exibição (GET /v1/payment_methods → secure_thumbnail, na versão SVG).
 * São as mesmas do checkout dele e as aceitas nesta conta.
 */
const mpLogo = (id: string) => `https://http2.mlstatic.com/storage/logos-api-admin/${id}-xl.svg`;

const CARD_BRANDS = [
  { name: "Visa", src: mpLogo("d589be70-eb86-11e9-b9a8-097ac027487d") },
  { name: "Mastercard", src: mpLogo("0daa1670-5c81-11ec-ae75-df2bef173be2") },
  { name: "Elo", src: mpLogo("069cfc80-7502-11ee-8a21-f7cc79dd73f5") },
  { name: "American Express", src: mpLogo("b4785730-c13f-11ee-b4b3-bb9a23b70639") },
];

/** Cartão branco de altura fixa: iguala logos de proporções bem diferentes. */
const tileClass =
  "flex h-11 sm:h-14 shrink-0 items-center justify-center rounded-lg border border-border bg-white px-3.5 sm:px-5 shadow-sm";

/** Símbolo + nome na cor da marca (o desenho sozinho não é reconhecível). */
function BrandMark({ name, path, color }: { name: string; path: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm sm:text-[15px] font-semibold" style={{ color }}>
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden>
        <path d={path} fill="currentColor" />
      </svg>
      {name}
    </span>
  );
}

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    // A segunda cópia só existe para o loop: leitores de tela a ignoram.
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
      <li className={tileClass}>
        <BrandMark name="Pix" path={PIX_PATH} color="#32BCAD" />
      </li>
      <li className={tileClass}>
        <BrandMark name="Mercado Pago" path={MERCADO_PAGO_PATH} color="#00B1EA" />
      </li>
      {CARD_BRANDS.map(({ name, src }) => (
        <li key={name} className={tileClass}>
          <img
            src={src}
            alt={hidden ? "" : name}
            loading="lazy"
            decoding="async"
            width={48}
            height={32}
            className="h-7 sm:h-9 w-auto object-contain"
          />
        </li>
      ))}
      <li className={tileClass}>
        <span className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-foreground/80">
          <Barcode aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" />
          Boleto
        </span>
      </li>
    </ul>
  );
}

/**
 * Carrossel de formas de pagamento em loop contínuo, com as bordas
 * esmaecidas. Roda sempre, a pedido: sem pausa no mouse e sem parar para a
 * preferência de movimento reduzido do sistema.
 */
export function PaymentLogos() {
  return (
    <div className="w-full max-w-4xl">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Formas de pagamento
      </p>
      <div className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </div>
  );
}
