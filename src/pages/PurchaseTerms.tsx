import { Link } from "react-router-dom";
import { LegalPage } from "@/components/LegalPage";
import { COMPANY } from "@/data/company";

/*
 * Rascunho para revisão de um advogado. O prazo de 7 dias e o reembolso
 * integral vêm do Código de Defesa do Consumidor (art. 49) e não podem ser
 * reduzidos. Já a regra depois dos 7 dias (sem reembolso, salvo cancelamento
 * ou remarcação pela organização) é decisão do negócio e pode mudar.
 */
const PurchaseTerms = () => (
  <LegalPage title="Termos de Compra e Reembolso" updatedAt="25 de setembro de 2026">
    <p>
      Estes termos valem para a compra de ingressos da Imersão em Incorporação Imobiliária no
      Registro de Imóveis: da Prenotação ao Registro, organizada por{" "}
      <strong>{COMPANY.legalName}</strong> (CNPJ {COMPANY.cnpj}), responsável pela marca{" "}
      {COMPANY.brand}. Ao concluir a compra, você declara que leu e concorda com eles.
    </p>

    <h2>1. A Imersão</h2>
    <ul>
      <li><strong>Data:</strong> sábado, 17 de outubro de 2026.</li>
      <li><strong>Horário:</strong> início às 08h30 (horário de Brasília), com a sala aberta a partir das 08h15.</li>
      <li><strong>Formato:</strong> online e ao vivo, pelo Google Meet.</li>
    </ul>
    <p>
      O que cada ingresso inclui e o seu valor são os informados na página de inscrição no momento da
      compra.
    </p>

    <h2>2. Pagamento</h2>
    <p>
      O pagamento é processado pelo Mercado Pago, por Pix, cartão de crédito ou boleto. No cartão, o
      parcelamento tem juros cobrados pelo Mercado Pago, e o valor de cada parcela aparece antes de
      você confirmar o pagamento. A inscrição só é confirmada depois que o pagamento é aprovado: Pix e
      cartão costumam ser aprovados na hora, e o boleto pode levar até 3 dias úteis para ser
      compensado.
    </p>
    <p>
      Se o pagamento com cartão for recusado no Mercado Pago, você pode concluir a compra pela
      Kiwify, outra plataforma de pagamento, pelo mesmo valor e com parcelamento em até 12x (com
      juros). Nesse caso, também valem os termos de compra da Kiwify.
    </p>

    <h2>3. Acesso à Imersão</h2>
    <p>
      Com o pagamento aprovado, enviamos para o e-mail informado na inscrição a confirmação e o link
      da sala. Se não receber em até 1 hora, confira a caixa de spam e fale conosco. O acesso é
      individual: não compartilhe o link da sala.
    </p>
    <p>
      Quem comprou o ingresso com gravação terá acesso à gravação da Imersão pelo período informado
      na página de inscrição.
    </p>

    <h2>4. Direito de arrependimento: 7 dias</h2>
    <p>
      Você pode desistir da compra em até <strong>7 dias corridos</strong> contados da confirmação do
      pagamento, sem precisar justificar, e recebe de volta o valor integral pago (art. 49 do Código de
      Defesa do Consumidor).
    </p>
    <p>
      Para pedir, envie uma mensagem para{" "}
      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> ou pelo WhatsApp{" "}
      <a href={COMPANY.whatsappUrl} target="_blank" rel="noreferrer">
        {COMPANY.whatsappLabel}
      </a>{" "}
      com o seu nome e o e-mail usado na compra.
    </p>
    <p>
      O reembolso é feito pela plataforma em que você pagou (Mercado Pago ou Kiwify), pelo mesmo
      meio de pagamento sempre que possível. No
      cartão de crédito, o estorno aparece na fatura conforme o prazo da operadora, o que pode levar
      até duas faturas.
    </p>

    <h2>5. Depois dos 7 dias</h2>
    <p>
      Passado o prazo de arrependimento, não há reembolso, exceto nos casos do item 6.
    </p>

    <h2>6. Cancelamento ou remarcação pela organização</h2>
    <p>
      Se a Imersão for cancelada, você recebe o valor integral de volta. Se for remarcada, avisamos
      pelo e-mail da inscrição, e você pode escolher entre manter o ingresso para a nova data ou pedir
      o reembolso integral.
    </p>

    <h2>7. Certificado</h2>
    <p>
      O certificado digital de participação é emitido com o nome completo informado na inscrição.
      Se precisar corrigir o nome, fale conosco antes da data da Imersão.
    </p>

    <h2>8. Direitos autorais</h2>
    <p>
      Todo o conteúdo da Imersão (aulas, materiais e gravação) é protegido pela Lei de Direitos
      Autorais (Lei nº 9.610/1998). É proibido gravar, reproduzir, distribuir ou vender o conteúdo sem
      autorização por escrito.
    </p>

    <h2>9. Contato e dados da empresa</h2>
    <p>
      {COMPANY.legalName}, CNPJ {COMPANY.cnpj}, {COMPANY.city}. E-mail:{" "}
      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. WhatsApp:{" "}
      <a href={COMPANY.whatsappUrl} target="_blank" rel="noreferrer">
        {COMPANY.whatsappLabel}
      </a>
      .
    </p>
    <p>
      Estes termos seguem a legislação brasileira, em especial o Código de Defesa do Consumidor. O
      tratamento dos seus dados está descrito na nossa{" "}
      <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
    </p>
  </LegalPage>
);

export default PurchaseTerms;
