import { Course, Workshop } from "@/types";

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
    "“Uma manhã 100% prática desenhada para você entender como as peças se encaixam e eliminar a insegurança na hora de protocolizar a sua incorporação.”",
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
  materialTitle: "A Incorporação Imobiliária no Registro de Imóveis: um guia prático de qualificação registral",
  materialSubtitle: "Atualizado conforme a legislação vigente, as normas do CNJ e do TJMA e a jurisprudência administrativa.",
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
  instructorPhotoUrl: "/wyllian.jpg",
  dateLabel: "Sábado · 17 de outubro de 2026",
  format: "Online · Ao vivo",
  durationLabel: "Manhã 100% prática (aprox. 4h)",
  videoUrl: null,
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
        "Participação na imersão online e ao vivo",
        "Interação durante a imersão",
        "Material didático digital",
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
        "Acesso posterior à gravação da imersão pelo período de 1 ano",
        "Acesso ao material exclusivo utilizado na imersão",
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

export const mockCourses: Course[] = [
  {
    id: "4",
    title: "Incorporação Imobiliária",
    description:
      "Curso baseado na imersão ao vivo com o Dr. Wyllian Nava, com o conteúdo completo do registro de incorporações imobiliárias.",
    category: "Incorporação Imobiliária",
    instructor: "Dr. Wyllian Nava",
    duration: "10h 20min",
    // Ainda não é vendido separado: por enquanto, o conteúdo só existe via a imersão ao vivo.
    comingSoon: true,
    // TODO: confirmar o preço quando o curso gravado for publicado.
    price: 497,
    installments: 12,
    progress: 0,
    modules: [
      {
        id: "m7",
        title: "Conceitos Básicos",
        lessons: [
          { id: "l16", title: "O que é Incorporação", duration: "30min", videoUrl: null, completed: true },
          { id: "l17", title: "Memorial de Incorporação", duration: "45min", videoUrl: null, completed: false },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Registro de Imóveis: Fundamentos e Prática",
    description: "Aprenda os fundamentos do registro de imóveis, desde a matrícula até os procedimentos de averbação e registro.",
    category: "Registro de Imóveis",
    instructor: "Dr. Wyllian Nava",
    duration: "12h 30min",
    comingSoon: true,
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Introdução ao Registro de Imóveis",
        lessons: [
          { id: "l1", title: "História e Evolução do Registro", duration: "25min", videoUrl: null, completed: true },
          { id: "l2", title: "Princípios Registrais", duration: "35min", videoUrl: null, completed: true },
          { id: "l3", title: "Estrutura do Cartório", duration: "30min", videoUrl: null, completed: false },
        ],
      },
      {
        id: "m2",
        title: "Matrícula Imobiliária",
        lessons: [
          { id: "l4", title: "Abertura de Matrícula", duration: "40min", videoUrl: null, completed: false },
          { id: "l5", title: "Elementos da Matrícula", duration: "35min", videoUrl: null, completed: false },
          { id: "l6", title: "Retificação de Matrícula", duration: "45min", videoUrl: null, completed: false },
        ],
      },
      {
        id: "m3",
        title: "Atos de Registro",
        lessons: [
          { id: "l7", title: "Compra e Venda", duration: "50min", videoUrl: null, completed: false },
          { id: "l8", title: "Doação e Permuta", duration: "40min", videoUrl: null, completed: false },
          { id: "l9", title: "Hipoteca e Alienação Fiduciária", duration: "55min", videoUrl: null, completed: false },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Usucapião Extrajudicial",
    description: "Curso completo sobre o procedimento de usucapião extrajudicial em cartórios de registro de imóveis.",
    category: "Usucapião",
    instructor: "Dr. Wyllian Nava",
    duration: "8h 15min",
    comingSoon: true,
    progress: 0,
    modules: [
      {
        id: "m4",
        title: "Fundamentos da Usucapião",
        lessons: [
          { id: "l10", title: "Conceito e Modalidades", duration: "30min", videoUrl: null, completed: false },
          { id: "l11", title: "Requisitos Legais", duration: "35min", videoUrl: null, completed: false },
        ],
      },
      {
        id: "m5",
        title: "Procedimento Extrajudicial",
        lessons: [
          { id: "l12", title: "Documentação Necessária", duration: "45min", videoUrl: null, completed: false },
          { id: "l13", title: "Análise e Qualificação", duration: "50min", videoUrl: null, completed: false },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "LGPD nos Cartórios",
    description: "Implementação da Lei Geral de Proteção de Dados nos serviços notariais e de registro.",
    category: "LGPD",
    instructor: "Dr. Wyllian Nava",
    duration: "6h 45min",
    comingSoon: true,
    progress: 0,
    modules: [
      {
        id: "m6",
        title: "Introdução à LGPD",
        lessons: [
          { id: "l14", title: "Conceitos Fundamentais", duration: "25min", videoUrl: null, completed: true },
          { id: "l15", title: "Bases Legais", duration: "30min", videoUrl: null, completed: true },
        ],
      },
    ],
  },
];
