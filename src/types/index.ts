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
