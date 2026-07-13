/** Registra o service worker apenas se o navegador suportar, com fallback silencioso. */

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      /* ambiente sem suporte a service worker (ex.: file://) — ignorado silenciosamente */
    });
  });
}
