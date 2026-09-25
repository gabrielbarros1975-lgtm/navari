import { Barcode } from "lucide-react";
import { MERCADO_PAGO_PATH, PIX_PATH } from "@/data/brand-icons";
import { cn } from "@/lib/utils";

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

/** Símbolo + nome na cor da marca (o desenho sozinho não é reconhecível). */
function BrandMark({ name, path, color }: { name: string; path: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-[15px]" style={{ color }}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d={path} fill="currentColor" />
      </svg>
      {name}
    </span>
  );
}

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      // A segunda cópia só existe para o loop: leitores de tela a ignoram e,
      // sem animação (movimento reduzido), ela nem aparece.
      aria-hidden={hidden || undefined}
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10",
        hidden
          ? "motion-reduce:hidden"
          : "motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-4 motion-reduce:pr-0",
      )}
    >
      <li>
        <BrandMark name="Pix" path={PIX_PATH} color="#32BCAD" />
      </li>
      <li>
        <BrandMark name="Mercado Pago" path={MERCADO_PAGO_PATH} color="#00B1EA" />
      </li>
      {CARD_BRANDS.map(({ name, src }) => (
        <li key={name}>
          <img
            src={src}
            alt={hidden ? "" : name}
            loading="lazy"
            decoding="async"
            width={48}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </li>
      ))}
      <li>
        <span className="inline-flex items-center gap-1.5 font-semibold text-[15px] text-foreground/80">
          <Barcode aria-hidden className="h-6 w-6" />
          Boleto
        </span>
      </li>
    </ul>
  );
}

/**
 * Faixa de formas de pagamento rolando em loop, com as bordas esmaecidas.
 * Para ao passar o mouse e fica parada (centralizada, sem cópia) para quem
 * pediu menos movimento no sistema.
 */
export function PaymentLogos() {
  return (
    <div className="w-full max-w-3xl">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Formas de pagamento
      </p>
      {/* Bordas esmaecidas só com a faixa andando: parada, elas apagariam os
          logos das pontas. */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]">
        <div className="flex w-max animate-marquee opacity-90 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </div>
  );
}
