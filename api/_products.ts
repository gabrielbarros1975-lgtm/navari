/**
 * Catálogo usado pelo servidor para montar a cobrança. O preço vem daqui, e
 * não do navegador: quem chama /api/checkout só informa o id do ingresso.
 *
 * Precisa bater com os tiers de src/data/mockData.ts; o teste
 * src/test/checkout-products.test.ts falha se os dois divergirem.
 */
export type Product = {
  id: string;
  title: string;
  /** Vai para o antifraude da Mercado Pago (items[].description). */
  description: string;
  /** Valor à vista, em reais. */
  price: number;
  /** Máximo de parcelas oferecido no checkout. */
  installments: number;
};

export const PRODUCTS: Record<string, Product> = {
  "ao-vivo": {
    id: "ao-vivo",
    title: "Imersão Incorporação Imobiliária · AO VIVO",
    description: "Imersão online e ao vivo em Incorporação Imobiliária, 17/10/2026",
    price: 296.4,
    installments: 12,
  },
  "ao-vivo-mais-plataforma": {
    id: "ao-vivo-mais-plataforma",
    title: "Imersão Incorporação Imobiliária · AO VIVO + gravação",
    description: "Imersão online e ao vivo em Incorporação Imobiliária, 17/10/2026, com acesso à gravação por 1 ano",
    price: 357.6,
    installments: 12,
  },
  // Ingresso de teste, mantido de propósito para validar o pagamento em
  // produção. R$0,50 é o mínimo da Mercado Pago no crédito (em todas as
  // bandeiras); nesse valor só existe 1x. O id segue "parcelado" porque é o
  // external_reference das orders de teste já criadas.
  "teste-cartao-parcelado": {
    id: "teste-cartao-parcelado",
    title: "Teste de cartão",
    description: "Pagamento de teste da Imersão em Incorporação Imobiliária",
    price: 0.5,
    installments: 1,
  },
};
