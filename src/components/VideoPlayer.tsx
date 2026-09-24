import { useEffect, useRef, useState } from "react";
import { Video, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const VIMEO_ORIGIN = "https://player.vimeo.com";

function postToPlayer(iframe: HTMLIFrameElement | null, message: object) {
  iframe?.contentWindow?.postMessage(message, VIMEO_ORIGIN);
}

/*
 * Quanto antes do fim o player volta para a capa. O timeupdate chega a cada
 * ~250ms, então uma janela de 0,35s sempre recebe pelo menos um aviso.
 */
const END_MARGIN_S = 0.35;

/*
 * Formato de objeto, o mesmo que o SDK oficial do Vimeo usa. A inscrição só
 * vale depois do "ready" do player, por isso é chamada tanto nele quanto no
 * onLoad do iframe (se o "ready" chegar antes, a do onLoad garante).
 * timeupdate/ended: fim do vídeo; play/volumechange: estado do som.
 */
function subscribeToPlayer(iframe: HTMLIFrameElement | null) {
  for (const value of ["timeupdate", "ended", "play", "volumechange"]) {
    postToPlayer(iframe, { method: "addEventListener", value });
  }
}

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
  /**
   * Capa exibida até o play. Com ela o iframe só é montado no clique: antes ele
   * carregava na abertura da página e era recarregado de qualquer jeito ao dar
   * play (o src ganha autoplay), então o primeiro carregamento era desperdício.
   */
  poster?: string;
}

export function VideoPlayer({ videoUrl, title, poster }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /*
   * O player não tem controles do Vimeo (controls=0), então o som tem botão
   * próprio. É ele que resolve o iPhone: o iOS não deixa o vídeo começar
   * sozinho com som, o autoplay cai para mudo, e não havia onde ligar o áudio
   * (nem com controls=1: no celular a barra do Vimeo não tem botão de som).
   * null = ainda não sabemos; o botão só aparece com o estado real do player.
   */
  const [isMuted, setIsMuted] = useState<boolean | null>(null);

  /*
   * Ao terminar, o Vimeo cobre o vídeo com a tela final da conta que publicou
   * ("Mais de ...", botão de seguir) — que não tem nada a ver com esta página.
   *
   * Voltar ao estado inicial no "ended" não basta: ele só chega depois que o
   * vídeo acabou, quando a tela final já foi desenhada. Por isso a volta
   * acontece pelo timeupdate, um instante antes do fim, e a tela final nunca
   * aparece. O "ended" fica como rede de segurança.
   *
   * Precisa vir antes de qualquer return condicional: hook não pode ficar
   * atrás de early return.
   */
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;

      let data: {
        event?: string;
        data?: { seconds?: number; duration?: number };
        method?: string;
        value?: unknown;
      };
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (data?.event === "ready") subscribeToPlayer(iframeRef.current);

      // O autoplay só cai para mudo depois de tentar tocar, por isso a
      // pergunta vai no "play", e de novo a cada mudança de volume.
      if (data?.event === "play" || data?.event === "volumechange") {
        postToPlayer(iframeRef.current, { method: "getMuted" });
      }
      if (data?.method === "getMuted" && typeof data.value === "boolean") {
        setIsMuted(data.value);
      }

      if (data?.event === "timeupdate") {
        const { seconds, duration } = data.data ?? {};
        if (seconds != null && duration && duration - seconds <= END_MARGIN_S) {
          setIsPlaying(false);
        }
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

  const showIframe = !poster || isPlaying;

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass-card group">
      {poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {showIframe && isLoading && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center z-10",
            // Com capa, o carregamento acontece por cima dela, sem apagar a arte
            poster ? "bg-black/30" : "bg-card"
          )}
        >
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {!isPlaying && (
        <button
          onClick={() => {
            // O iframe vai montar agora; sem isso o spinner não apareceria na
            // segunda vez (depois do "ended"), porque o load anterior o zerou.
            if (poster) setIsLoading(true);
            // O iframe novo começa sem estado de som conhecido.
            setIsMuted(null);
            setIsPlaying(true);
          }}
          className={cn(
            "absolute inset-0 z-20 w-full h-full flex items-end justify-end p-3 sm:p-4 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
            // A capa é uma arte pronta: véu escuro por cima apagaria o dourado
            poster
              ? "bg-transparent hover:bg-black/10 active:bg-black/15"
              : "bg-black/20 hover:bg-black/10 active:bg-black/20"
          )}
          aria-label="Play video"
        >
          {/*
            Fora do centro, pequeno e translúcido: o rosto do Wyllian fica no
            meio do quadro, e um botão centralizado caía em cima dele. No canto
            inferior direito ele fica sobre o armário escuro — o esquerdo tem a
            assinatura da capa. A área clicável continua sendo o vídeo inteiro
            (inset-0), então o círculo pequeno não reduz o alvo de toque.
          */}
          <div className="relative w-9 h-9 sm:w-12 sm:h-12">
            <div className="play-pulse absolute inset-0" />
            <div className="relative w-full h-full bg-primary/75 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform transition-all group-hover:scale-110 group-hover:bg-primary">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
        </button>
      )}

      {showIframe && (
        <iframe
          ref={iframeRef}
          src={getEmbedUrl(videoUrl)}
          title={title}
          className="relative w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            setIsLoading(false);
            subscribeToPlayer(iframeRef.current);
          }}
        />
      )}

      {/*
        Mesmo canto do botão de play. Mudo, ganha o texto "Ativar som" para
        chamar atenção (é o estado em que o iPhone começa); com som, fica só o
        ícone. O getMuted depois do setMuted confirma o estado real em vez de
        supor que deu certo.
      */}
      {isPlaying && isMuted !== null && (
        <button
          type="button"
          onClick={() => {
            postToPlayer(iframeRef.current, { method: "setMuted", value: !isMuted });
            postToPlayer(iframeRef.current, { method: "getMuted" });
          }}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 inline-flex items-center gap-1.5 h-9 sm:h-10 min-w-9 sm:min-w-10 justify-center rounded-full bg-black/60 hover:bg-black/75 backdrop-blur-sm px-2.5 text-white text-xs sm:text-sm font-semibold shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <>
              <VolumeX aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" />
              Ativar som
            </>
          ) : (
            <Volume2 aria-hidden className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      )}
    </div>
  );
}
