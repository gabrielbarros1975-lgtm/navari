import { useLayoutEffect } from "react";
import Workshop from "./Workshop";

/**
 * Landing alternativa (/v2) para o cliente comparar: mesmo conteúdo da página
 * principal, em tema claro construído sobre a marca em azul e dourado.
 *
 * O tema entra em <html> — e não num wrapper — para que o fundo do body e o
 * overscroll do celular também fiquem claros. Sem isso, o navy da página
 * padrão vazaria nas bordas ao puxar a rolagem além do fim.
 *
 * No carregamento direto quem aplica a classe é o script do index.html, antes
 * da primeira pintura. Aqui cobrimos a navegação interna (ex.: vir do menu),
 * com layout effect para entrar antes da pintura também nesse caso.
 */
const WorkshopV2 = () => {
  useLayoutEffect(() => {
    document.documentElement.classList.add("theme-paper");
    return () => document.documentElement.classList.remove("theme-paper");
  }, []);

  return <Workshop variant="paper" />;
};

export default WorkshopV2;
