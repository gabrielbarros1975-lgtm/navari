import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { findSaleId, productFromBasePrice } from "../../api/_kiwify";
import { POST } from "../../api/webhook-kiwify";

describe("Kiwify: auxiliares", () => {
  it("acha o id da venda nos formatos de corpo conhecidos", () => {
    expect(findSaleId({ order_id: "abc" })).toBe("abc");
    expect(findSaleId({ Order: { order_id: "def" } })).toBe("def");
    expect(findSaleId({ id: " ghi " })).toBe("ghi");
    expect(findSaleId({})).toBeNull();
    expect(findSaleId(null)).toBeNull();
  });

  it("identifica o ingresso pelo preço base em centavos", () => {
    expect(productFromBasePrice(29640)?.id).toBe("ao-vivo");
    expect(productFromBasePrice(35760)?.id).toBe("ao-vivo-mais-plataforma");
    expect(productFromBasePrice(12345)).toBeUndefined();
    expect(productFromBasePrice(undefined)).toBeUndefined();
  });
});

describe("Kiwify: webhook", () => {
  const sent: { to?: string; text?: string }[] = [];

  function mockKiwify(sale: object | null) {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        if (url.endsWith("/oauth/token")) return Response.json({ access_token: "t" });
        if (url.includes("/sales/")) return sale ? Response.json(sale) : new Response(null, { status: 404 });
        if (url.includes("api.resend.com")) {
          sent.push(JSON.parse(String(init?.body)));
          return Response.json({ id: "email" });
        }
        throw new Error(`fetch inesperado: ${url}`);
      }),
    );
  }

  const call = (body: object) =>
    POST(new Request("https://site/api/webhook-kiwify", { method: "POST", body: JSON.stringify(body) }));

  beforeEach(() => {
    sent.length = 0;
    vi.stubEnv("KIWIFY_CLIENT_ID", "id");
    vi.stubEnv("KIWIFY_CLIENT_SECRET", "secret");
    vi.stubEnv("KIWIFY_ACCOUNT_ID", "conta");
    vi.stubEnv("RESEND_API_KEY", "re_teste");
    vi.stubEnv("EMAIL_FROM", "Teste <teste@example.com>");
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("venda paga manda o e-mail de acesso do ingresso certo", async () => {
    mockKiwify({
      id: "venda-1",
      status: "paid",
      customer: { name: "Maria da Silva", email: "maria@example.com" },
      payment: { product_base_price: 35760, charge_amount: 43676 },
    });
    const res = await call({ order_id: "venda-1", webhook_event_type: "order_approved" });
    expect(res.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].to).toBe("maria@example.com");
    // AO VIVO + GRAVAÇÃO: o e-mail leva o parágrafo da gravação.
    expect(sent[0].text).toContain("modalidade com gravação");
  });

  it("venda não paga não manda e-mail", async () => {
    mockKiwify({ id: "venda-2", status: "waiting_payment", customer: { email: "a@b.co" }, payment: { product_base_price: 29640 } });
    expect((await call({ order_id: "venda-2" })).status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("venda inexistente (teste do painel) responde 200 sem e-mail", async () => {
    mockKiwify(null);
    expect((await call({ order_id: "fake" })).status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("sem credenciais responde 500 para a Kiwify tentar de novo", async () => {
    vi.stubEnv("KIWIFY_CLIENT_ID", "");
    mockKiwify(null);
    expect((await call({ order_id: "venda-3" })).status).toBe(500);
  });
});
