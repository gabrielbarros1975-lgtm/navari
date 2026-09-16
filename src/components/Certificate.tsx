import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CertificateProps {
  courseName: string;
  studentName: string;
  completionDate: string;
  instructorName: string;
}

export function Certificate({
  courseName,
  studentName,
  completionDate,
  instructorName,
}: CertificateProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="gradient" size="lg" className="gap-2">
          <Award className="w-5 h-5" />
          Emitir Certificado
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display">Certificado de Conclusão</DialogTitle>
          <DialogDescription>
            Parabéns! Você concluiu o curso com sucesso.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-4 p-8 rounded-xl border-4 border-primary/30 bg-gradient-to-br from-card to-secondary">
          {/* Certificate Design */}
          <div className="absolute top-4 left-4 w-20 h-20 opacity-10">
            <Award className="w-full h-full text-primary" />
          </div>
          <div className="absolute bottom-4 right-4 w-20 h-20 opacity-10">
            <Award className="w-full h-full text-primary" />
          </div>

          <div className="text-center space-y-6 relative z-10">
            <div className="space-y-2">
              <p className="text-primary font-display text-sm tracking-widest uppercase">
                Certificado de Conclusão
              </p>
              <h2 className="font-display text-3xl font-bold gradient-text">
                Dr. Wyllian Nava
              </h2>
            </div>

            <div className="py-4">
              <p className="text-muted-foreground">Certificamos que</p>
              <h3 className="font-display text-2xl font-bold mt-2">{studentName}</h3>
            </div>

            <div>
              <p className="text-muted-foreground">concluiu com êxito o curso</p>
              <h4 className="font-display text-xl font-semibold mt-2 text-primary">
                {courseName}
              </h4>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div>
                  <p>Data de Conclusão</p>
                  <p className="font-semibold text-foreground">{completionDate}</p>
                </div>
                <div>
                  <p>Instrutor</p>
                  <p className="font-semibold text-foreground">{instructorName}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-muted-foreground">ID do Certificado</p>
                <p className="font-mono text-sm text-primary">
                  CERT-{new Date().getFullYear()}-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1 gap-2">
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
          <Button variant="gradient" className="flex-1 gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
