import { Link } from "react-router-dom";
import { LegalPage } from "@/components/LegalPage";
import { COMPANY } from "@/data/company";

/*
 * Rascunho redigido a partir do que o site realmente faz (formulário de
 * inscrição, Mercado Pago, Supabase, Resend, Vercel, Vimeo, Google Fonts e
 * Meet). Deve ser revisado por um advogado. Se o site passar a usar
 * analytics, pixel de anúncio ou e-mail de marketing, esta página precisa
 * mudar junto.
 */
const PrivacyPolicy = () => (
  <LegalPage title="Política de Privacidade" updatedAt="24 de setembro de 2026">
    <p>
      Esta política explica quais dados pessoais coletamos neste site, para que os usamos, com quem
      os compartilhamos e como você pode exercer os seus direitos, conforme a Lei Geral de Proteção
      de Dados (Lei nº 13.709/2018, LGPD).
    </p>

    <h2>1. Quem é o responsável pelos seus dados</h2>
    <p>
      O controlador dos dados é <strong>{COMPANY.legalName}</strong>, inscrita no CNPJ sob o nº{" "}
      {COMPANY.cnpj}, responsável pela marca {COMPANY.brand}. Para qualquer assunto sobre os seus
      dados, fale conosco pelo e-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> ou pelo
      WhatsApp{" "}
      <a href={COMPANY.whatsappUrl} target="_blank" rel="noreferrer">
        {COMPANY.whatsappLabel}
      </a>
      .
    </p>

    <h2>2. Quais dados coletamos</h2>
    <ul>
      <li>
        <strong>Na inscrição:</strong> seu nome completo e seu e-mail, informados no formulário antes
        do pagamento.
      </li>
      <li>
        <strong>No pagamento:</strong> os dados de pagamento (número do cartão, CPF do titular, dados
        do Pix ou do boleto) são digitados diretamente no ambiente do Mercado Pago. Nós não recebemos
        nem armazenamos o número do seu cartão. Do Mercado Pago recebemos apenas a situação do
        pagamento (aprovado, pendente ou recusado), o valor e o ingresso comprado.
      </li>
      <li>
        <strong>Dados técnicos:</strong> para prevenir fraudes, o site carrega um script de segurança
        do Mercado Pago, que gera um identificador do seu dispositivo usado pelo próprio Mercado Pago
        na análise do pagamento. Além disso, os provedores de hospedagem registram dados técnicos de
        acesso, como endereço IP, data e hora.
      </li>
    </ul>

    <h2>3. Para que usamos os seus dados</h2>
    <ul>
      <li>
        Confirmar a sua inscrição e enviar o e-mail com os dados de acesso à Imersão (execução de
        contrato, art. 7º, V, da LGPD).
      </li>
      <li>
        Emitir o seu certificado de participação com o nome informado na inscrição (execução de
        contrato).
      </li>
      <li>Prestar atendimento e enviar avisos sobre o evento, como mudanças de horário (execução de contrato).</li>
      <li>Prevenir fraudes e proteger o pagamento (legítimo interesse, art. 7º, IX).</li>
      <li>
        Cumprir obrigações legais e fiscais, como emissão de nota fiscal e atendimento a autoridades
        (obrigação legal, art. 7º, II).
      </li>
    </ul>
    <p>
      Não vendemos seus dados e não os usamos para publicidade de terceiros. Não enviamos
      comunicações de marketing sem o seu consentimento.
    </p>

    <h2>4. Com quem compartilhamos</h2>
    <p>
      Compartilhamos dados apenas com os fornecedores necessários para o site e a Imersão
      funcionarem, que os tratam em nosso nome:
    </p>
    <ul>
      <li>
        <strong>Mercado Pago:</strong> processamento do pagamento, prevenção a fraudes e imagens das
        bandeiras de cartão exibidas no site.
      </li>
      <li><strong>Vercel:</strong> hospedagem do site.</li>
      <li><strong>Supabase:</strong> armazenamento dos dados da inscrição.</li>
      <li><strong>Resend:</strong> envio do e-mail de confirmação.</li>
      <li><strong>Google:</strong> sala da Imersão (Google Meet) e fontes usadas no site.</li>
      <li><strong>Vimeo:</strong> exibição do vídeo de apresentação.</li>
    </ul>
    <p>
      Alguns desses fornecedores armazenam dados em servidores fora do Brasil. Nesses casos, a
      transferência segue o que a LGPD permite para a execução do contrato e com fornecedores que
      adotam medidas de segurança adequadas. Também podemos compartilhar dados com autoridades quando
      a lei exigir.
    </p>

    <h2>5. Por quanto tempo guardamos</h2>
    <p>
      Mantemos os dados da inscrição enquanto forem necessários para as finalidades acima e pelos
      prazos exigidos em lei, como os de natureza fiscal e de defesa do consumidor. Depois disso, os
      dados são excluídos ou anonimizados.
    </p>

    <h2>6. Cookies e tecnologias semelhantes</h2>
    <p>
      Este site não usa cookies de publicidade nem ferramentas de rastreamento de navegação. O script
      de segurança do Mercado Pago e o player do Vimeo podem guardar informações técnicas no seu
      navegador para funcionar e prevenir fraudes. O vídeo é carregado com a opção de não
      rastreamento do Vimeo.
    </p>

    <h2>7. Seus direitos</h2>
    <p>Pela LGPD (art. 18), você pode, a qualquer momento:</p>
    <ul>
      <li>confirmar se tratamos seus dados e ter acesso a eles;</li>
      <li>corrigir dados incompletos, inexatos ou desatualizados, como o nome do certificado;</li>
      <li>pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos;</li>
      <li>pedir a portabilidade dos seus dados;</li>
      <li>saber com quem compartilhamos seus dados;</li>
      <li>revogar um consentimento que tenha dado.</li>
    </ul>
    <p>
      Para exercer esses direitos, escreva para{" "}
      <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Respondemos em até 15 dias. Alguns
      dados podem precisar ser mantidos para cumprir obrigações legais. Você também pode apresentar
      reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
    </p>

    <h2>8. Segurança</h2>
    <p>
      O site usa conexão criptografada (HTTPS), o acesso aos dados da inscrição é restrito e o
      pagamento acontece no ambiente do Mercado Pago. Nenhum sistema é totalmente imune a incidentes;
      se algum ocorrer e puder causar risco a você, vamos avisá-lo e comunicar a ANPD, como exige a
      lei.
    </p>

    <h2>9. Alterações desta política</h2>
    <p>
      Podemos atualizar esta política para refletir mudanças no site ou na lei. A data da última
      atualização fica no topo da página. Veja também os nossos{" "}
      <Link to="/termos-de-compra">Termos de Compra e Reembolso</Link>.
    </p>
  </LegalPage>
);

export default PrivacyPolicy;
