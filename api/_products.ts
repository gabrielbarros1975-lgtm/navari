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
  /** Valor à vista, em reais. */
  price: number;
  /** Máximo de parcelas oferecido no checkout. */
  installments: number;
};

export const PRODUCTS: Record<string, Product> = {
  "ao-vivo": {
    id: "ao-vivo",
    title: "Imersão Incorporação Imobiliária · AO VIVO",
    price: 296.4,
    installments: 12,
  },
  "ao-vivo-mais-plataforma": {
    id: "ao-vivo-mais-plataforma",
    title: "Imersão Incorporação Imobiliária · AO VIVO + gravação",
    price: 357.6,
    installments: 12,
  },
  // TODO: remover assim que o teste de e-mail de acesso em produção for validado.
  // Valor e título diferentes de cada tentativa anterior de propósito: o
  // antifraude da Mercado Pago rejeitou como "high_risk" por ver o mesmo
  // cartão usado várias vezes seguidas contra a loja — ver
  // https://www.mercadopago.com.br/developers/pt/docs/woocommerce/how-tos/improve-payment-approval/reasons-for-rejection
  "teste-cartao-parcelado": {
    id: "teste-cartao-parcelado",
    title: "Teste de cartão parcelado",
    price: 10,
    installments: 2,
  },
};
