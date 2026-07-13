/**
 * Renderiza cada etapa do fluxo de agendamento como HTML string.
 * A interatividade é resolvida por delegação de eventos em app.js,
 * usando os atributos data-* emitidos aqui.
 */

import CONFIG from "../config.js";
import ICONS from "./icons.js";
import { initials, avatarColor } from "./avatar.js";
import { generateSlots, isDayOpen } from "./availability.js";
import {
  formatBRL,
  formatDuration,
  formatDateChip,
  formatDateLong,
  formatPhoneInput,
} from "./utils.js";

export const STEP_LABELS = ["Serviço", "Barbeiro", "Data e hora", "Seus dados", "Confirmação"];

export function renderProgress(step) {
  return `
    <ol class="progress" aria-label="Etapas do agendamento">
      ${STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "current" : "upcoming";
        return `
        <li class="progress__item progress__item--${state}">
          <span class="progress__dot">${state === "done" ? ICONS.check : n}</span>
          <span class="progress__label">${label}</span>
        </li>`;
      }).join("")}
    </ol>`;
}

export function renderServiceStep(state) {
  return `
    <div class="step">
      <h2 class="step__title">Escolha o serviço</h2>
      <p class="step__hint">Selecione o serviço desejado para continuar.</p>
      <div class="option-grid">
        ${CONFIG.services
          .map((s) => {
            const selected = state.serviceId === s.id;
            return `
          <button type="button" class="option-card ${selected ? "is-selected" : ""}" data-select-service="${s.id}">
            <span class="option-card__icon">${ICONS[s.icon] || ICONS.scissors}</span>
            <span class="option-card__body">
              <span class="option-card__name">${s.name}</span>
              <span class="option-card__desc">${s.description}</span>
            </span>
            <span class="option-card__meta">
              <span class="option-card__duration">${formatDuration(s.duration)}</span>
              <span class="option-card__price">${formatBRL(s.price)}</span>
            </span>
          </button>`;
          })
          .join("")}
      </div>
    </div>`;
}

export function renderBarberStep(state) {
  return `
    <div class="step">
      <h2 class="step__title">Escolha o profissional</h2>
      <p class="step__hint">Todos os barbeiros atendem o serviço selecionado.</p>
      <div class="option-grid option-grid--barbers">
        ${CONFIG.barbers
          .map((b) => {
            const selected = state.barberId === b.id;
            return `
          <button type="button" class="barber-option ${selected ? "is-selected" : ""}" data-select-barber="${b.id}">
            <span class="barber-option__avatar" style="--avatar-color:${avatarColor(b)}">${initials(b.name)}</span>
            <span class="barber-option__name">${b.name}</span>
            <span class="barber-option__specialty">${b.specialty}</span>
          </button>`;
          })
          .join("")}
      </div>
    </div>`;
}

export function renderDateTimeStep(state, days) {
  const service = CONFIG.services.find((s) => s.id === state.serviceId);
  const selectedDate = state.date;

  const dateChips = days
    .map((d) => {
      const open = isDayOpen(d);
      const chip = formatDateChip(d);
      const selected = selectedDate && d.toDateString() === selectedDate.toDateString();
      return `
      <button type="button" class="date-chip ${selected ? "is-selected" : ""}" ${
        open ? `data-select-date="${d.toISOString()}"` : "disabled"
      }>
        <span class="date-chip__weekday">${chip.weekday}</span>
        <span class="date-chip__day">${chip.day}</span>
        <span class="date-chip__month">${chip.month}</span>
      </button>`;
    })
    .join("");

  let slotsHtml = `
    <div class="empty-state">
      ${ICONS.empty}
      <p>Selecione uma data para ver os horários disponíveis.</p>
    </div>`;

  if (selectedDate && service) {
    const slots = generateSlots(selectedDate, service, state.barberId);
    if (slots.length === 0) {
      slotsHtml = `
        <div class="empty-state">
          ${ICONS.empty}
          <p>Não há mais horários disponíveis nesta data. Escolha outro dia.</p>
        </div>`;
    } else {
      slotsHtml = `
        <div class="time-grid">
          ${slots
            .map((slot) => {
              const selected = state.time === slot.time;
              return `
            <button type="button" class="time-slot ${selected ? "is-selected" : ""}" ${
              slot.busy ? "disabled" : `data-select-time="${slot.time}"`
            }>${slot.time}</button>`;
            })
            .join("")}
        </div>`;
    }
  }

  return `
    <div class="step">
      <h2 class="step__title">Escolha data e horário</h2>
      <p class="step__hint">Disponibilidade dos próximos 14 dias.</p>
      <div class="date-scroller">${dateChips}</div>
      <div class="time-section">
        ${selectedDate ? `<p class="time-section__date">${formatDateLong(selectedDate)}</p>` : ""}
        ${slotsHtml}
      </div>
    </div>`;
}

