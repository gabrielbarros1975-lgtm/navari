import { Course, CourseTrack, Workshop } from "@/types";

export const mockNextLive = {
  id: "live-1",
  title: "Live: Atualizações do Registro de Imóveis em 2026",
  startsAt: "2026-02-10T19:00:00-03:00",
  durationMinutes: 90,
  host: "Dr. Wyllian Nava",
  joinUrl: "https://meet.google.com/",
};

// TODO: preencher data, preço e links de checkout do Mercado Pago antes de divulgar.
export const mockWorkshop: Workshop = {
  id: "workshop-incorporacao-1",
  title: "Incorporação Imobiliária: da prenotação ao registro",
  subtitle:
    "“Um dia inteiro de imersão prática para você compreender como as peças se encaixam e desenvolver uma visão mais segura da incorporação imobiliária sob a perspectiva do Registro de Imóveis.”",
  whyText:
    "A incorporação imobiliária reúne aspectos jurídicos, registrais, documentais e técnicos que precisam dialogar entre si; contratos, construção e uma série de exigências que, na prática, podem transformar um procedimento aparentemente simples em um verdadeiro desafio.",
  whyParagraphs: [
    "A incorporação imobiliária reúne aspectos jurídicos, registrais, documentais e técnicos que precisam dialogar entre si; contratos, construção e uma série de exigências que, na prática, podem transformar um procedimento aparentemente simples em um verdadeiro desafio.",
    "E é justamente por isso que esta imersão foi pensada.",
    "Em mais de 4 horas de aula, você terá uma visão ampla, organizada e prática da incorporação imobiliária sob a perspectiva do Registro de Imóveis, compreendendo o caminho que começa na análise do imóvel e chega ao registro do memorial de incorporação.",
    "Você vai compreender o que acontece quando uma incorporação chega à serventia, quais são os principais documentos envolvidos, o que precisa ser analisado, onde estão os pontos mais sensíveis da qualificação e quais são as principais questões que costumam gerar dúvidas entre os profissionais que atuam nessa área.",
    "Compreender como esses elementos são analisados no Registro de Imóveis permite enxergar o procedimento para além da legislação e aproximar a teoria daquilo que efetivamente acontece na qualificação registral.",
  ],
  whyHighlights: [
    "Não é uma aula para simplesmente percorrer os artigos da Lei de Incorporações.",
    "É uma aula para entender como as peças se encaixam.",
  ],
  learningTopics: [
    "O que caracteriza uma incorporação imobiliária e quando ela é necessária?",
    "Quem pode atuar como incorporador e quais cuidados devem ser observados na análise de sua legitimidade?",
    "O que o Registro de Imóveis precisa verificar antes mesmo de começar a analisar os documentos do art. 32?",
    "Como analisar a matrícula do imóvel que será objeto da incorporação?",
    "Quais são os principais documentos que compõem o memorial de incorporação e qual é a finalidade de cada um?",
    "O que efetivamente deve ser conferido em cada documento?",
    "Como compreender a relação entre matrícula, terreno, projeto, unidades autônomas, áreas comuns e frações ideais?",
    "Como analisar os quadros de áreas e identificar inconsistências que podem repercutir na qualificação registral?",
    "Como lidar com ônus, indisponibilidades, ações e certidões positivas?",
    "A certidão positiva impede o registro da incorporação?",
    "Quais situações realmente constituem óbice ao registro e quais não devem ser transformadas em exigência?",
    "Como estruturar uma qualificação registral segura, objetiva e fundamentada?",
    "Como elaborar uma nota devolutiva que permita ao interessado compreender exatamente o que precisa ser corrigido?",
    "Quais são os erros mais comuns encontrados na documentação de uma incorporação?",
    "O que muda quando existe patrimônio de afetação?",
    "O que acontece depois do registro do memorial de incorporação?",
    "Qual é a diferença entre o registro da incorporação, o condomínio especial sobre frações ideais e a instituição e especificação do condomínio edilício?",
    "O que o profissional precisa saber sobre os atos posteriores e a evolução registral do empreendimento?",
  ],
  materialTitle: "Caderno de Qualificação da Incorporação Imobiliária",
  materialSubtitle:
    "Material prático desenvolvido para acompanhar a Imersão e orientar a análise dos principais pontos da qualificação registral da incorporação imobiliária.",
  materialDescription:
    "Estruturado para ser utilizado durante a aula e também como ferramenta de consulta posterior, o Caderno organiza os pontos de conferência e as relações entre matrícula, memorial, projeto, quadros técnicos, frações ideais, certidões, convenção e demais documentos do procedimento.",
  ebookBadge: "Exclusivo da versão completa",
  ebookIntro: "Receba em primeira mão o novo e-book de Wyllian Nava",
  ebookTitle: "A Incorporação Imobiliária no Registro de Imóveis: um guia prático de qualificação registral",
  ebookDescription:
    "Um material autoral aprofundado, desenvolvido a partir da legislação vigente, da normativa aplicável e da experiência prática na qualificação registral de incorporações imobiliárias.",
  ebookNote:
    "O e-book será posteriormente lançado para venda de forma independente. Os participantes da versão completa da Imersão receberão acesso em primeira mão.",
  targetAudience: [
    "Profissionais de serventias extrajudiciais",
    "Advogados",
    "Incorporadores e construtores",
    "Engenheiros e arquitetos",
    "Corretores de imóveis",
    "Demais profissionais que atuam no mercado imobiliário",
  ],
  targetAudienceNote:
    "Não é necessário ser advogado ou já possuir conhecimento aprofundado em incorporação imobiliária. A proposta desta primeira imersão é oferecer uma compreensão geral e prática do tema sob a perspectiva registral.",
  registrationOpenDate: "07 de setembro de 2026",
  instructor: "Dr. Wyllian Nava",
  instructorCredentials: [
    { text: "Oficial Substituto do 3º Registro de Imóveis de São Luís/MA", instagram: "3risaoluis" },
    { text: "Especialista em Direito Notarial e Registral" },
    {
      text: "Membro consultivo da Comissão de Direito Notarial e Registral da OAB/MA",
      instagram: "notarialeregistraloabma",
    },
    { text: "Membro consultivo da Comissão de Regularização Fundiária da OAB/MA" },
    { text: "Palestrante e professor de diversos cursos na área de Direito Notarial e Registral" },
  ],
  instructorPhotoUrl: "/foto_wyllian.jpeg",
  dateLabel: "Sábado · 17 de outubro de 2026",
  format: "Online · Ao vivo",
  durationLabel: "Manhã 100% prática (aprox. 4h)",
  videoUrl: "https://vimeo.com/1227199151?share=copy&fl=sv&fe=ci",
  agenda: [],
  tiers: [
    {
      id: "ao-vivo",
      name: "AO VIVO",
      originalPrice: 397,
      price: 296.40,
      installmentValue: 24.70,
      installments: 12,
      includes: [
        "Participação na Imersão online e ao vivo",
        "Mais de 8 horas de conteúdo",
        "Interação durante a Imersão",
        "Caderno de Qualificação da Incorporação Imobiliária",
        "Certificado digital de participação",
      ],
      checkoutUrl: null,
    },
    {
      id: "ao-vivo-mais-plataforma",
      name: "AO VIVO + gravação da imersão",
      originalPrice: 450,
      price: 357.60,
      installmentValue: 29.80,
      installments: 12,
      includes: [
        "Tudo o que está incluído na modalidade Ao Vivo",
        "Acesso à gravação da Imersão por 1 ano",
        "E-book “A Incorporação Imobiliária no Registro de Imóveis: um guia prático de qualificação registral”, em primeira mão",
      ],
      checkoutUrl: null,
      highlight: true,
    },
  ],
  faq: [
    {
      question: "A imersão é online ou presencial?",
      answer: "A primeira imersão será realizada online e ao vivo, permitindo a participação de profissionais de qualquer localidade.",
    },
    {
      question: "A aula ficará gravada?",
      answer:
        "Sim. A imersão será gravada. O acesso posterior à gravação estará disponível na modalidade de inscrição que incluir acesso à plataforma.",
    },
    {
      question: "Posso comprar somente a gravação, sem participar ao vivo?",
      answer:
        "Nesta primeira edição, a proposta é priorizar a participação na imersão ao vivo. A eventual disponibilização posterior da gravação para aquisição separada ainda será definida.",
    },
    {
      question: "Haverá certificado?",
      answer: "Sim. Será emitido certificado digital de participação, com a carga horária correspondente à imersão.",
    },
    {
      question: "Preciso ser advogado para acompanhar?",
      answer:
        "Não. A imersão foi pensada para diferentes profissionais que atuam ou possuem interesse na incorporação imobiliária e no Registro de Imóveis.",
    },
    {
      question: "Preciso ter experiência prévia com incorporação imobiliária?",
      answer:
        "Não. A proposta desta primeira imersão é oferecer um panorama geral e prático da incorporação imobiliária sob a perspectiva do Registro de Imóveis, sem exigir conhecimento aprofundado prévio.",
    },
    {
      question: "Quando será realizada a imersão?",
      answer: "A imersão acontecerá no sábado do dia 17 de outubro de 2026.",
    },
    {
      question: "Quando serão abertas as inscrições?",
      answer: "07 de setembro de 2026.",
    },
  ],
};

