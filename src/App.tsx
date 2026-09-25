import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/auth/auth-context";
import { RequireAuth } from "@/auth/require-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Workshop from "./pages/Workshop";
import PaymentResult from "./pages/PaymentResult";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PurchaseTerms from "./pages/PurchaseTerms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Workshop />} />
              {/* Login e "Minha Área" desativados: eram de demonstração (contas só
                  no navegador, senha em texto aberto). Os arquivos seguem em
                  src/pages para quando houver uma área do aluno de verdade. */}
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              {/* Catálogo é público: quem visita precisa ver o que é oferecido. */}
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/course/:id"
                element={
                  <RequireAuth>
                    <CourseDetail />
                  </RequireAuth>
                }
              />

              {/* Assinatura descontinuada: a venda agora é por curso. */}
              <Route path="/plans" element={<Navigate to="/courses" replace />} />
              <Route path="/workshop" element={<Workshop />} />
              {/* A /v2 foi a prévia do tema claro enviada para aprovação; o tema
                  virou o principal, então o link já compartilhado cai no início. */}
              <Route path="/v2" element={<Navigate to="/" replace />} />
              {/* Retorno do Checkout Pro do Mercado Pago (back_urls). */}
              <Route path="/pagamento" element={<PaymentResult />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos-de-compra" element={<PurchaseTerms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
