// A extensão .js é obrigatória aqui: o package.json tem "type": "module", e o
// runtime Node da Vercel exige a extensão completa em imports relativos sob
// ESM (o TypeScript não acusa isso em dev, só quebra em produção).
import { PRODUCTS } from "./_products.js";

/**
 * Cria uma order do Checkout Pro (API de Orders — o fluxo recomendado hoje
 * pelo Mercado Pago; a antiga API de Preferences virou legado) e devolve o
 * link de pagamento.
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 * - MP_ACCESS_TOKEN: Access Token de produção (ou de teste) da integração.
 *
 * A notificação de pagamento (webhook) é configurada direto no painel do
 * Mercado Pago — Suas integrações → Webhooks —, não por requisição: a API de
 * Orders não tem campo notification_url. Ver api/webhook.ts.
 */
export async function POST(request: Request) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MP_ACCESS_TOKEN não configurado");
    return Response.json({ error: "Pagamento indisponível no momento." }, { status: 500 });
  }

  let tierId: unknown;
  try {
    ({ tierId } = await request.json());
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const product = typeof tierId === "string" ? PRODUCTS[tierId] : undefined;
  if (!product) {
    return Response.json({ error: "Ingresso não encontrado." }, { status: 404 });
  }

  const origin = new URL(request.url).origin;
  // A API de Orders exige os valores como string com 2 casas decimais.
  const amount = product.price.toFixed(2);

  const mpResponse = await fetch("https://api.mercadopago.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      // Evita cobrança duplicada se o navegador repetir a requisição.
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      type: "online",
      processing_mode: "manual",
      total_amount: amount,
      // Volta no webhook e na URL de retorno para sabermos qual ingresso foi pago.
      external_reference: product.id,
      description: product.title,
      items: [
        {
          title: product.title,
          quantity: 1,
          unit_measure: "unit",
          unit_price: amount,
          total_amount: amount,
        },
      ],
      config: {
        online: {
          success_url: `${origin}/pagamento?status=aprovado`,
          pending_url: `${origin}/pagamento?status=pendente`,
          failure_url: `${origin}/pagamento?status=recusado`,
          auto_return: "approved",
        },
        payment_method: {
          max_installments: product.installments,
        },
      },
    }),
  });

  if (!mpResponse.ok) {
    console.error("Falha ao criar order:", mpResponse.status, await mpResponse.text());
    return Response.json({ error: "Não foi possível iniciar o pagamento." }, { status: 502 });
  }

  const order = await mpResponse.json();
  return Response.json({ url: order.checkout_url });
}