export function renderCustomerStep(state) {
  return `
    <div class="step">
      <h2 class="step__title">Seus dados</h2>
      <p class="step__hint">Usados apenas para confirmar o seu horário.</p>
      <form class="customer-form" id="customer-form" novalidate>
        <div class="field">
          <label for="input-name">Nome completo</label>
          <input type="text" id="input-name" name="name" autocomplete="name" placeholder="Digite seu nome" value="${state.customer.name}" />
          <span class="field__error" data-error-for="name"></span>
        </div>
        <div class="field">
          <label for="input-phone">Telefone / WhatsApp</label>
          <input type="tel" id="input-phone" name="phone" autocomplete="tel" placeholder="(11) 90000-0000" value="${state.customer.phone}" />
          <span class="field__error" data-error-for="phone"></span>
        </div>
        <p class="field__note">Este é um ambiente de demonstração: nenhum dado é enviado ou armazenado.</p>
      </form>
    </div>`;
}

export function renderConfirmStep(state) {
  const service = CONFIG.services.find((s) => s.id === state.serviceId);
  const barber = CONFIG.barbers.find((b) => b.id === state.barberId);

  return `
    <div class="step">
      <h2 class="step__title">Confirme o agendamento</h2>
      <p class="step__hint">Revise os detalhes antes de confirmar.</p>
      <dl class="summary">
        <div class="summary__row">
          <dt>Serviço</dt>
          <dd>${service.name} <button type="button" class="link-edit" data-edit-step="1">alterar</button></dd>
        </div>
        <div class="summary__row">
          <dt>Profissional</dt>
          <dd>${barber.name} <button type="button" class="link-edit" data-edit-step="2">alterar</button></dd>
        </div>
        <div class="summary__row">
          <dt>Data e horário</dt>
          <dd>${formatDateLong(state.date)}, ${state.time} <button type="button" class="link-edit" data-edit-step="3">alterar</button></dd>
        </div>
        <div class="summary__row summary__row--total">
          <dt>Valor total</dt>
          <dd>${formatBRL(service.price)}</dd>
        </div>
      </dl>
      <button type="button" class="btn btn--primary btn--block" id="confirm-btn" data-confirm>
        <span class="btn__label">Confirmar agendamento</span>
      </button>
    </div>`;
}

export function renderSuccessStep(state) {
  const service = CONFIG.services.find((s) => s.id === state.serviceId);
  const barber = CONFIG.barbers.find((b) => b.id === state.barberId);

  return `
    <div class="step step--success">
      <span class="success-check">${ICONS.check}</span>
      <h2 class="step__title">Agendamento confirmado</h2>
      <p class="step__hint">Enviamos os detalhes para o telefone informado. Chegue com 10 minutos de antecedência.</p>
      <dl class="summary summary--recap">
        <div class="summary__row"><dt>Serviço</dt><dd>${service.name}</dd></div>
        <div class="summary__row"><dt>Profissional</dt><dd>${barber.name}</dd></div>
        <div class="summary__row"><dt>Quando</dt><dd>${formatDateLong(state.date)}, ${state.time}</dd></div>
        <div class="summary__row summary__row--total"><dt>Valor</dt><dd>${formatBRL(service.price)}</dd></div>
      </dl>
      <div class="success-actions">
        <button type="button" class="btn btn--ghost" data-restart-home>Voltar ao início</button>
        <button type="button" class="btn btn--primary" data-restart-booking>Novo agendamento</button>
      </div>
    </div>`;
}

export function formatPhoneValue(value) {
  return formatPhoneInput(value);
}
