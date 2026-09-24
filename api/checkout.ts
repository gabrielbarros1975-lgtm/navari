// A extensão .js é obrigatória aqui: o package.json tem "type": "module", e o
// runtime Node da Vercel exige a extensão completa em imports relativos sob
// ESM (o TypeScript não acusa isso em dev, só quebra em produção).
import { parseBuyer } from "./_buyer.js";
import { PRODUCTS } from "./_products.js";
import { getSupabase } from "./_supabase.js";

/**
 * Formato do MP_DEVICE_SESSION_ID gerado pelo security.js (ver index.html):
 * hoje algo como "armor.<~200 hex>.<32 hex>", ~240 caracteres.
 */
const DEVICE_ID_PATTERN = /^[\w.-]{1,512}$/;

/**
 * Cria uma order do Checkout Pro (API de Orders — o fluxo recomendado hoje
 * pelo Mercado Pago; a antiga API de Preferences virou legado) e devolve o
 * link de pagamento.
 *
 * E-mail e nome vêm do nosso próprio formulário (não do checkout da Mercado
 * Pago): testamos com Pix e a order não trouxe nenhum dado de payer de
 * volta, então não dá pra confiar nisso depois no webhook. Por isso
 * capturamos aqui e já gravamos no Supabase — o webhook só lê esses valores.
 *
 * Nome, dados do item e Device ID também vão para o antifraude (ver
 * api/_buyer.ts): só com o e-mail, todo cartão era recusado como
 * "cc_rejected_high_risk". statement_descriptor e additional_info.ip_address
 * também ajudariam, mas a API de Orders recusa os dois
 * ("unsupported_properties").
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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }
  const { tierId, deviceId } = body ?? {};

  const product = typeof tierId === "string" ? PRODUCTS[tierId] : undefined;
  if (!product) {
    return Response.json({ error: "Ingresso não encontrado." }, { status: 404 });
  }

  const parsed = parseBuyer(body);
  if ("error" in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }
  const { buyer } = parsed;

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
      // Device ID do navegador de quem compra, para o antifraude.
      ...(typeof deviceId === "string" && DEVICE_ID_PATTERN.test(deviceId)
        ? { "X-meli-session-id": deviceId }
        : {}),
    },
    body: JSON.stringify({
      type: "online",
      processing_mode: "manual",
      total_amount: amount,
      // Volta no webhook e na URL de retorno para sabermos qual ingresso foi pago.
      external_reference: product.id,
      description: product.title,
      payer: {
        email: buyer.email,
        first_name: buyer.firstName,
        last_name: buyer.lastName,
      },
      // A API rejeita alguns campos que a documentação mostra no exemplo (ex.:
      // unit_measure, total_amount por item); estes foram testados e chegam ao
      // checkout. "learnings" é a categoria de cursos da Mercado Pago.
      items: [
        {
          external_code: product.id,
          title: product.title,
          description: product.description,
          category_id: "learnings",
          quantity: 1,
          unit_price: amount,
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

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("orders").upsert({
      id: order.id,
      tier_id: product.id,
      email: buyer.email,
      // Nome como vai no certificado.
      name: buyer.name,
      status: order.status,
      amount: product.price,
      updated_at: new Date().toISOString(),
    });
    if (error) console.error("Falha ao salvar order no Supabase (checkout):", error.message);
  } else {
    console.warn("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configurados: e-mail não será gravado.");
  }

  return Response.json({ url: order.checkout_url });
}
