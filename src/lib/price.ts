/** Formata um valor em reais, ex.: 497 -> "R$ 497,00". */
export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Valor de cada parcela, arredondado para cima.
 * Nunca exibimos uma parcela que, multiplicada, dê menos que o total.
 */
export const installmentValue = (price: number, installments: number) =>
  Math.ceil((price / installments) * 100) / 100;
