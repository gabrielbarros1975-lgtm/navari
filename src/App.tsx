import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/auth/auth-context";
import { RequireAuth } from "@/auth/require-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Workshop from "./pages/Workshop";
import Login from "./pages/Login";
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
              <Route path="/login" element={<Login />} />
              {/* Sem auto-cadastro: a conta é criada pela equipe após a compra. */}
              <Route path="/register" element={<Navigate to="/login" replace />} />

              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
