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
 *
 * O e-mail (`to`) precisa vir de quem chama esta função (hoje, do que foi
 * gravado no Supabase em api/checkout.ts) — a order da Mercado Pago não é
 * confiável para isso: em pagamentos por Pix ela não trouxe nenhum dado de
 * payer de volta.
 *
 * Retorna true se o envio foi aceito pelo Resend, para o chamador só marcar
 * "e-mail enviado" quando isso realmente aconteceu.
 */
export async function sendAccessEmail(
  to: string,
  order: { id: string; external_reference?: string },
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn("E-mail de acesso não enviado: RESEND_API_KEY ou EMAIL_FROM não configurados.");
    return false;
  }

  const includesRecording = order.external_reference === "ao-vivo-mais-plataforma";
  // Só para quem comprou a modalidade com gravação: o texto aprovado pela
  // equipe é o mesmo para os dois ingressos e não menciona o que é exclusivo.
  const recordingNote =
    "Como você garantiu a modalidade com gravação, também terá acesso à gravação da Imersão por 1 ano e ao e-book em primeira mão. Mais informações chegarão por e-mail próximo à data.";

  const subject = "Sua vaga está confirmada — Imersão Incorporação Imobiliária";

  const details: [string, string][] = [
    ["Data", EVENT.dateLabel],
    ["Início", EVENT.startLabel],
    ["Abertura da sala", EVENT.roomOpenLabel],
    ["Formato", EVENT.formatLabel],
    ["Acesso", EVENT.meetLink],
  ];

  const text = [
    "Olá!\nSua vaga está confirmada!",
    `Seu pagamento foi confirmado e sua inscrição na ${EVENT.title} está garantida.`,
    details.map(([label, value]) => `${label}: ${value}`).join("\n"),
    includesRecording && recordingNote,
    "Recomendamos que você entre alguns minutos antes para conferir sua conexão e o áudio.",
    "Nos vemos na imersão!",
    "Wyllian Nava",
    `Qualquer dúvida, responde este e-mail ou fale conosco em ${EVENT.supportEmail}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const detailRows = details
    .map(([label, value]) => {
      const cell = label === "Acesso" ? `<a href="${value}">${value}</a>` : value;
      return `<tr><td style="padding: 4px 12px 4px 0; color: #6b7280; white-space: nowrap;">${label}</td><td>${cell}</td></tr>`;
    })
    .join("");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1f2933; line-height: 1.5;">
      <p>Olá!</p>
      <h1 style="font-size: 20px; margin: 0 0 16px;">Sua vaga está confirmada!</h1>
      <p>Seu pagamento foi confirmado e sua inscrição na <strong>${EVENT.title}</strong> está garantida.</p>
      <table style="margin: 16px 0; border-collapse: collapse;">${detailRows}</table>
      ${includesRecording ? `<p>${recordingNote}</p>` : ""}
      <p>Recomendamos que você entre alguns minutos antes para conferir sua conexão e o áudio.</p>
      <p>Nos vemos na imersão!</p>
      <p>Wyllian Nava</p>
      <p style="color: #6b7280; font-size: 14px;">
        Qualquer dúvida, responde este e-mail ou fale conosco em
        <a href="mailto:${EVENT.supportEmail}">${EVENT.supportEmail}</a>
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
    // Respostas vão para o contato: o domínio do remetente não recebe e-mail.
    body: JSON.stringify({ from, to, reply_to: EVENT.supportEmail, subject, text, html }),
  });

  if (!response.ok) {
    console.error("Falha ao enviar e-mail de acesso:", response.status, await response.text());
    return false;
  }
  return true;
}
