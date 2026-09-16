import { useState } from "react";
import { Video } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

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

  // Convert YouTube watch URLs to embed URLs
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass-card">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
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
