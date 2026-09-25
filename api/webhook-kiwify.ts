import { sendAccessEmail } from "./_email.js";
import { fetchKiwifySale, findSaleId, kiwifyCredentials, productFromBasePrice } from "./_kiwify.js";
import { getSupabase } from "./_supabase.js";

/**
 * Recebe os webhooks da Kiwify (Kiwify → Apps → Webhooks, apontando para
 * /api/webhook-kiwify, com o produto da Imersão e os eventos de compra
 * aprovada, reembolso e chargeback).
 *
 * Mesmo desenho do api/webhook.ts (Mercado Pago): o aviso só diz qual venda
 * olhar; status, comprador e valor vêm da API da Kiwify. Por isso não há
 * checagem de assinatura (o formato dela não está documentado): um aviso
 * forjado, no máximo, faria reenviar o acesso de uma venda paga para o e-mail
 * de quem pagou — e nem isso, porque o e-mail só sai uma vez por venda.
 *
 * Grava na mesma tabela orders, com id "kiwify_<id da venda>" para não
 * colidir com as orders do Mercado Pago, e manda o mesmo e-mail de acesso.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const saleId = findSaleId(body);
  if (!saleId) {
    console.warn("Webhook da Kiwify sem id de venda. Campos recebidos:", Object.keys(body ?? {}));
    return new Response(null, { status: 200 });
  }

  const creds = kiwifyCredentials();
  if (!creds) {
    console.error("KIWIFY_CLIENT_ID/KIWIFY_CLIENT_SECRET/KIWIFY_ACCOUNT_ID não configurados.");
    // 500 faz a Kiwify tentar de novo depois que as variáveis forem criadas.
    return new Response(null, { status: 500 });
  }

  let sale;
  try {
    sale = await fetchKiwifySale(saleId, creds);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return new Response(null, { status: 500 });
  }
  if (!sale) {
    // Ex.: o botão de teste do painel manda uma venda que não existe.
    console.warn("Venda da Kiwify não encontrada na API:", saleId);
    return new Response(null, { status: 200 });
  }

  const product = productFromBasePrice(sale.payment?.product_base_price);
  const id = `kiwify_${sale.id}`;
  const email = sale.customer?.email?.trim();
  const name = sale.customer?.name?.trim();
  console.log("Venda Kiwify", {
    id,
    status: sale.status,
    tier: product?.id ?? null,
    basePrice: sale.payment?.product_base_price,
  });
  if (!product) {
    console.warn("Preço base sem ingresso correspondente em api/_products.ts:", sale.payment?.product_base_price);
  }

  const supabase = getSupabase();
  let alreadyEmailed = false;
  if (supabase) {
    const { data: existing } = await supabase
      .from("orders")
      .select("email_sent_at")
      .eq("id", id)
      .maybeSingle();
    alreadyEmailed = Boolean(existing?.email_sent_at);

    const { error } = await supabase.from("orders").upsert({
      id,
      tier_id: product?.id ?? null,
      email: email ?? null,
      // Nome como a pessoa digitou no checkout da Kiwify: vai no certificado.
      name: name ?? null,
      status: sale.status,
      amount: typeof sale.payment?.charge_amount === "number" ? sale.payment.charge_amount / 100 : null,
      updated_at: new Date().toISOString(),
    });
    if (error) console.error("Falha ao salvar venda da Kiwify no Supabase:", error.message);
  } else {
    console.warn("SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY não configurados: sem histórico de vendas.");
  }

  if (sale.status === "paid" && !alreadyEmailed) {
    if (!email) {
      console.warn("E-mail de acesso não enviado: venda", id, "sem e-mail do comprador.");
    } else {
      const sent = await sendAccessEmail(email, { id, external_reference: product?.id });
      if (sent && supabase) {
        const { error } = await supabase
          .from("orders")
          .update({ email_sent_at: new Date().toISOString() })
          .eq("id", id);
        if (error) console.error("Falha ao marcar e-mail como enviado:", error.message);
      }
    }
  }

  return new Response(null, { status: 200 });
}
