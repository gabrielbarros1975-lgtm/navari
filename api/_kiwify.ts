import { PRODUCTS, type Product } from "./_products.js";

/**
 * Cliente mínimo da API pública da Kiwify (https://docs.kiwify.com.br), o
 * checkout alternativo oferecido quando o Mercado Pago recusa o cartão (ver
 * src/pages/PaymentResult.tsx e api/webhook-kiwify.ts).
 *
 * Variáveis de ambiente (Kiwify → Apps → API):
 * - KIWIFY_CLIENT_ID e KIWIFY_CLIENT_SECRET: geram o token OAuth.
 * - KIWIFY_ACCOUNT_ID: vai no cabeçalho x-kiwify-account-id de toda chamada.
 */
const API = "https://public-api.kiwify.com/v1";

/** Só os campos da venda (GET /sales/{id}) que o webhook usa. */
export type KiwifySale = {
  id: string;
  /** "paid" quando aprovada; outros: "waiting_payment", "refused", "refunded", "chargedback"... */
  status: string;
  customer?: { name?: string; email?: string };
  payment?: {
    /** Preço da oferta, sem juros, em centavos. */
    product_base_price?: number;
    /** O que o comprador pagou (com juros do parcelamento), em centavos. */
    charge_amount?: number;
  };
};

type Credentials = { clientId: string; clientSecret: string; accountId: string };

export function kiwifyCredentials(): Credentials | null {
  const clientId = process.env.KIWIFY_CLIENT_ID;
  const clientSecret = process.env.KIWIFY_CLIENT_SECRET;
  const accountId = process.env.KIWIFY_ACCOUNT_ID;
  return clientId && clientSecret && accountId ? { clientId, clientSecret, accountId } : null;
}

/**
 * Consulta a venda na API. null = não existe (ex.: o "testar webhook" do
 * painel manda um id fictício); lança erro em falha de rede/autenticação,
 * para o webhook responder 500 e a Kiwify tentar de novo.
 */
/*
 * A Kiwify pede para não gerar um token a cada chamada (ele vale 96h). Uma
 * função serverless só guarda estado enquanto a instância está "quente", então
 * este cache evita a maior parte das gerações sem precisar de banco.
 */
let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(creds: Credentials): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const auth = await fetch(`${API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: creds.clientId, client_secret: creds.clientSecret }),
  });
  if (!auth.ok) throw new Error(`OAuth da Kiwify falhou: ${auth.status} ${await auth.text()}`);
  const { access_token, expires_in } = await auth.json();
  cachedToken = { value: access_token, expiresAt: Date.now() + (Number(expires_in) || 3600) * 1000 };
  return access_token;
}

export async function fetchKiwifySale(saleId: string, creds: Credentials): Promise<KiwifySale | null> {
  const access_token = await accessToken(creds);
  const res = await fetch(`${API}/sales/${encodeURIComponent(saleId)}`, {
    headers: { Authorization: `Bearer ${access_token}`, "x-kiwify-account-id": creds.accountId },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Consulta da venda ${saleId} falhou: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * O formato do corpo do webhook não está na documentação pública; o id da
 * venda é procurado nos nomes em que ele costuma vir. Só serve para saber o
 * que consultar: nada do corpo é usado como verdade.
 */
export function findSaleId(body: unknown): string | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const nested = (key: string) => (b[key] ?? {}) as Record<string, unknown>;
  const candidates = [b.order_id, b.sale_id, nested("Order").order_id, nested("order").id, b.id];
  const id = candidates.find((v) => typeof v === "string" && v.trim());
  return typeof id === "string" ? id.trim() : null;
}

/**
 * As duas ofertas (AO VIVO e AO VIVO + GRAVAÇÃO) são do mesmo produto na
 * Kiwify, então o ingresso sai do preço base, que é igual ao do site.
 */
export function productFromBasePrice(cents: number | undefined): Product | undefined {
  if (typeof cents !== "number") return undefined;
  return Object.values(PRODUCTS).find((p) => Math.round(p.price * 100) === cents);
}
