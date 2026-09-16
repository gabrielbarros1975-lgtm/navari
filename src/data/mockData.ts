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
  title: "Imersão em Incorporação Imobiliária: 10 Passos da Estruturação ao Registro",
  subtitle:
    "Um sábado inteiro sobre o registro de incorporação na prática, com quem qualifica esses processos no cartório.",
  whyText:
    "Os erros que travam uma incorporação não estão nos livros. Estão no memorial mal montado, na documentação incompleta, na permuta mal estruturada.",
  instructor: "Dr. Wyllian Nava",
  instructorCredentials: [
    { text: "Oficial Substituto do 3º Registro de Imóveis de São Luís/MA", instagram: "3risaoluis" },
    { text: "Especialista em Direito Notarial e Registral" },
    {
      text: "Membro consultivo da Comissão de Direito Notarial e Registral da OAB/MA",
      instagram: "notarialeregistraloabma",
    },
    { text: "Técnica registral aplicada" },
  ],
  instructorPhotoUrl: "/wyllian.jpg",
  dateLabel: "Sábado · data a confirmar",
  format: "Online · ao vivo",
  durationLabel: "Dia inteiro (aprox. 8h)",
  // TODO: colar o link (YouTube/Vimeo) do vídeo de apresentação assim que gravado.
  videoUrl: null,
  agenda: [
    {
      title: "Fundamentos da incorporação",
      topics: [
        "Conceito de incorporação e partes envolvidas",
        "Legislação aplicável (Lei 4.591/64 e Lei do SERP)",
      ],
    },
    {
      title: "Documentação e registro",
      topics: [
        "Memorial de incorporação: elaboração e registro",
        "Patrimônio de afetação e RET",
      ],
    },
    {
      title: "Estruturação do empreendimento",
      topics: ["SPE e SCP: quando usar cada uma", "Erros mais comuns que travam o registro"],
    },
    {
      title: "Comercialização",
      topics: ["Contratos de venda na planta", "Lei do distrato na prática"],
    },
  ],
  tiers: [
    {
      id: "ao-vivo",
      name: "Ao vivo",
      price: 450,
      installments: 12,
      includes: [
        "Acesso à imersão ao vivo, online (sábado, dia inteiro)",
        "Interação direta com o Dr. Wyllian Nava",
        "Certificado de participação",
      ],
      checkoutUrl: null,
    },
    {
      id: "ao-vivo-mais-plataforma",
      name: "Ao vivo + Plataforma",
      price: 800,
      installments: 12,
      includes: [
        "Tudo do ingresso Ao vivo",
        "Gravação da imersão publicada na plataforma",
        "Acesso a todos os cursos da plataforma por 1 ano",
        "Concorre ao sorteio de um livro",
      ],
      checkoutUrl: null,
      highlight: true,
    },
  ],
  faq: [
    {
      question: "O workshop é online ou presencial?",
      answer: "É online, ao vivo, direto de onde você estiver. Um sábado, dia inteiro.",
    },
    {
      question: "A aula fica gravada?",
      answer:
        "Fica. Quem escolher o ingresso Ao vivo + Plataforma assiste à gravação na plataforma depois do evento e ainda fica com acesso a todos os cursos por um ano.",
    },
    {
      question: "Como funciona o sorteio do livro?",
      answer:
        "Quem tem o ingresso Ao vivo + Plataforma concorre ao sorteio de um livro, realizado durante a imersão.",
    },
    {
      question: "Posso comprar só a gravação, sem participar ao vivo?",
      answer:
        "Ainda não. Nesta primeira turma, a gravação é liberada para quem participa ao vivo. Depois ela vira um curso na plataforma, vendido separadamente.",
    },
    {
      question: "Tem certificado?",
      answer: "Sim, certificado de participação para todos os inscritos.",
    },
    {
      question: "Preciso ser advogado para acompanhar?",
      answer:
        "Não. O conteúdo é voltado para quem atua com registro de imóveis no dia a dia. Cartorários, advogados e corretores conseguem acompanhar.",
    },
    {
      question: "Quando abrem as inscrições?",
      answer:
        "Em breve. Quem entrar na lista de prioridade é avisado primeiro, antes da divulgação geral.",
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
