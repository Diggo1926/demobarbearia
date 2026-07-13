/**
 * Conjunto de ícones SVG inline (stroke="currentColor") para não depender
 * de requisições externas. Cada ícone é um fragmento <svg> pronto para uso.
 */

const ICONS = {
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.5 15.5"/><path d="M8.5 8.5L20 20"/></svg>`,
  razor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L14 10"/><path d="M14 10L18 6a2 2 0 0 1 3 3l-4 4"/><path d="M4 20l3-1 7-7-2-2-7 7Z"/></svg>`,
  combo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="M18 4L8 14"/><path d="M8 10L18 20"/></svg>`,
  brow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14c2-5 6-7 10-7s7 2 8 4"/><path d="M4 17c1.5-2 4-3 7-3"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10.5c0 5.5-8 11.5-8 11.5s-8-6-8-11.5a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.5" r="2.6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.6 4.6-2 1.6a12 12 0 0 0 6.2 6.2l1.6-2L20 16v3a1.6 1.6 0 0 1-1.7 1.6A16 16 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6.1 6.6.7-5 4.6 1.4 6.6-5.9-3.4-5.9 3.4 1.4-6.6-5-4.6 6.6-.7Z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 6.5"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5A9.5 9.5 0 0 0 3.6 17l-1.1 4.5 4.6-1.2A9.5 9.5 0 1 0 12 2.5Zm0 1.9a7.6 7.6 0 1 1 0 15.2 7.5 7.5 0 0 1-3.9-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.6 7.6 0 0 1 12 4.4Zm-2.2 3c-.2 0-.5 0-.7.3-.2.3-.9.8-.9 2s.9 2.3 1 2.5c.1.2 1.8 2.8 4.5 3.8 2.2.9 2.7.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-.6.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4Z"/></svg>`,
  loader: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>`,
  empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 3"/><path d="M9 15l2-2 2 2 2-4"/></svg>`,
};

export default ICONS;
