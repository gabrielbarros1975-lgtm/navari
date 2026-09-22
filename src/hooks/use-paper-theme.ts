import { useLayoutEffect } from "react";

/**
 * Aplica o tema claro ("papel") enquanto a página estiver montada. As páginas
 * que não usam o hook seguem no tema escuro do :root.
 *
 * O tema vai em <html>, e não num wrapper, para o fundo do body e o overscroll
 * do celular também ficarem claros.
 *
 * No carregamento direto quem aplica a classe é o script do index.html, antes
 * da primeira pintura — a lista de caminhos de lá precisa acompanhar as páginas
 * que usam este hook, senão elas piscam de navy para creme ao abrir. O hook
 * cobre a navegação interna e a limpeza ao sair.
 *
 * Na navegação interna os elementos podem ter nascido com as cores do tema
 * anterior; trocar a classe com eles montados fazia tudo que tem
 * transition-colors animar de um tema para o outro. "theme-switching" desliga
 * as transições só durante a troca, e o reflow forçado fixa as cores novas
 * antes de elas voltarem.
 */
export function usePaperTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const setPaperTheme = (on: boolean) => {
      root.classList.add("theme-switching");
      root.classList.toggle("theme-paper", on);
      void root.offsetHeight;
      root.classList.remove("theme-switching");
    };
    setPaperTheme(true);
    return () => setPaperTheme(false);
  }, []);
}
