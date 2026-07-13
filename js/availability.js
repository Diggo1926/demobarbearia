/**
 * Simulação de disponibilidade — tudo em memória, nada é enviado ou
 * consultado externamente. Gera os próximos dias e, para cada data,
 * os horários possíveis com base no funcionamento e na duração do
 * serviço, marcando parte deles como ocupados de forma determinística.
 */

import CONFIG from "../config.js";
import { configHoursIndex, seededRandom } from "./utils.js";

const DAYS_AHEAD = 14;
const SLOT_STEP_MIN = 30;

export function getUpcomingDays(count = DAYS_AHEAD) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export function getHoursForDate(date) {
  const entry = CONFIG.hours[configHoursIndex(date)];
  if (!entry || !entry.open || !entry.close) return null;
  return entry;
}

export function isDayOpen(date) {
  return getHoursForDate(date) !== null;
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Gera os horários do dia para um serviço e barbeiro específicos.
 * O padrão de horários ocupados é determinístico (seed = data + barbeiro + serviço)
 * para que a tela não mude a cada nova renderização.
 */
export function generateSlots(date, service, barberId) {
  const hours = getHoursForDate(date);
  if (!hours) return [];

  const openMin = toMinutes(hours.open);
  const closeMin = toMinutes(hours.close);
  const duration = service.duration;

  const seedKey = `${date.toDateString()}|${barberId}|${service.id}`;
  const rand = seededRandom(seedKey);

  const now = new Date();
  const isToday =
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const slots = [];
  for (let start = openMin; start + duration <= closeMin; start += SLOT_STEP_MIN) {
    if (isToday && start <= nowMin + 15) continue;
    const busy = rand() < 0.32;
    slots.push({ time: toHHMM(start), busy });
  }
  return slots;
}
