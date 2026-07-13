/**
 * Aplica a marca de config.js ao documento: variáveis CSS de cor,
 * título da página, meta theme-color, textos de marca e favicon.
 * Nenhum outro módulo deve ler cores diretamente do config — todos
 * consomem as variáveis CSS que este módulo define.
 */

import CONFIG from "../config.js";

export function applyTheme() {
  const root = document.documentElement;
  const c = CONFIG.colors;

  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-primary-light", c.primaryLight);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-accent", c.accent);
  root.style.setProperty("--color-bg", c.background);
  root.style.setProperty("--color-surface", c.surface);
  root.style.setProperty("--color-text", c.text);
  root.style.setProperty("--color-text-muted", c.textMuted);
  root.style.setProperty("--color-border", c.border);
  root.style.setProperty("--color-success", c.success);
  root.style.setProperty("--color-error", c.error);

  document.title = `${CONFIG.business.name} — Agendamento online`;

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute("content", c.primary);

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute(
      "content",
      `${CONFIG.business.name} — ${CONFIG.business.slogan}. Agende seu horário online em poucos passos.`
    );
  }

  document.querySelectorAll("[data-bind-business-name]").forEach((el) => {
    el.textContent = CONFIG.business.name;
  });
  document.querySelectorAll("[data-bind-short-name]").forEach((el) => {
    el.textContent = CONFIG.business.shortName;
  });
  document.querySelectorAll("[data-bind-slogan]").forEach((el) => {
    el.textContent = CONFIG.business.slogan;
  });
}
