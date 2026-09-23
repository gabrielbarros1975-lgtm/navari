import { PRODUCTS } from "./_products.js";
import { EVENT } from "./_event-config.js";

/**
 * Envia o e-mail de acesso quando uma order é confirmada (ver api/webhook.ts).
 *
 * Variáveis de ambiente:
 * - RESEND_API_KEY: chave de API criada em resend.com.
 * - EMAIL_FROM: remetente, ex. "Dr. Wyllian Nava <imersao@seudominio.com.br>".
 *   Precisa ser um domínio verificado no Resend, senão o envio falha.
 *
 * Não lança erro se o envio falhar: só loga. O webhook já respondeu 200 pra
 * Mercado Pago nesse ponto, então falhar aqui não deve fazê-la reenviar a
 * notificação (o pagamento já foi confirmado; só o e-mail que não saiu).
 */
export async function sendAccessEmail(order: {
  id: string;
  external_reference?: string;
  payer?: { email?: string };
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = order.payer?.email;

  if (!apiKey || !from) {
    console.warn("E-mail de acesso não enviado: RESEND_API_KEY ou EMAIL_FROM não configurados.");
    return;
  }
  if (!to) {
    console.warn("E-mail de acesso não enviado: order", order.id, "sem e-mail do comprador.");
    return;
  }

  const product = order.external_reference ? PRODUCTS[order.external_reference] : undefined;
  const includesRecording = order.external_reference === "ao-vivo-mais-plataforma";

  const subject = "Sua vaga está confirmada — Imersão Incorporação Imobiliária";

  const text = [
    "Olá!",
    "",
    `Seu pagamento foi confirmado para: ${product?.title ?? "Imersão Incorporação Imobiliária"}.`,
    "",
    `Data: ${EVENT.dateLabel}`,
    `Horário: ${EVENT.timeLabel}`,
    `Link de acesso (Google Meet): ${EVENT.meetLink}`,
    "",
    includesRecording
      ? "Como você garantiu a modalidade com gravação, você também terá acesso à gravação da Imersão por 1 ano e ao e-book em primeira mão — mais informações chegarão por e-mail próximo à data."
      : "",
    "Chegue com alguns minutos de antecedência para testar áudio e vídeo.",
    "",
    `Qualquer dúvida, responda este e-mail ou fale com a gente em ${EVENT.supportEmail}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1f2933;">
      <h1 style="font-size: 20px;">Sua vaga está confirmada!</h1>
      <p>Olá!</p>
      <p>Seu pagamento foi confirmado para:</p>
      <p style="font-weight: bold;">${product?.title ?? "Imersão Incorporação Imobiliária"}</p>
      <table style="margin: 16px 0; border-collapse: collapse;">
        <tr><td style="padding: 4px 12px 4px 0; color: #6b7280;">Data</td><td>${EVENT.dateLabel}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b7280;">Horário</td><td>${EVENT.timeLabel}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #6b7280;">Acesso</td><td><a href="${EVENT.meetLink}">${EVENT.meetLink}</a></td></tr>
      </table>
      ${
        includesRecording
          ? `<p>Como você garantiu a modalidade com gravação, você também terá acesso à gravação da Imersão por 1 ano e ao e-book em primeira mão — mais informações chegarão próximo à data.</p>`
          : ""
      }
      <p>Chegue com alguns minutos de antecedência para testar áudio e vídeo.</p>
      <p style="color: #6b7280; font-size: 14px;">
        Qualquer dúvida, responda este e-mail ou fale com a gente em
        <a href="mailto:${EVENT.supportEmail}">${EVENT.supportEmail}</a>.
      </p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Evita reenvio duplicado se o webhook da Mercado Pago repetir a notificação.
      "Idempotency-Key": `order-access-email-${order.id}`,
    },
    body: JSON.stringify({ from, to, subject, text, html }),
  });

  if (!response.ok) {
    console.error("Falha ao enviar e-mail de acesso:", response.status, await response.text());
  }
}
