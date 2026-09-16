import { useState } from "react";
import { Video, Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

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
          className="absolute inset-0 z-20 w-full h-full flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Play video"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground ml-1" />
          </div>
        </button>
      )}

      <iframe
        src={getEmbedUrl(videoUrl)}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
