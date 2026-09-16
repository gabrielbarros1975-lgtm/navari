import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Reveal } from "@/components/Reveal";
import { PlatformFeatureCards } from "@/components/PlatformFeatures";
import { Button } from "@/components/ui/button";
import { brl, installmentValue } from "@/lib/price";
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
  Clock,
  CheckCircle,
  ChevronRight,
  Play,
  User,
  Instagram,
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
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="lp-section lp-surface pt-28 md:pt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Só no celular: a etiqueta abre a página, antes do vídeo.
                No desktop ela mora dentro da coluna de texto, ao lado do vídeo. */}
            <p
              className="hero-in lg:hidden text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
              style={{ animationDelay: "0ms" }}
            >
              Imersão online · Um dia
            </p>

            <div className="hero-in lg:pr-4" style={{ animationDelay: "80ms" }}>
              {workshop.videoUrl ? (
                <div className="rounded-xl overflow-hidden border border-border shadow-lg">
                  <VideoPlayer videoUrl={workshop.videoUrl} title={workshop.title} />
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border shadow-lg group">
                  <img
                    src={cursoThumb}
                    alt="Imersão em Incorporação Imobiliária: 10 Passos da Estruturação ao Registro, com o Dr. Wyllian Nava"
                    className="w-full h-auto block"
                    loading="eager"
                  />

                  <div className="absolute inset-0 bg-[hsl(212,42%,9%)]/25 transition-colors group-hover:bg-[hsl(212,42%,9%)]/10" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-16 h-16">
                      <div className="play-pulse absolute inset-0" />
                      <div className="relative w-16 h-16 rounded-full bg-gold/90 text-gold-foreground flex items-center justify-center shadow-xl">
                        <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <span className="text-xs font-medium tracking-wide text-white bg-[hsl(212,42%,9%)]/75 px-3 py-1.5 rounded-full">
                      Vídeo em breve
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/*
              flex+gap em vez de space-y: space-y usa margin baseado em
              ":not([hidden])" (o atributo HTML), não a classe .hidden do
              Tailwind — então a etiqueta duplicada (escondida no celular via
              classe) ainda "contava" para o espaçamento, com 24px fantasmas
              empurrando o título. gap ignora elementos com display:none de verdade.
            */}
            <div className="flex flex-col gap-6 md:gap-7 text-center lg:text-left">
              <p
                className="hero-in hidden lg:block text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
                style={{ animationDelay: "0ms" }}
              >
                Imersão online · Um dia
              </p>

              <h1
                className="hero-in font-display text-[2rem] leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold md:leading-[1.1]"
                style={{ animationDelay: "160ms" }}
              >
                {workshop.title}
              </h1>

              <p
                className="hero-in text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
                style={{ animationDelay: "220ms" }}
              >
                {workshop.subtitle}
              </p>

              <div
                className="hero-in flex flex-col sm:flex-row sm:flex-wrap items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-x-6 sm:gap-y-3 text-sm text-muted-foreground"
                style={{ animationDelay: "280ms" }}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  {workshop.dateLabel}
                </span>
                <span className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary flex-shrink-0" />
                  {workshop.format}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  {workshop.durationLabel}
                </span>
              </div>

              <div className="hero-in pt-2 md:pt-3" style={{ animationDelay: "340ms" }}>
                <a href="#inscricao" className="block sm:inline-block">
                  <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                    Garantir minha vaga
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que: foto de fundo fixa, o conteúdo rola por cima */}
      <section
        className="lp-section lp-surface-photo"
        style={{
          backgroundImage: `linear-gradient(hsl(212 42% 9% / 0.9), hsl(212 42% 9% / 0.9)), url(${images.edificio})`,
        }}
      >
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto text-center lp-photo-card rounded-2xl px-8 py-14 md:px-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-muted-foreground">
              Por que este workshop
            </p>
            <p className="text-2xl md:text-3xl leading-snug font-display">
              {workshop.whyText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Agenda */}
      <section className="lp-section lp-surface-raised">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              O que você vai aprender
            </h2>
            <p className="text-muted-foreground">Programação em fase de fechamento.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            {workshop.agenda.map((block, index) => (
              <Reveal key={index} delayMs={index * 80}>
                <div className="glass-card-hover h-full p-8 group">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-display text-3xl font-bold text-gold/30 group-hover:text-gold transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-semibold text-xl">{block.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {block.topics.map((topic, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle className="w-4 h-4 text-bronze mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instrutor */}
      <section className="lp-section lp-surface">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Com quem você vai aprender
            </h2>
          </Reveal>

          <Reveal className="max-w-5xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr]">
                {/* Foto ocupa a coluna inteira, sem respiro, para ganhar presença.
                    aspect-[3/4] no celular evita cortar o rosto: a altura acompanha
                    a largura em vez de usar um valor fixo curto demais. */}
                <div className="relative">
                  {workshop.instructorPhotoUrl ? (
                    <img
                      src={workshop.instructorPhotoUrl}
                      alt={workshop.instructor}
                      className="w-full aspect-[3/4] sm:aspect-auto sm:h-96 md:h-full md:min-h-[520px] object-cover object-top"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] sm:aspect-auto sm:h-96 md:h-full md:min-h-[520px] bg-secondary/50 flex flex-col items-center justify-center gap-3">
                      <User className="w-12 h-12 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground">Foto em breve</p>
                    </div>
                  )}
                </div>

                <div className="px-6 py-10 sm:px-10 md:px-12 md:py-14 flex flex-col justify-center text-center md:text-left">
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {workshop.instructor}
                  </h3>

                  <div className="w-12 h-px bg-gold/50 my-6 mx-auto md:mx-0" />

                  <ul className="space-y-3.5 text-left max-w-sm mx-auto md:mx-0 md:max-w-none">
                    {workshop.instructorCredentials.map((cred, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm md:text-base">{cred.text}</p>
                          {cred.instagram && (
                            <a
                              href={`https://instagram.com/${cred.instagram}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors mt-0.5"
                            >
                              <Instagram className="w-3 h-3" />@{cred.instagram}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Inscrição na imersão */}
      <section id="inscricao" className="lp-section lp-surface-raised scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              Vagas limitadas
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Escolha seu ingresso
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao vivo, online. Quem quiser rever depois, inclui a plataforma.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-3xl mx-auto mt-14">
            {workshop.tiers.map((tier, index) => (
              <Reveal key={tier.id} delayMs={index * 100}>
                <div
                  className={
                    "relative h-full overflow-hidden rounded-xl p-8 bg-card border transition-all duration-300 hover:-translate-y-1" +
                    (tier.highlight
                      ? " border-primary shadow-md hover:shadow-xl"
                      : " border-border hover:border-primary/40 hover:shadow-lg")
                  }
                >
                  {tier.highlight && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-bl-lg">
                        Mais completo
                      </div>
                    </div>
                  )}

                  <h3 className="font-display text-xl font-bold">{tier.name}</h3>

                  <div className="mt-4 mb-7">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm text-muted-foreground">
                        {tier.installments}x de
                      </span>
                      <span className="font-display text-4xl font-bold text-primary">
                        {brl(installmentValue(tier.price, tier.installments))}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      ou {brl(tier.price)} à vista
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {tier.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plataforma: gravação e material depois do evento */}
      <section id="plataforma" className="lp-section lp-surface scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Depois do evento, tudo fica na plataforma
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A gravação fica na plataforma. Com o ingresso completo, você leva junto o acesso
              a todos os cursos por um ano.
            </p>
          </Reveal>

          <Reveal>
            <PlatformFeatureCards />
          </Reveal>

          <Reveal className="max-w-5xl mx-auto mt-14">
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden border border-border">
              <img
                src={images.planta}
                alt="Planta arquitetônica de um edifício"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[hsl(212,42%,9%)]/60" />
              <div className="relative h-full flex items-center justify-center px-6">
                <p className="font-display text-xl md:text-2xl text-white text-center max-w-lg">
                  Do memorial ao registro, o caminho completo de uma incorporação.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="lp-section lp-surface-raised scroll-mt-24">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">
              Perguntas frequentes
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {workshop.faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-border">
                  <AccordionTrigger className="text-left py-5 hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
            <Button variant="hero" size="lg" className="w-full gap-2">
              Garantir minha vaga
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      <Footer />

      {/* Espaço para a barra fixa não cobrir o fim do rodapé no celular */}
      <div aria-hidden className="h-20 md:hidden" />
    </div>
  );
};

export default Workshop;
