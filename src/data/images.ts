/**
 * Imagens provisórias, servidas pelo Unsplash (licença permite uso comercial).
 *
 * TODO: substituir por fotos próprias (cartório, o Dr. Wyllian, o evento).
 * Depender de um domínio de terceiro deixa a página refém da disponibilidade
 * deles; para produção, o ideal é baixar, comprimir e servir do nosso domínio.
 */
const unsplash = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70&w=${w}` +
  (h ? `&h=${h}` : "");

/** Arte oficial do curso: capa do vídeo enquanto a gravação não sai. */
export const cursoThumb = "/curso-thumb.jpg";

/** Marca NAVA completa (monograma + nome), para compartilhamento e og:image. */
export const navaMarca = "/nava-marca.png";

/**
 * Só o monograma, para o cabeçalho e o rodapé: em 40px de altura a palavra
 * "NAVA" da marca completa ficaria ilegível, e o nome já aparece ao lado.
 */
export const navaMonograma = "/nava-monograma.png";

export const images = {
  /** Prédio em construção: fundo da capa do vídeo. */
  workshopThumb: unsplash("photo-1508450859948-4e04fabaa4ea", 1200, 675),
  /** Edifício em ângulo baixo: fundo da seção "Por que". */
  edificio: unsplash("photo-1545324418-cc1a3fa10c00", 1600),
  /** Planta arquitetônica: fundo da seção da plataforma. */
  planta: unsplash("photo-1721244654392-9c912a6eb236", 1600),
};
