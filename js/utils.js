/**
 * Funções utilitárias puras: formatação, validação e um gerador
 * pseudoaleatório com seed para que a "disponibilidade" simulada
 * seja estável entre re-renderizações (mesmo dia + barbeiro + serviço
 * sempre produz o mesmo padrão de horários ocupados).
 */

export function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

const WEEKDAY_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const WEEKDAY_LONG = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const MONTH_SHORT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export function weekdayShort(date) {
  return WEEKDAY_SHORT[date.getDay()];
}

export function weekdayLong(date) {
  return WEEKDAY_LONG[date.getDay()];
}

export function formatDateLong(date) {
  const str = `${weekdayLong(date)}, ${date.getDate()} de ${monthLong(date)}`;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function monthLong(date) {
  const MONTH_LONG = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return MONTH_LONG[date.getMonth()];
}

export function formatDateChip(date) {
  return { weekday: weekdayShort(date), day: date.getDate(), month: MONTH_SHORT[date.getMonth()] };
}

export function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Converte Date.getDay() (0=domingo) para o índice usado em CONFIG.hours (0=segunda). */
export function configHoursIndex(date) {
  return (date.getDay() + 6) % 7;
}

export function validateName(name) {
  const trimmed = name.trim();
  return trimmed.length >= 3 && /[a-zA-ZÀ-ÿ]/.test(trimmed);
}

export function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

export function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Hash simples de string para uso como seed numérica. */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/** PRNG determinístico (mulberry32) — mesma seed sempre gera a mesma sequência. */
export function seededRandom(seedString) {
  let seed = hashString(seedString);
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
