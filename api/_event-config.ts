/**
 * Dados do evento usados no e-mail de acesso (ver api/_email.ts). Centralizado
 * aqui para não precisar mexer na lógica do webhook quando esses dados
 * mudarem — por exemplo, assim que a Google Meet for assinada.
 */
export const EVENT = {
  title: "Imersão em Incorporação Imobiliária no Registro de Imóveis: da Prenotação ao Registro",
  dateLabel: "sábado, 17 de outubro de 2026",
  startLabel: "08h30, horário de Brasília",
  roomOpenLabel: "08h15min",
  formatLabel: "online, ao vivo",
  // Link de teste, usado para validar o fluxo de e-mail. TODO: substituir
  // pelo link definitivo depois de assinar o Google Meet.
  meetLink: "https://meet.google.com/jix-unpj-veb",
  // Também é o reply-to do e-mail de acesso: o domínio
  // navaregistrodeimoveis.com.br não tem MX, então uma resposta ao remetente
  // (EMAIL_FROM) voltaria com erro.
  supportEmail: "navaregistrodeimoveis@gmail.com",
};