export const courseTracks: CourseTrack[] = [
  {
    id: "prenotacao-ao-registro",
    label: "Da Prenotação ao Registro",
    description: [
      "Formações práticas para compreender o percurso do título no Registro de Imóveis, desde sua preparação e apresentação até a qualificação e a prática do ato registral.",
      "A proposta desta trilha é oferecer uma visão integrada do procedimento, aproximando a estruturação dos títulos da lógica de quem os recebe e qualifica.",
      "Por isso, ela não é voltada apenas a profissionais externos à serventia. É destinada tanto a quem analisa, prepara, apresenta e acompanha títulos perante o Registro de Imóveis quanto aos profissionais que atuam dentro dos próprios cartórios e desejam compreender o procedimento de ponta a ponta, desde sua origem até o ato final.",
    ],
    highlight: "Compreender o título de ponta a ponta.",
  },
  {
    id: "qualificacao-positiva",
    label: "Qualificação Positiva",
    description: [
      "Formações de aprofundamento na prática da qualificação registral.",
      "Essa trilha é voltada especialmente aos profissionais que atuam dentro do Registro de Imóveis e pretende aprofundar o raciocínio de quem recebe e analisa os títulos, com foco nos pontos de conferência, na fundamentação das exigências e na prática segura dos atos registrais.",
      "Ela não substitui a trilha Da Prenotação ao Registro nem significa que o profissional da serventia precise optar por uma ou outra.",
      "O objetivo é justamente que a Da Prenotação ao Registro ofereça a compreensão integral do percurso e que a Qualificação Positiva represente um aprofundamento da etapa central desse caminho: a qualificação registral propriamente dita.",
      "E “Qualificação Positiva” não significa qualificar para necessariamente admitir o título, mas desenvolver uma qualificação técnica, segura, fundamentada e orientada à correta solução registral, inclusive quando houver necessidade de formulação de exigências.",
    ],
  },
];

