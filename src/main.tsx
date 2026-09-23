import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Por padrão o navegador devolve a pessoa para onde ela estava ao recarregar.
// Numa landing isso atrapalha: a abertura do hero e o pergaminho lacrado do
// celular são justamente o começo da história, e quem recarregava caía no
// meio da página. Com "manual" a recarga sempre começa do topo.
//
// Links com âncora (#inscricao, #faq) continuam funcionando: quando há hash
// na URL, o próprio navegador rola até a seção depois de carregar.
//
// Fica aqui (em vez de um <script> inline no index.html) porque um CSP com
// nonce — como o que a Vercel aplica quando o Firewall está ativo — bloqueia
// scripts inline sem nonce; este arquivo já carrega via <script type="module">
// e passa normalmente.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(<App />);
