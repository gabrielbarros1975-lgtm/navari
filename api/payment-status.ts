// A extensão .js é obrigatória nos imports relativos (ver api/checkout.ts).
import { phaseFromStatus, reasonFromDetail } from "./_payment-status.js";

/**
 * Situação de um pagamento do Mercado Pago, para a página /pagamento
 * acompanhar ao vivo: o Pix pode ser pago depois de a pessoa voltar ao site,
 * e o status que vem na URL de retorno não é confiável (qualquer um edita).
 *
 * Devolve só fase, forma de pagamento, ingresso e um motivo legível. Nada
 * do comprador: quem souber um payment_id vê apenas se ele foi aprovado.
 *
 * GET /api/payment-status?payment_id=123
 */
export async function GET(request: Request) {
  const paymentId = new URL(request.url).searchParams.get("payment_id") ?? "";
  if (!/^\d{6,20}$/.test(paymentId)) {
    return Response.json({ error: "payment_id inválido" }, { status: 400 });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MP_ACCESS_TOKEN não configurado");
    return Response.json({ error: "indisponível" }, { status: 500 });
  }

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 404) return Response.json({ error: "não encontrado" }, { status: 404 });
  if (!res.ok) {
    console.error("Falha ao consultar pagamento", paymentId, res.status);
    return Response.json({ error: "indisponível" }, { status: 502 });
  }

  const payment = await res.json();
  return Response.json(
    {
      phase: phaseFromStatus(payment.status),
      method: payment.payment_type_id ?? null, // credit_card, bank_transfer (Pix), ticket (boleto)...
      tier: payment.external_reference ?? null,
      reason: payment.status === "approved" ? null : reasonFromDetail(payment.status_detail),
    },
    // A página consulta várias vezes: nunca servir resposta velha.
    { headers: { "Cache-Control": "no-store" } },
  );
}