export const mockCourses: Course[] = [
  // Trilha 1 — Da Prenotação ao Registro
  {
    id: "c-imersao-incorporacao",
    title: "Incorporação Imobiliária: da Prenotação ao Registro",
    description:
      "Uma formação prática para compreender a incorporação imobiliária sob a perspectiva do Registro de Imóveis, percorrendo a documentação, a prenotação, a qualificação e o registro do memorial de incorporação.",
    category: "Da Prenotação ao Registro",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Imersão ao vivo",
    externalHref: "/#inscricao",
    ctaLabel: "Conhecer a Imersão",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-usucapiao-prenotacao",
    title: "Usucapião Extrajudicial: da Prenotação ao Registro",
    description:
      "Uma abordagem prática da documentação, da estruturação do procedimento e dos principais pontos de análise que repercutem na qualificação e no registro da usucapião extrajudicial.",
    category: "Da Prenotação ao Registro",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-retificacao-prenotacao",
    title: "Retificação Administrativa: da Prenotação à Averbação",
    description:
      "Uma visão prática do processamento da retificação administrativa, desde a preparação do requerimento e da documentação técnica até a qualificação e a averbação no Registro de Imóveis.",
    category: "Da Prenotação ao Registro",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-inventario-prenotacao",
    title: "Inventário e Partilha: da Prenotação ao Registro",
    description:
      "Preparação, conferência e ingresso dos títulos sucessórios no Registro de Imóveis, com atenção aos principais pontos que repercutem na qualificação e no registro da transmissão.",
    category: "Da Prenotação ao Registro",
    instructor: "Dr. Wyllian Nava e convidado especial",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  // Trilha 2 — Qualificação Positiva
  {
    id: "c-fundamentos-qualificacao",
    title: "Registro de Imóveis: Fundamentos e Prática",
    description:
      "Formação de base sobre os princípios, títulos, procedimentos e fundamentos essenciais à prática da qualificação no Registro de Imóveis.",
    category: "Qualificação Positiva",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-incorporacao-qualificacao",
    title: "Incorporação Imobiliária no Registro de Imóveis",
    description:
      "Análise documental, conferência cruzada das peças, qualificação registral, principais pontos de conferência, exigências e prática dos atos relacionados à incorporação imobiliária.",
    category: "Qualificação Positiva",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-usucapiao-qualificacao",
    title: "Processamento da Usucapião Extrajudicial no Registro de Imóveis",
    description:
      "Análise documental, qualificação registral, principais pontos de conferência, exigências e prática do processamento da usucapião no Registro de Imóveis.",
    category: "Qualificação Positiva",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-retificacao-qualificacao",
    title: "Processamento da Retificação Administrativa no Registro de Imóveis",
    description:
      "Análise do requerimento, documentação técnica, legitimidade, confrontações, notificações e principais etapas da qualificação do processamento de retificação.",
    category: "Qualificação Positiva",
    instructor: "Dr. Wyllian Nava",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
  {
    id: "c-inventario-qualificacao",
    title: "Inventário e Partilha no Registro de Imóveis",
    description:
      "Qualificação dos títulos sucessórios, continuidade, disponibilidade, quinhões e principais questões relacionadas ao registro da transmissão imobiliária.",
    category: "Qualificação Positiva",
    instructor: "Dr. Wyllian Nava e convidado especial",
    duration: "A definir",
    comingSoon: true,
    statusLabel: "Em desenvolvimento",
    hideMeta: true,
    modules: [],
  },
];
