/**
 * Dados do comprador pedidos antes do checkout. Usado pelo servidor
 * (api/checkout.ts) e pelo formulário (src/pages/Workshop.tsx), para as duas
 * pontas validarem igual.
 *
 * Nome, CPF e telefone não são obrigatórios na API de Orders, mas sem eles o
 * antifraude da Mercado Pago recusava TODO pagamento com cartão como
 * "cc_rejected_high_risk" (a order só levava o e-mail). São os dados que ela
 * mais pede para aprovar — ver "Melhore a aprovação" na doc do Checkout Pro.
 */
export type Buyer = {
  email: string;
  firstName: string;
  lastName: string;
  /** Só dígitos, 11. */
  cpf: string;
  /** Só dígitos: DDD (2) + número (8 ou 9). */
  phone: string;
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  // Sequências repetidas (000.000.000-00 etc.) passam no dígito verificador.
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const checkDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(cpf[i]) * (length + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };
  return checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10]);
}

/** DDD válido (11–99) + 8 ou 9 dígitos. */
export function isValidPhone(value: string) {
  return /^[1-9][1-9]\d{8,9}$/.test(onlyDigits(value));
}

/** Nome e sobrenome: pelo menos duas palavras. */
export function splitName(value: string) {
  const [firstName, ...rest] = value.trim().split(/\s+/);
  const lastName = rest.join(" ");
  return firstName && lastName ? { firstName, lastName } : null;
}

type BuyerInput = { name?: unknown; email?: unknown; cpf?: unknown; phone?: unknown };

/** Valida o que veio do formulário; devolve a mensagem de erro a exibir. */
export function parseBuyer(input: BuyerInput): { buyer: Buyer } | { error: string } {
  const { name, email, cpf, phone } = input;
  const fullName = typeof name === "string" ? splitName(name) : null;
  if (!fullName) return { error: "Informe seu nome completo." };
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return { error: "Informe um e-mail válido." };
  }
  if (typeof cpf !== "string" || !isValidCpf(cpf)) return { error: "Informe um CPF válido." };
  if (typeof phone !== "string" || !isValidPhone(phone)) {
    return { error: "Informe um celular válido, com DDD." };
  }
  return {
    buyer: {
      ...fullName,
      email: email.trim(),
      cpf: onlyDigits(cpf),
      phone: onlyDigits(phone),
    },
  };
}

/** 12345678909 → 123.456.789-09, aplicado enquanto a pessoa digita. */
export function formatCpf(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

/** 98987654321 → (98) 98765-4321, aplicado enquanto a pessoa digita. */
export function formatPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const number = d.slice(2);
  const split = number.length > 8 ? 5 : 4;
  return number.length > split
    ? `(${ddd}) ${number.slice(0, split)}-${number.slice(split)}`
    : `(${ddd}) ${number}`;
}
