export interface Course {
  id: string;
  title: string;
  description: string;
  /** Área do curso, usada na capa tipográfica. */
  category: string;
  instructor: string;
  duration: string;
  modules: Module[];
  progress?: number;
  /** Preço de compra do curso, em reais. Ausente enquanto o curso não é vendido. */
  price?: number;
  /** Número máximo de parcelas exibidas na vitrine. */
  installments?: number;
  /** Curso ainda não liberado: aparece na listagem, mas sem acesso. */
  comingSoon?: boolean;
  /** Selo exibido no card no lugar do padrão "Em breve" (ex.: "Em desenvolvimento", "Imersão ao vivo"). */
  statusLabel?: string;
  /** Quando presente, o card linka para este endereço (ex.: a seção de inscrição da imersão) em vez de /course/:id. */
  externalHref?: string;
  /** Texto do botão de destaque exibido no card. Só faz sentido junto de externalHref. */
  ctaLabel?: string;
  /** Esconde duração e nº de módulos no card: conteúdo ainda não definido. */
  hideMeta?: boolean;
}

export interface CourseTrack {
  id: string;
  /** Nome da trilha, também usado como valor de Course.category para agrupar os cursos. */
  label: string;
  description: string[];
  /** Frase de destaque opcional, exibida em caixa dourada ao fim da apresentação da trilha. */
  highlight?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  /** Ausente enquanto a aula não é gravada. */
  videoUrl: string | null;
  completed?: boolean;
}

export interface WorkshopTier {
  id: string;
  name: string;
  /** Valor original em reais (riscado) */
  originalPrice?: number;
  /** Valor total promocional à vista em reais. */
  price: number;
  /** Valor da parcela mensal em reais (ex: 24.70 para 12x de R$ 24,70). */
  installmentValue?: number;
  /** Número máximo de parcelas exibidas na vitrine. */
  installments: number;
  includes: string[];
  checkoutUrl: string | null;
  highlight?: boolean;
}

export interface WorkshopAgendaBlock {
  title: string;
  topics: string[];
}

export interface WorkshopFaqItem {
  question: string;
  answer: string;
}

export interface InstructorCredential {
  text: string;
  /** Usuário do Instagram, sem o @. */
  instagram?: string;
}

export interface Workshop {
  id: string;
  title: string;
  subtitle: string;
  whyText: string;
  whyParagraphs?: string[];
  whyHighlights?: string[];
  learningTopics?: string[];
  targetAudience?: string[];
  targetAudienceNote?: string;
  materialTitle?: string;
  materialSubtitle?: string;
  materialDescription?: string;
  ebookBadge?: string;
  ebookIntro?: string;
  ebookTitle?: string;
  ebookDescription?: string;
  ebookNote?: string;
  registrationOpenDate?: string;
  instructor: string;
  /** Lista curta e essencial, não uma biografia longa. */
  instructorCredentials: InstructorCredential[];
  instructorPhotoUrl: string | null;
  dateLabel: string;
  format: string;
  durationLabel: string;
  videoUrl: string | null;
  agenda: WorkshopAgendaBlock[];
  tiers: WorkshopTier[];
  faq: WorkshopFaqItem[];
}
