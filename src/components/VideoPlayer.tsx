import { useEffect, useRef, useState } from "react";
import { Video, Play } from "lucide-react";

const VIMEO_ORIGIN = "https://player.vimeo.com";

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /*
   * Ao terminar, o Vimeo cobre o vídeo com a tela final da conta que publicou
   * ("Mais de ...", botão de seguir) — que não tem nada a ver com esta página.
   * Aqui a gente escuta o fim pela API de postMessage do player e volta ao
   * estado inicial: o src perde o autoplay, o iframe recarrega no primeiro
   * quadro e o nosso botão de play reaparece.
   *
   * Precisa vir antes de qualquer return condicional: hook não pode ficar
   * atrás de early return.
   */
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;

      let data: { event?: string };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      // O player só aceita inscrição em eventos depois de avisar que está pronto.
      if (data?.event === "ready") {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "ended" }),
          VIMEO_ORIGIN
        );
      }

      if (data?.event === "ended") setIsPlaying(false);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!videoUrl) {
    return (
      <div className="aspect-video rounded-xl glass-card flex flex-col items-center justify-center gap-3 text-center px-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Video className="w-6 h-6 text-primary" />
        </div>
        <p className="font-medium">Vídeo em breve</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          A gravação desta aula ainda não foi publicada.
        </p>
      </div>
    );
  }

  // Convert YouTube and Vimeo watch URLs to embed URLs
  const getEmbedUrl = (url: string) => {
    let embedUrl = url;
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
    } else if (url.includes("vimeo.com/")) {
      const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      const videoId = match ? match[1] : url.split("vimeo.com/")[1]?.split("?")[0];
      embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&controls=0&dnt=1`;
    }
    
    if (isPlaying) {
      embedUrl += embedUrl.includes("?") ? "&autoplay=1" : "?autoplay=1";
    }
    
    return embedUrl;
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass-card group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {!isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 z-20 w-full h-full flex items-end justify-start p-3 sm:p-4 bg-black/20 hover:bg-black/10 active:bg-black/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Play video"
        >
          {/*
            Fora do centro, pequeno e translúcido: a capa é um close do rosto do
            Wyllian bem no meio do quadro, e um botão sólido centralizado caía
            em cima dele — no celular, direto na boca. No canto ele nunca
            disputa com o enquadramento, seja qual for o vídeo.
            A área clicável continua sendo o vídeo inteiro (inset-0), então
            encolher e deslocar o círculo não reduz o alvo de toque.
          */}
          <div className="relative w-9 h-9 sm:w-12 sm:h-12">
            <div className="play-pulse absolute inset-0" />
            <div className="relative w-full h-full bg-primary/75 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 group-hover:bg-primary">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        </button>
      )}

      <iframe
        ref={iframeRef}
        src={getEmbedUrl(videoUrl)}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => {
          setIsLoading(false);
          // Rede de segurança: se o "ready" tiver chegado antes do listener,
          // a inscrição no "ended" se perderia.
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ method: "addEventListener", value: "ended" }),
            VIMEO_ORIGIN
          );
        }}
      />
    </div>
  );
}
