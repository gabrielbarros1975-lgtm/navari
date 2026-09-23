/**
 * Dados do evento usados no e-mail de acesso (ver api/_email.ts). Centralizado
 * aqui para não precisar mexer na lógica do webhook quando esses dados
 * mudarem — por exemplo, assim que a Google Meet for assinada.
 */
export const EVENT = {
  dateLabel: "sábado, 17 de outubro de 2026",
  // TODO: confirmar o horário exato de início com a equipe e preencher aqui.
  timeLabel: "horário a confirmar (fique de olho no seu e-mail nos dias anteriores)",
  // TODO: substituir pelo link real depois de assinar o Google Meet.
  meetLink: "https://meet.google.com/PENDENTE-assinar-google-meet",
  // TODO: confirmar o e-mail de suporte/contato real antes de enviar em produção.
  supportEmail: "PENDENTE@navaregistrodeimoveis.com.br",
};
