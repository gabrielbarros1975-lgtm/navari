import { createHmac, timingSafeEqual } from "node:crypto";
import { sendAccessEmail } from "./_email.js";
import { getSupabase } from "./_supabase.js";

/**
 * Recebe as notificações da API de Orders (evento "Order (Mercado Pago)",
 * tópico "order" — configurado em Suas integrações → Webhooks →
 * Configurar notificações; a API de Orders não aceita notification_url por
 * requisição, então essa configuração só existe no painel).
 *
 * Variáveis de ambiente:
 * - MP_ACCESS_TOKEN: para consultar a order na API.
 * - MP_WEBHOOK_SECRET: "assinatura secreta" gerada em Suas integrações →
 *   Webhooks. Sem ela, qualquer um poderia forjar uma notificação.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.json().catch(() => ({}));

  const type = body.type ?? url.searchParams.get("type");
  const orderId = String(body.data?.id ?? url.searchParams.get("data.id") ?? "");

  // Outros tópicos não interessam: responder 200 para o Mercado Pago não
  // ficar reenviando.
  if (type !== "order" || !orderId) {
    return new Response(null, { status: 200 });
  }

  if (!isSignatureValid(request, orderId)) {
    console.warn("Webhook com assinatura inválida para a order", orderId);
    return new Response(null, { status: 401 });
  }

  // O corpo da notificação só traz o id: o status real vem da API.
  const orderResponse = await fetch(`https://api.mercadopago.com/v1/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
  });
  if (!orderResponse.ok) {
    console.error("Falha ao consultar order", orderId, orderResponse.status);
    // 500 faz o Mercado Pago tentar de novo mais tarde.
    return new Response(null, { status: 500 });
  }

  const order = await orderResponse.json();
  // Último pagamento tentado: é onde fica o motivo de uma recusa
  // (ex.: "cc_rejected_insufficient_amount", "cc_rejected_high_risk").
  const payments = order.transactions?.payments ?? [];
  const lastPayment = payments[payments.length - 1];
  console.log("Order", {
    id: order.id,
    status: order.status, // "processed" quando o pagamento foi concluído.
    statusDetail: order.status_detail,
    tier: order.external_reference,
    email: order.payer?.email,
    amount: order.total_paid_amount,
    lastPaymentStatus: lastPayment?.status,
    lastPaymentStatusDetail: lastPayment?.status_detail,
  });

  // Registra/atualiza a order no Supabase: dá um histórico de vendas fora do
  // painel da Mercado Pago e evita mandar o e-mail de acesso duas vezes se
  // esta notificação for reenviada (o Resend só protege contra isso por 24h).
  const supabase = getSupabase();
  let alreadyEmailed = false;

  if (supabase) {
    const { data: existing } = await supabase
      .from("orders")
      .select("email_sent_at")
      .eq("id", order.id)
      .maybeSingle();
    alreadyEmailed = Boolean(existing?.email_sent_at);

    const { error } = await supabase.from("orders").upsert({
      id: order.id,
      tier_id: order.external_reference,
      email: order.payer?.email,
      status: order.status,
      amount: order.total_paid_amount,
      updated_at: new Date().toISOString(),
    });
    if (error) console.error("Falha ao salvar order no Supabase:", error.message);
  } else {
    console.warn("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configurados: sem histórico de vendas.");
  }

  // Com o pagamento confirmado, manda o e-mail de acesso (link do Meet etc.).
  // A criação de conta na plataforma (caso um dia exista) ainda é manual.
  if (order.status === "processed" && !alreadyEmailed) {
    await sendAccessEmail(order);
    if (supabase) {
      const { error } = await supabase
        .from("orders")
        .update({ email_sent_at: new Date().toISOString() })
        .eq("id", order.id);
      if (error) console.error("Falha ao marcar e-mail como enviado:", error.message);
    }
  }

  return new Response(null, { status: 200 });
}

/**
 * Valida o cabeçalho x-signature ("ts=...,v1=..."): HMAC-SHA256 de
 * "id:<data.id em minúsculas>;request-id:<x-request-id>;ts:<ts>;", conforme
 * a documentação do Mercado Pago (o id de order é alfanumérico e deve ir em
 * minúsculas no manifest, diferente do id numérico de payment).
 */
function isSignatureValid(request: Request, orderId: string) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  const signature = request.headers.get("x-signature");
  if (!secret || !signature) return false;

  const parts = Object.fromEntries(
    signature.split(",").map((part) => part.trim().split("=", 2) as [string, string]),
  );
  if (!parts.ts || !parts.v1) return false;

  let manifest = `id:${orderId.toLowerCase()};`;
  const requestId = request.headers.get("x-request-id");
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${parts.ts};`;

  const expected = createHmac("sha256", secret).update(manifest).digest("hex");
  const received = parts.v1;
  return (
    expected.length === received.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(received))
  );
}
