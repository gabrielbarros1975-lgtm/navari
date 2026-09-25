import { afterEach, describe, expect, it, vi } from "vitest";
import { phaseFromStatus, reasonFromDetail } from "../../api/_payment-status";
import { GET } from "../../api/payment-status";

describe("situação do pagamento", () => {
  it("agrupa os status do Mercado Pago nas três telas", () => {
    expect(phaseFromStatus("approved")).toBe("aprovado");
    for (const s of ["pending", "in_process", "authorized", undefined]) expect(phaseFromStatus(s)).toBe("pendente");
    for (const s of ["rejected", "cancelled", "refunded", "charged_back"]) expect(phaseFromStatus(s)).toBe("recusado");
  });

  it("só explica recusas que o comprador consegue resolver", () => {
    expect(reasonFromDetail("cc_rejected_insufficient_amount")).toContain("limite");
    expect(reasonFromDetail("expired")).toContain("expirou");
    expect(reasonFromDetail("cc_rejected_high_risk")).toBeNull();
    expect(reasonFromDetail(undefined)).toBeNull();
  });
});

describe("GET /api/payment-status", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  const call = (id: string) => GET(new Request(`https://site/api/payment-status?payment_id=${id}`));

  it("recusa id fora do formato sem consultar o Mercado Pago", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await call("abc")).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("devolve só fase, forma, ingresso e motivo, sem dados do comprador", async () => {
    vi.stubEnv("MP_ACCESS_TOKEN", "APP_USR-teste");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          status: "rejected",
          status_detail: "cc_rejected_insufficient_amount",
          payment_type_id: "credit_card",
          external_reference: "ao-vivo",
          payer: { email: "segredo@example.com" },
        }),
      ),
    );
    const res = await call("179589862631");
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    const body = await res.json();
    expect(body).toEqual({
      phase: "recusado",
      method: "credit_card",
      tier: "ao-vivo",
      reason: "O cartão não tem limite suficiente para esta compra.",
    });
    expect(JSON.stringify(body)).not.toContain("segredo");
  });
});
