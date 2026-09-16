import { Video, CalendarClock, Award, Shield } from "lucide-react";

/** Recursos da plataforma. Fonte única, usada na home e na página do workshop. */
const platformFeatures = [
  {
    icon: Video,
    title: "Aulas gravadas",
    description: "Organizadas por módulos, sem prazo para concluir.",
  },
  {
    icon: CalendarClock,
    title: "Encontros ao vivo",
    description: "Lives mensais para tirar dúvidas e ver casos práticos.",
  },
  {
    icon: Award,
    title: "Certificado digital",
    description: "Emitido ao concluir cada curso.",
  },
  {
    icon: Shield,
    title: "Conteúdo especializado",
    description: "Feito por quem atua em registro de imóveis.",
  },
];

export function PlatformFeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {platformFeatures.map((feature, index) => (
        <div key={index} className="glass-card-hover p-6 space-y-3">
          <div className="w-11 h-11 rounded-lg border border-border flex items-center justify-center">
            <feature.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-base">{feature.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
