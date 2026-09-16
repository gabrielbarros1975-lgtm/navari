import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { brl } from "@/lib/price";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockWorkshop } from "@/data/mockData";
import { images, cursoThumb } from "@/data/images";
import {
  Calendar,
  Video,
  CheckCircle,
  ChevronRight,
  Play,
  Instagram,
  BookOpen,
  ArrowRight,
  Briefcase,
  Scale,
  Building2,
  Compass,
  User,
  Award,
  Tv,
  Mic,
  CalendarCheck,
} from "lucide-react";

const Workshop = () => {
  const workshop = mockWorkshop;
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* 1. HERO / ABERTURA COM VÍDEO NO TOPO */}
      <section className="lp-section lp-surface pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col gap-10 items-center text-center">
            {/* VÍDEO NO TOPO DA PÁGINA */}
            <div className="w-full max-w-4xl hero-in" style={{ animationDelay: "80ms" }}>
              {workshop.videoUrl ? (
                <div className="rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-black">
                  <VideoPlayer videoUrl={workshop.videoUrl} title={workshop.title} />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-2xl group">
                  <img
                    src={cursoThumb}
                    alt="Imersão em Incorporação Imobiliária, com Dr. Wyllian Nava"
                    className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(212,42%,9%)]/80 via-[hsl(212,42%,9%)]/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-16 h-16">
                      <div className="play-pulse absolute inset-0" />
                      <div className="relative w-16 h-16 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CONTEÚDO DO HERO ABAIXO DO VÍDEO */}
            <div className="max-w-3xl flex flex-col gap-6 items-center">
              <h1
                className="hero-in font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                style={{ animationDelay: "160ms" }}
              >
                {workshop.title}
              </h1>

              <p
                className="hero-in text-lg md:text-xl font-medium text-gold/90 italic leading-relaxed max-w-2xl"
                style={{ animationDelay: "220ms" }}
              >
                {workshop.subtitle}
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                Uma imersão objetiva sobre a incorporação imobiliária sob a perspectiva do Registro de Imóveis, percorrendo seus principais fundamentos, documentos e etapas registrais para aproximar a legislação da prática da qualificação registral.
              </p>

              {/* Informações de Data / Formato */}
              <div
                className="hero-in flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/90 font-medium py-2"
                style={{ animationDelay: "280ms" }}
              >
                <span className="flex items-center gap-2 bg-card/80 border border-border px-4 py-2 rounded-xl shadow-sm">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  Sábado · 17 de outubro de 2026
                </span>
                <span className="flex items-center gap-2 bg-card/80 border border-border px-4 py-2 rounded-xl shadow-sm">
                  <Video className="w-4 h-4 text-gold shrink-0" />
                  Online · Ao vivo
                </span>
              </div>

              <div className="hero-in pt-2" style={{ animationDelay: "340ms" }}>
                <a href="#inscricao">
                  <Button variant="hero" size="xl" className="gap-2 px-8 shadow-xl shadow-gold/20 font-bold text-base">
                    Garantir minha vaga
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POR QUE ESTA IMERSÃO */}
      <section
        id="por-que"
        className="lp-section lp-surface-photo relative py-20"
        style={{
          backgroundImage: `linear-gradient(hsl(212 42% 9% / 0.92), hsl(212 42% 9% / 0.92)), url(${images.edificio})`,
        }}
      >
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto">
            <div className="lp-photo-card rounded-3xl p-8 md:p-14 space-y-8 text-left border border-gold/30">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                  Objetivo & Filosofia
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  POR QUE ESTA IMERSÃO
                </h2>
              </div>

              <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/90">
                <p>
                  A incorporação imobiliária reúne aspectos jurídicos, registrais, documentais e técnicos que precisam dialogar entre si; contratos, construção e uma série de exigências que, na prática, podem transformar um procedimento aparentemente simples em um verdadeiro desafio.
                </p>
                <p className="font-semibold text-gold text-lg">
                  E é justamente por isso que esta imersão foi pensada.
                </p>
                <p>
                  Em mais de 4 horas de aula, você terá uma visão ampla, organizada e prática da incorporação imobiliária sob a perspectiva do Registro de Imóveis, compreendendo o caminho que começa na análise do imóvel e chega ao registro do memorial de incorporação.
                </p>
              </div>

              {/* Destaque em Card */}
              <div className="bg-gradient-to-r from-gold/15 to-gold/5 border-l-4 border-gold p-6 rounded-r-2xl space-y-2">
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">
                  “Não é uma aula para simplesmente percorrer os artigos da Lei de Incorporações.”
                </p>
                <p className="font-display text-xl md:text-2xl font-bold text-gold">
                  “É uma aula para entender como as peças se encaixam.”
                </p>
              </div>

              <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/90">
                <p>
                  Você vai compreender o que acontece quando uma incorporação chega à serventia, quais são os principais documentos envolvidos, o que precisa ser analisado, onde estão os pontos mais sensíveis da qualificação e quais são as principais questões que costumam gerar dúvidas entre os profissionais que atuam nessa área.
                </p>
                <p>
                  Compreender como esses elementos são analisados no Registro de Imóveis permite enxergar o procedimento para além da legislação e aproximar a teoria daquilo que efetivamente acontece na qualificação registral.
                </p>
              </div>

              <div className="text-center pt-4">
                <a href="#inscricao">
                  <Button variant="hero" size="lg" className="gap-2">
                    Garantir minha vaga
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. O QUE VOCÊ VAI APRENDER */}
      <section id="aprendizado" className="lp-section lp-surface-raised py-20">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Programa Completo
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              O QUE VOCÊ VAI APRENDER
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Ao longo da imersão prática, vamos percorrer os principais aspectos da incorporação imobiliária, passando por temas como:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {workshop.learningTopics?.map((topic, index) => (
              <Reveal key={index} delayMs={index * 30}>
                <div className="glass-card-hover h-full p-6 flex flex-col justify-between group rounded-2xl border border-border/80 hover:border-gold/50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-bold text-gold/40 group-hover:text-gold transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-foreground/90">
                      {topic}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="max-w-4xl mx-auto mt-14">
            <div className="bg-card border border-gold/40 rounded-2xl p-8 text-center shadow-xl">
              <p className="font-display text-lg md:text-xl font-semibold text-gold">
                E, especialmente, você vai aprender a enxergar a incorporação como um procedimento registral completo, e não como uma simples lista de documentos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. MATERIAL DIDÁTICO */}
      <section id="material" className="lp-section lp-surface py-16">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-gold/10 border border-gold/30 p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] items-center gap-8">
                <div className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    MATERIAL DIDÁTICO
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {workshop.materialTitle}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {workshop.materialSubtitle}
                  </p>

                  <p className="text-xs text-gold/90 font-medium">
                    * Disponibilizado digitalmente para todos os participantes da imersão.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gold/10 rounded-2xl border border-gold/20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <span className="font-display text-sm font-bold text-foreground">
                    Guia Prático Registral
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Normas CNJ / TJMA
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. COM QUEM VOCÊ VAI APRENDER & MÍDIAS */}
      <section id="instrutor" className="lp-section lp-surface-raised py-20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Corpo Docente
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              COM QUEM VOCÊ VAI APRENDER
            </h2>
          </Reveal>

          <Reveal className="max-w-5xl mx-auto">
            <div className="glass-card overflow-hidden rounded-3xl border border-gold/30">
              <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[420px_1fr]">
                {/* Foto do Wyllian Nava */}
                <div className="relative bg-secondary/50">
                  <img
                    src={workshop.instructorPhotoUrl || "/wyllian.jpg"}
                    alt={workshop.instructor}
                    className="w-full aspect-[3/4] sm:aspect-auto sm:h-96 md:h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(212,42%,9%)]/60 via-transparent to-transparent md:hidden" />
                </div>

                <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-between text-left space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-foreground">
                      {workshop.instructor}
                    </h3>
                    <p className="text-sm font-medium text-gold mt-1">
                      Oficial Substituto & Especialista Registral
                    </p>

                    <div className="w-16 h-0.5 bg-gold/40 my-6" />

                    <ul className="space-y-4">
                      {workshop.instructorCredentials.map((cred, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm md:text-base text-foreground/90">
                              {cred.text}
                            </p>
                            {cred.instagram && (
                              <a
                                href={`https://instagram.com/${cred.instagram}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors mt-0.5"
                              >
                                <Instagram className="w-3.5 h-3.5" />@{cred.instagram}
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <a href="#inscricao">
                      <Button variant="hero" size="lg" className="w-full sm:w-auto gap-2">
                        Garantir minha vaga
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mídias & Vídeos do Wyllian Nava */}
          <Reveal className="max-w-5xl mx-auto mt-16 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl font-bold text-foreground">
                Conteúdos, Podcasts e Vídeos
              </h3>
              <p className="text-sm text-muted-foreground">
                Confira participações do Dr. Wyllian Nava em podcasts e vídeos educativos sobre Direito Registral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card Mídia 1 */}
              <div className="glass-card p-5 rounded-2xl border border-border/80 hover:border-gold/50 transition-all group space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                  <img
                    src={images.edificio}
                    alt="Vídeo Instagram Reels Dr. Wyllian Nava"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-lg">
                      <Tv className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/80 px-2 py-1 rounded text-gold">
                    Instagram Reels
                  </span>
                </div>
                <h4 className="font-display font-semibold text-base text-foreground">
                  A Qualificação Registral na Prática
                </h4>
                <p className="text-xs text-muted-foreground">
                  Análise dos pontos sensíveis na verificação de memoriais de incorporação.
                </p>
              </div>

              {/* Card Mídia 2 */}
              <div className="glass-card p-5 rounded-2xl border border-border/80 hover:border-gold/50 transition-all group space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                  <img
                    src={cursoThumb}
                    alt="Vídeo Instagram Reels Erros Frequentes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-lg">
                      <Tv className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/80 px-2 py-1 rounded text-gold">
                    Instagram Reels
                  </span>
                </div>
                <h4 className="font-display font-semibold text-base text-foreground">
                  Principais Erros em Notas Devolutivas
                </h4>
                <p className="text-xs text-muted-foreground">
                  Como evitar exigências desnecessárias e estruturar processos rápidos.
                </p>
              </div>

              {/* Card Mídia 3 */}
              <div className="glass-card p-5 rounded-2xl border border-border/80 hover:border-gold/50 transition-all group space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                  <img
                    src={images.planta}
                    alt="Participação em Podcast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center shadow-lg">
                      <Mic className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-black/80 px-2 py-1 rounded text-gold">
                    Podcast & Entrevistas
                  </span>
                </div>
                <h4 className="font-display font-semibold text-base text-foreground">
                  Podcast: O Futuro do Registro de Imóveis
                </h4>
                <p className="text-xs text-muted-foreground">
                  Bate-papo sobre tecnologia, legislação e tendências da incorporação imobiliária.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. PARA QUEM É A IMERSÃO */}
      <section id="publico" className="lp-section lp-surface py-20">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Público-Alvo
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              PARA QUEM É A IMERSÃO
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              A imersão é destinada a profissionais que atuam ou desejam compreender a incorporação imobiliária e sua relação com o Registro de Imóveis, incluindo:
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {workshop.targetAudience?.map((audience, index) => {
              const icons = [Building2, Scale, Briefcase, Compass, User, Award];
              const IconComp = icons[index % icons.length];
              return (
                <Reveal key={index} delayMs={index * 60}>
                  <div className="glass-card p-6 rounded-2xl border border-border/80 hover:border-gold/50 flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-display text-base font-semibold text-foreground">
                      {audience}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="max-w-3xl mx-auto mt-12">
            <div className="bg-card/70 border border-gold/30 rounded-2xl p-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {workshop.targetAudienceNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. ESCOLHA SEU INGRESSO */}
      <section id="inscricao" className="lp-section lp-surface-raised py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest">
              VAGAS LIMITADAS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              ESCOLHA SEU INGRESSO
            </h2>
            <p className="text-muted-foreground text-base">
              Participe ao vivo no dia 17 de outubro de 2026.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {workshop.tiers.map((tier, index) => (
              <Reveal key={tier.id} delayMs={index * 100}>
                <div
                  className={
                    "relative h-full flex flex-col justify-between rounded-3xl p-8 bg-card border transition-all duration-300 hover:-translate-y-1 shadow-xl" +
                    (tier.highlight
                      ? " border-gold ring-1 ring-gold/40 shadow-gold/10"
                      : " border-border hover:border-gold/40")
                  }
                >
                  {tier.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <div className="bg-gold text-gold-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                        Mais Escolhido
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {tier.name}
                    </h3>

                    {/* Preços */}
                    <div className="my-6 space-y-2 border-b border-border/60 pb-6">
                      {tier.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through font-medium">
                          De {brl(tier.originalPrice)}
                        </p>
                      )}

                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-muted-foreground">
                          Por apenas
                        </span>
                        <span className="font-display text-3xl md:text-4xl font-bold text-gold">
                          {tier.installments}x de {brl(tier.installmentValue || 0)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground font-medium">
                        ou {brl(tier.price)} à vista
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {tier.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                          <span className="text-foreground/90 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Button
                      variant={tier.highlight ? "hero" : "outline"}
                      size="xl"
                      className="w-full gap-2 font-bold"
                    >
                      Garantir minha vaga
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PERGUNTAS FREQUENTES */}
      <section id="faq" className="lp-section lp-surface-raised py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto">
            <div className="text-center mb-14 space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Tire Suas Dúvidas
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                PERGUNTAS FREQUENTES
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {workshop.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/80 rounded-2xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-base md:text-lg py-5 hover:no-underline hover:text-gold transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Inscrições Abertura Info */}
            <div className="mt-10 p-6 rounded-2xl bg-gold/10 border border-gold/30 text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm">
                <CalendarCheck className="w-4 h-4" />
                Abertura das inscrições: 07 de setembro de 2026
              </div>
              <p className="text-xs text-muted-foreground">
                Data do evento: Sábado, 17 de outubro de 2026 (Online · Ao vivo)
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Barra fixa de conversão (mobile) */}
      <div
        className={
          "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 md:hidden" +
          (showStickyBar ? " translate-y-0" : " translate-y-full")
        }
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container mx-auto px-4 py-3">
          <a href="#inscricao" className="block">
            <Button variant="hero" size="lg" className="w-full gap-2 font-bold shadow-lg">
              Garantir minha vaga
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      <Footer />

      {/* Espaço para a barra fixa no mobile */}
      <div aria-hidden className="h-20 md:hidden" />
    </div>
  );
};

export default Workshop;
