/**
 * Dados do comprador pedidos antes do checkout. Usado pelo servidor
 * (api/checkout.ts) e pelo formulário (src/pages/Workshop.tsx), para as duas
 * pontas validarem igual.
 *
 * A Mercado Pago não devolve o e-mail nem o nome de quem pagou (nos
 * pagamentos da conta vieram vazios ou mascarados), então os dois têm que
 * vir daqui: o e-mail recebe o acesso e o nome vai no certificado. O nome
 * também segue como payer para o antifraude. CPF e telefone ficaram de fora
 * de propósito: a tela de cartão da Mercado Pago já pede nome e CPF do
 * titular, e menos campos aqui é menos gente desistindo antes de pagar.
 */
export type Buyer = {
  email: string;
  /** Nome completo, como vai no certificado. */
  name: string;
  firstName: string;
  lastName: string;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Nome e sobrenome: pelo menos duas palavras. */
export function splitName(value: string) {
  const [firstName, ...rest] = value.trim().split(/\s+/);
  const lastName = rest.join(" ");
  return firstName && lastName ? { firstName, lastName } : null;
}

type BuyerInput = { name?: unknown; email?: unknown };

/** Valida o que veio do formulário; devolve a mensagem de erro a exibir. */
export function parseBuyer(input: BuyerInput): { buyer: Buyer } | { error: string } {
  const { name, email } = input;
  const fullName = typeof name === "string" ? splitName(name) : null;
  if (!fullName) return { error: "Informe seu nome completo." };
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return { error: "Informe um e-mail válido." };
  }
  return {
    buyer: {
      ...fullName,
      name: `${fullName.firstName} ${fullName.lastName}`,
      email: email.trim(),
    },
  };
}
