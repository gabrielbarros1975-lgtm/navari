/**
 * Tradução do pagamento do Mercado Pago para a página de retorno
 * (/pagamento). Fica separada do handler para poder ser testada e para o
 * front não depender dos nomes internos de status do Mercado Pago.
 */
export type PaymentPhase = "aprovado" | "pendente" | "recusado";

export function phaseFromStatus(status: string | undefined): PaymentPhase {
  if (status === "approved") return "aprovado";
  // cancelled = Pix/boleto que expirou; refunded/charged_back = estornado.
  if (status && ["rejected", "cancelled", "refunded", "charged_back"].includes(status)) return "recusado";
  // pending, in_process, authorized, in_mediation...
  return "pendente";
}

/*
 * Motivo em português só quando ajuda o comprador a resolver. As recusas do
 * antifraude (high_risk, blacklist, other_reason) ficam sem motivo de
 * propósito: não há o que a pessoa corrigir e o texto soaria como acusação.
 */
const REASONS: Record<string, string> = {
  cc_rejected_insufficient_amount: "O cartão não tem limite suficiente para esta compra.",
  cc_rejected_bad_filled_card_number: "O número do cartão foi digitado errado.",
  cc_rejected_bad_filled_date: "A data de validade do cartão foi digitada errada.",
  cc_rejected_bad_filled_security_code: "O código de segurança (CVV) foi digitado errado.",
  cc_rejected_bad_filled_other: "Algum dado do cartão foi digitado errado.",
  cc_rejected_call_for_authorize: "O banco pediu que você autorize este pagamento. Fale com ele ou use outra forma de pagamento.",
  cc_rejected_card_disabled: "O cartão está bloqueado ou desativado. Fale com o banco ou use outro cartão.",
  cc_rejected_duplicated_payment: "Já existe um pagamento igual feito há pouco com este cartão.",
  cc_rejected_max_attempts: "O limite de tentativas com este cartão foi atingido. Use outro cartão ou o Pix.",
  cc_rejected_invalid_installments: "O cartão não aceita esse número de parcelas.",
  expired: "O prazo para pagamento expirou.",
};

export function reasonFromDetail(detail: string | undefined): string | null {
  return (detail && REASONS[detail]) || null;
}
