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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { mockWorkshop } from "@/data/mockData";
import { cursoThumb, videoCapa } from "@/data/images";
import { cn } from "@/lib/utils";
import type { WorkshopTier } from "@/types";
import { parseBuyer } from "../../api/_buyer";
import {
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Play,
  Instagram,
  Compass,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const Workshop = () => {
  const workshop = mockWorkshop;
  const [showStickyBar, setShowStickyBar] = useState(false);
  /** Ingresso cujo checkout está sendo criado; trava os botões contra clique duplo. */
  const [checkoutTier, setCheckoutTier] = useState<string | null>(null);

  /*
   * Os dados do comprador são pedidos aqui, antes de ir pra Mercado Pago:
   * ela não devolve depois nem o e-mail (pra onde vai o acesso) nem o nome
   * (que vai no certificado) — ver api/_buyer.ts.
   */
  const [buyerDialogTier, setBuyerDialogTier] = useState<WorkshopTier | null>(null);
  const emptyBuyerForm = { name: "", email: "" };
  const [buyerForm, setBuyerForm] = useState(emptyBuyerForm);
  const [buyerError, setBuyerError] = useState<string | null>(null);

  const startCheckout = async (tierId: string, form: typeof buyerForm) => {
    setCheckoutTier(tierId);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId,
          ...form,
          // Gerado pelo security.js da Mercado Pago (index.html). Se o script
          // não carregou (ex.: bloqueador), o checkout segue sem ele.
          deviceId: (window as { MP_DEVICE_SESSION_ID?: string }).MP_DEVICE_SESSION_ID,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) throw new Error(data.error);
      window.location.href = data.url;
    } catch (error) {
      toast.error(
        (error instanceof Error && error.message) ||
          "Não foi possível abrir o pagamento. Tente novamente em instantes.",
      );
      setCheckoutTier(null);
    }
  };

  const confirmBuyer = () => {
    const parsed = parseBuyer(buyerForm);
    if ("error" in parsed) {
      setBuyerError(parsed.error);
      return;
    }
    if (buyerDialogTier) startCheckout(buyerDialogTier.id, buyerForm);
  };

  const updateBuyerForm = (field: keyof typeof buyerForm, value: string) => {
    setBuyerForm((form) => ({ ...form, [field]: value }));
    setBuyerError(null);
  };

  /*
   * Só vale no celular: lá o pergaminho chega lacrado e abre no toque. No
   * desktop o CSS ignora este estado e a abertura continua no scroll, então
   * não precisa de listener de resize — o breakpoint é do CSS, o estado é daqui.
   */
  const [sealOpen, setSealOpen] = useState(false);

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
      <section className="lp-section lp-surface pt-28 md:pt-32 pb-16 relative overflow-hidden">
        {/* Orbes dourados ambiente: decoração sutil, não competem com o conteúdo */}
        <div aria-hidden className="absolute inset-0 -z-0 overflow-hidden">
          <div className="ambient-orb w-72 h-72 -top-10 -left-16" />
          <div className="ambient-orb w-80 h-80 top-1/3 -right-20" style={{ animationDelay: "-7s" }} />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative">
          <div className="flex flex-col gap-10 items-center text-center">
            {/* VÍDEO NO TOPO DA PÁGINA */}
            <div className="w-full max-w-4xl hero-in" style={{ animationDelay: "80ms" }}>
              {workshop.videoUrl ? (
                <div className="rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-black">
                  <VideoPlayer
                    videoUrl={workshop.videoUrl}
                    title={workshop.title}
                    poster={videoCapa}
                  />
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
                className="hero-in text-lg md:text-xl font-medium text-gold italic leading-relaxed max-w-2xl"
                style={{ animationDelay: "220ms" }}
              >
                {workshop.subtitle}
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                Uma imersão objetiva sobre a incorporação imobiliária sob a perspectiva do Registro de Imóveis, percorrendo seus principais fundamentos, documentos e etapas registrais para aproximar a legislação da prática da qualificação registral.
              </p>

              {/* Informações de Data / Formato */}
              {/* Data por extenso no lugar da pílula com separador (padrão de
                  landing gerada). */}
              <div className="hero-in text-center" style={{ animationDelay: "280ms" }}>
                <p className="font-display text-lg md:text-xl font-semibold leading-snug text-foreground">
                  Sábado, 17 de outubro de 2026
                </p>
                <p className="mt-1 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Online · Ao vivo
                </p>
              </div>

              <div className="hero-in pt-2" style={{ animationDelay: "340ms" }}>
                <a href="#inscricao">
                  <Button
                    variant="hero"
                    size="xl"
                    className="shimmer-sweep gap-2 px-8 shadow-xl shadow-gold/20 font-bold text-base"
                  >
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
          // Véu na cor do fundo (token), não um navy fixo: senão a seção
          // inteira ficaria escura e destoaria do resto da página.
          backgroundImage: `linear-gradient(hsl(var(--background) / 0.92), hsl(var(--background) / 0.92)), url(/wyllian-apresentando.jpg)`,
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
                  Em mais de 8 horas de aula ao vivo, você terá uma visão ampla, organizada e prática da incorporação imobiliária sob a perspectiva do Registro de Imóveis, compreendendo o caminho que começa na análise do imóvel e percorre as principais etapas da qualificação e do registro do memorial de incorporação.
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

      {/* 3. O QUE VOCÊ VAI APRENDER — tratamento de pergaminho */}
      <section id="aprendizado" className="lp-section lp-surface-raised py-24 md:py-28">
        <div className="container mx-auto px-4">
          {/* O pergaminho é bem mais alto que a tela, então dispara só quando a
              borda de cima passa dos 60% da viewport — assim a abertura
              acontece na tela, e não abaixo da dobra. threshold 0 porque exigir
              uma fração da área de um bloco tão alto pode nunca ser atingido no
              mobile. */}
          <Reveal
            className="max-w-5xl mx-auto"
            rootMargin="0px 0px -40% 0px"
            threshold={0}
          >
            {/* Moldura: cabos e plaquinha não podem ser cortados pelo clip-path
                do "desenrolar" abaixo, por isso ficam num wrapper à parte. */}
            <div className="relative parchment-frame">
              <span aria-hidden className="parchment-rod parchment-rod-left" />
              <span aria-hidden className="parchment-rod parchment-rod-right" />

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="parchment-badge parchment-badge-pop inline-flex items-center px-5 py-2 rounded-md text-xs font-semibold tracking-[0.25em] uppercase whitespace-nowrap">
                  Programa Completo
                </span>
              </span>

              {/* Celular: o pergaminho chega lacrado. O botão some no desktop
                  pelo próprio CSS (não por classe do Tailwind), para não haver
                  duas regras de display brigando. */}
              <button
                type="button"
                onClick={() => setSealOpen(true)}
                aria-expanded={sealOpen}
                aria-controls="programa-pergaminho"
                aria-hidden={sealOpen || undefined}
                tabIndex={sealOpen ? -1 : undefined}
                className={cn("parchment-sealed parchment-card", sealOpen && "is-open")}
              >
                <span aria-hidden className="parchment-seal">
                  <Compass className="w-8 h-8" />
                </span>
                <span className="parchment-seal-label">
                  Toque para abrir
                  <ChevronDown aria-hidden className="w-3.5 h-3.5" />
                </span>
              </button>

              <div
                id="programa-pergaminho"
                className={cn("parchment-collapse", sealOpen && "is-open")}
              >
                <div className="parchment-collapse-inner">
              {/* O pergaminho em si: desenrola a partir da borda de cima */}
              <div className="parchment-card parchment-unroll rounded-[2rem] md:rounded-[2.5rem] overflow-hidden px-6 sm:px-10 md:px-16 pt-14 pb-12 md:pt-16 md:pb-16">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="parchment-heading font-display text-3xl md:text-5xl font-bold">
                    O QUE VOCÊ VAI APRENDER
                  </h2>
                  <p className="parchment-text text-base md:text-lg leading-relaxed">
                    Ao longo da imersão prática, vamos percorrer os principais aspectos da incorporação imobiliária, passando por temas como:
                  </p>
                  <div aria-hidden className="flex items-center justify-center gap-3 pt-2">
                    <span className="parchment-divider h-px w-14 sm:w-24" />
                    <span style={{ color: "hsl(var(--bronze))" }}>❖</span>
                    <span className="parchment-divider h-px w-14 sm:w-24" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14 max-w-4xl mx-auto mt-10">
                  {workshop.learningTopics?.map((topic, index) => (
                    <Reveal key={index} delayMs={index * 30}>
                      <div className="parchment-item flex items-start gap-4 py-4 border-b">
                        <span className="parchment-num font-display text-xl font-bold shrink-0 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="parchment-text text-sm md:text-base leading-relaxed">
                          {topic}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="parchment-quote-border max-w-3xl mx-auto mt-10 pt-8 border-t text-center">
                  <p className="parchment-quote font-display text-lg md:text-xl font-semibold italic leading-relaxed">
                    E, especialmente, você vai aprender a enxergar a incorporação como um procedimento registral completo, e não como uma simples lista de documentos.
                  </p>
                </div>

                <Compass
                  aria-hidden
                  className="parchment-icon hidden sm:block absolute bottom-6 right-6 w-10 h-10 -rotate-12"
                />
              </div>
                </div>
              </div>
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
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      Material didático
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {workshop.materialTitle}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {workshop.materialSubtitle}
                  </p>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {workshop.materialDescription}
                  </p>

                  <p className="text-xs text-gold font-medium">
                    * Disponibilizado digitalmente para todos os participantes da Imersão.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-24 h-32">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-gold/10 border border-gold/20" />
                    <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg bg-gold/15 border border-gold/25" />
                    <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-secondary to-card border border-gold/40 shadow-lg flex flex-col justify-between p-3">
                      <div className="w-6 h-0.5 bg-gold" />
                      <div className="space-y-1.5">
                        <div className="h-1 w-full bg-foreground/20 rounded-full" />
                        <div className="h-1 w-3/4 bg-foreground/20 rounded-full" />
                        <div className="h-1 w-full bg-foreground/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="font-display text-sm font-bold text-foreground block">
                      Guia Prático Registral
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Normas CNJ / TJMA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4.1 E-BOOK EXCLUSIVO */}
      <section id="ebook" className="lp-section lp-surface-raised py-16">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-gold/10 border border-gold/30 p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] items-center gap-8">
                <div className="space-y-4 text-left">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {workshop.ebookBadge}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                      {workshop.ebookIntro}
                    </h3>
                  </div>

                  <p className="font-display text-lg md:text-xl font-bold text-gold">
                    {workshop.ebookTitle}
                  </p>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {workshop.ebookDescription}
                  </p>

                  <p className="text-xs text-gold font-medium">
                    * {workshop.ebookNote}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-24 h-32">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-gold/10 border border-gold/20" />
                    <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg bg-gold/15 border border-gold/25" />
                    <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-secondary to-card border border-gold/40 shadow-lg flex flex-col justify-between p-3 overflow-hidden">
                      <span className="absolute -right-8 top-3 rotate-45 bg-gold text-gold-foreground text-[9px] font-bold uppercase tracking-wider px-8 py-0.5">
                        Em breve
                      </span>
                      <div className="w-6 h-0.5 bg-gold" />
                      <div className="space-y-1.5">
                        <div className="h-1 w-full bg-foreground/20 rounded-full" />
                        <div className="h-1 w-3/4 bg-foreground/20 rounded-full" />
                        <div className="h-1 w-full bg-foreground/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="font-display text-sm font-bold text-foreground block">
                      Novo E-book
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Em breve
                    </span>
                  </div>
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
                                /* py-2 -my-2: o link tinha 16px de altura, bem
                                   abaixo do mínimo confortável no toque. O
                                   negativo cancela o espaço extra no layout. */
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors mt-0.5 py-2 -my-2"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl mx-auto">
            {workshop.targetAudience?.map((audience, index) => (
              <Reveal key={index} delayMs={index * 60}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="font-display text-base font-semibold text-foreground">
                    {audience}
                  </span>
                </div>
              </Reveal>
            ))}
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
            {/* Token em vez de red-400: aquele vermelho claro foi escolhido para
                o fundo navy e some no tema papel. */}
            <span className="pulse-badge inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold uppercase tracking-widest">
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
                    "tap-scale relative h-full flex flex-col justify-between rounded-3xl p-8 bg-card border transition-all duration-300 hover:-translate-y-1 shadow-xl" +
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
                    {tier.batchLabel && (
                      <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1">
                        {tier.batchLabel}
                      </span>
                    )}
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
                          {brl(tier.price)}
                        </span>
                      </div>

                      {/* Sem valor de parcela: a Mercado Pago cobra os juros do
                          comprador (12x de R$296,40 saía 12x de R$30,16, não
                          R$24,70), e a taxa muda com o tempo e a bandeira. */}
                      <p className="text-sm text-muted-foreground font-medium">
                        {tier.installments > 1
                          ? `à vista, ou em até ${tier.installments}x no cartão (com\u00a0juros)`
                          : "à vista"}
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
                      onClick={() => {
                        setBuyerDialogTier(tier);
                        setBuyerForm(emptyBuyerForm);
                        setBuyerError(null);
                      }}
                    >
                      {tier.ctaLabel ?? "Garantir minha vaga"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/*
        7.1 LABORATÓRIO DE CASOS — continuação da imersão, ainda sem preço nem
        data. Vem depois dos ingressos de propósito: é oferta futura e não pode
        competir com a decisão de compra da imersão.
      */}
      {workshop.caseLab && (
        <section id="laboratorio" className="lp-section lp-surface py-20 scroll-mt-24">
          {/* Cara de prospecto impresso, não de "landing gerada": ficha
              técnica com filetes, capitular, itens em algarismos romanos e a
              nota como rodapé. Sem ícones, cartões nem pílulas. */}
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Coluna do título: fixa no desktop enquanto o texto rola */}
              <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                  <span aria-hidden className="h-px w-8 bg-gold/60" />
                  {workshop.caseLab.eyebrow}
                </p>
                <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-[1.05] text-foreground">
                  {workshop.caseLab.title}
                </h2>
                <p className="mt-2 font-display italic text-2xl md:text-[1.75rem] text-gold">
                  {workshop.caseLab.subtitle}
                </p>

                <dl className="mt-10 border-t border-foreground/15">
                  {workshop.caseLab.facts.map(({ label, value }, i, all) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-6 border-b border-foreground/15 py-3.5"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {label}
                      </dt>
                      {/* A última linha (inscrições) é o aviso: vai em destaque */}
                      <dd
                        className={cn(
                          "font-display text-base md:text-lg text-right",
                          i === all.length - 1 ? "italic text-gold" : "text-foreground",
                        )}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <div className="lg:col-span-7">
                <Reveal className="space-y-5 text-[17px] leading-relaxed text-foreground/85">
                  {workshop.caseLab.intro.map((paragraph, i) => (
                    <p
                      key={i}
                      className={cn(
                        i === 0 &&
                          "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4rem] md:first-letter:text-[4.2rem] first-letter:font-bold first-letter:leading-[0.8] first-letter:text-gold",
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </Reveal>

                <Reveal className="mt-14">
                  <h3 className="font-display text-2xl md:text-[1.75rem] font-bold text-foreground">
                    {workshop.caseLab.featuresTitle}
                  </h3>
                  <p className="mt-2 font-display italic text-lg text-muted-foreground">
                    {workshop.caseLab.featuresSubtitle}
                  </p>

                  <ol className="mt-8 border-t border-foreground/15">
                    {workshop.caseLab.features.map((feature, i) => (
                      <li
                        key={feature.title}
                        className="grid grid-cols-[2.75rem_1fr] gap-3 border-b border-foreground/15 py-5"
                      >
                        <span aria-hidden className="font-display text-xl text-gold">
                          {["I", "II", "III", "IV", "V", "VI"][i] ?? i + 1}.
                        </span>
                        <div>
                          <h4 className="font-display text-lg font-semibold text-foreground">
                            {feature.title}
                          </h4>
                          <p className="mt-1 text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>

                <Reveal className="mt-14 border-l-2 border-gold pl-6 md:pl-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {workshop.caseLab.exclusiveTitle}
                  </h3>
                  <div className="mt-4 space-y-4 text-foreground/85 leading-relaxed">
                    {workshop.caseLab.exclusiveParagraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  {/* Sem preço e sem data: é aviso, não botão. Um botão
                      desabilitado só frustraria quem tentasse clicar. */}
                  <p className="mt-5 font-display italic text-gold">
                    {workshop.caseLab.scarcityLabel} {workshop.caseLab.statusNote}
                  </p>
                </Reveal>

                <Reveal className="mt-14 border-t border-foreground/15 pt-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/80">
                      {workshop.caseLab.disclaimerLabel}:
                    </span>{" "}
                    {workshop.caseLab.disclaimer}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

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
          </Reveal>
        </div>
      </section>

      {/* Barra fixa de conversão (mobile) */}
      <div
        className={
          "fixed bottom-0 left-0 right-0 z-40 border-t border-gold/30 bg-background/95 backdrop-blur shadow-[0_-8px_24px_-8px_hsl(212_42%_4%/0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden" +
          (showStickyBar ? " translate-y-0" : " translate-y-full")
        }
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container mx-auto px-4 py-3">
          <a href="#inscricao" className="block">
            <Button variant="hero" size="lg" className="shimmer-sweep w-full gap-2 font-bold shadow-lg">
              Garantir minha vaga
              <ChevronRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>

      <Footer />

      {/* Espaço para a barra fixa no mobile */}
      <div aria-hidden className="h-20 md:hidden" />

      {/* Dados do comprador antes de ir pro checkout da Mercado Pago (ver
          comentário em startCheckout sobre por que isso não pode esperar). */}
      <Dialog
        open={buyerDialogTier !== null}
        onOpenChange={(open) => {
          if (!open) setBuyerDialogTier(null);
        }}
      >
        {/* overflow-x-hidden: com overflow-y-auto, 1px de arredondamento na
            largura já fazia aparecer uma barra de rolagem horizontal. */}
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Quase lá!</DialogTitle>
            <DialogDescription>
              Preencha seus dados para a confirmação da compra. O link de acesso à Imersão vai para o e-mail informado.
            </DialogDescription>
          </DialogHeader>

          <form
            id="checkout-buyer"
            className="space-y-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              confirmBuyer();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="checkout-name">Nome completo</Label>
              <Input
                id="checkout-name"
                autoComplete="name"
                placeholder="Seu nome e sobrenome"
                aria-describedby="checkout-name-hint"
                value={buyerForm.name}
                autoFocus
                onChange={(e) => updateBuyerForm("name", e.target.value)}
              />
              <p id="checkout-name-hint" className="text-xs text-muted-foreground">
                Escreva como deve aparecer no seu certificado.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout-email">E-mail</Label>
              <Input
                id="checkout-email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={buyerForm.email}
                onChange={(e) => updateBuyerForm("email", e.target.value)}
              />
            </div>
            {buyerError && (
              <p role="alert" className="text-sm text-destructive">
                {buyerError}
              </p>
            )}
            {/* Nova aba: navegar aqui fecharia o diálogo e perderia o que foi digitado. */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ao continuar, você concorda com os{" "}
              <a href="/termos-de-compra" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Termos de Compra e Reembolso
              </a>{" "}
              e declara ter lido a{" "}
              <a href="/politica-de-privacidade" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Política de Privacidade
              </a>
              .
            </p>
          </form>

          <DialogFooter>
            <Button
              type="submit"
              form="checkout-buyer"
              variant="hero"
              size="xl"
              className="w-full gap-2 font-bold"
              disabled={checkoutTier !== null}
            >
              {checkoutTier !== null ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Abrindo pagamento…
                </>
              ) : (
                <>
                  Continuar para pagamento
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workshop;
