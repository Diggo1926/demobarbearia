/**
 * Controlador principal: mantém o estado do agendamento, navega entre
 * etapas e delega os eventos de clique/input vindos do HTML renderizado
 * pelos módulos de render-*.js. Ponto de entrada carregado por index.html.
 */

import CONFIG from "../config.js";
import { applyTheme } from "./theme.js";
import { renderHome } from "./render-home.js";
import {
  STEP_LABELS,
  renderProgress,
  renderServiceStep,
  renderBarberStep,
  renderDateTimeStep,
  renderCustomerStep,
  renderConfirmStep,
  renderSuccessStep,
  formatPhoneValue,
} from "./render-booking.js";
import { getUpcomingDays } from "./availability.js";
import { validateName, validatePhone } from "./utils.js";
import { registerServiceWorker } from "./pwa.js";

const STEP = { HOME: 0, SERVICE: 1, BARBER: 2, DATETIME: 3, CUSTOMER: 4, CONFIRM: 5, SUCCESS: 6 };
const UPCOMING_DAYS = getUpcomingDays(14);

function initialState() {
  return {
    step: STEP.HOME,
    serviceId: null,
    barberId: null,
    date: null,
    time: null,
    customer: { name: "", phone: "" },
    errors: {},
    submitting: false,
  };
}

let state = initialState();

const viewHome = document.getElementById("view-home");
const viewBooking = document.getElementById("view-booking");
const progressEl = document.getElementById("booking-progress");
const contentEl = document.getElementById("step-content");
const navBack = document.getElementById("nav-back");
const navNext = document.getElementById("nav-next");

function showView(name) {
  const isBooking = name === "booking";
  viewHome.hidden = isBooking;
  viewBooking.hidden = !isBooking;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startBooking(serviceId) {
  state = initialState();
  if (serviceId) state.serviceId = serviceId;
  state.step = STEP.SERVICE;
  showView("booking");
  renderStep();
}

function goHome() {
  state = initialState();
  showView("home");
}

function renderStep() {
  const inBooking = state.step >= STEP.SERVICE && state.step <= STEP.SUCCESS;
  progressEl.style.display = inBooking && state.step <= STEP.CONFIRM ? "" : "none";
  if (inBooking && state.step <= STEP.CONFIRM) {
    progressEl.innerHTML = renderProgress(state.step);
  }

  switch (state.step) {
    case STEP.SERVICE:
      contentEl.innerHTML = renderServiceStep(state);
      break;
    case STEP.BARBER:
      contentEl.innerHTML = renderBarberStep(state);
      break;
    case STEP.DATETIME:
      contentEl.innerHTML = renderDateTimeStep(state, UPCOMING_DAYS);
      break;
    case STEP.CUSTOMER:
      contentEl.innerHTML = renderCustomerStep(state);
      applyFieldErrors();
      break;
    case STEP.CONFIRM:
      contentEl.innerHTML = renderConfirmStep(state);
      break;
    case STEP.SUCCESS:
      contentEl.innerHTML = renderSuccessStep(state);
      break;
  }

  const navEl = document.getElementById("booking-nav");
  if (state.step === STEP.CONFIRM || state.step === STEP.SUCCESS) {
    navEl.style.display = "none";
  } else {
    navEl.style.display = "";
    navBack.disabled = false;
  }

  const heading = contentEl.querySelector(".step__title");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function applyFieldErrors() {
  Object.entries(state.errors).forEach(([field, msg]) => {
    const el = contentEl.querySelector(`[data-error-for="${field}"]`);
    const input = contentEl.querySelector(`#input-${field}`);
    if (el) el.textContent = msg || "";
    if (input) input.classList.toggle("is-invalid", Boolean(msg));
  });
}

function goNext() {
  if (state.step === STEP.SERVICE) {
    if (!state.serviceId) return shakeContent();
    state.step = STEP.BARBER;
  } else if (state.step === STEP.BARBER) {
    if (!state.barberId) return shakeContent();
    state.step = STEP.DATETIME;
  } else if (state.step === STEP.DATETIME) {
    if (!state.date || !state.time) return shakeContent();
    state.step = STEP.CUSTOMER;
  } else if (state.step === STEP.CUSTOMER) {
    const nameInput = document.getElementById("input-name");
    const phoneInput = document.getElementById("input-phone");
    state.customer.name = nameInput.value.trim();
    state.customer.phone = phoneInput.value.trim();

    const errors = {};
    if (!validateName(state.customer.name)) errors.name = "Informe seu nome completo.";
    if (!validatePhone(state.customer.phone)) errors.phone = "Informe um telefone válido com DDD.";
    state.errors = errors;

    if (Object.keys(errors).length > 0) {
      renderStep();
      return;
    }
    state.step = STEP.CONFIRM;
  }
  renderStep();
}

function goBack() {
  if (state.step === STEP.SERVICE) {
    goHome();
    return;
  }
  state.step -= 1;
  renderStep();
}

function shakeContent() {
  contentEl.classList.remove("shake");
  void contentEl.offsetWidth;
  contentEl.classList.add("shake");
}

function submitBooking() {
  const btn = document.getElementById("confirm-btn");
  if (!btn || state.submitting) return;
  state.submitting = true;
  btn.disabled = true;
  btn.classList.add("is-loading");
  btn.innerHTML = `<span class="btn__spinner" aria-hidden="true"></span><span class="btn__label">Confirmando...</span>`;

  window.setTimeout(() => {
    state.submitting = false;
    state.step = STEP.SUCCESS;
    renderStep();
  }, 1200);
}

document.addEventListener("click", (e) => {
  const homeCta = e.target.closest("[data-start-booking]");
  if (homeCta) {
    startBooking(homeCta.getAttribute("data-service-preset") || null);
    return;
  }

  const serviceCard = e.target.closest("#services-grid .service-card");
  if (serviceCard) {
    startBooking(serviceCard.getAttribute("data-service-id"));
    return;
  }

  const selService = e.target.closest("[data-select-service]");
  if (selService) {
    state.serviceId = selService.getAttribute("data-select-service");
    renderStep();
    return;
  }

  const selBarber = e.target.closest("[data-select-barber]");
  if (selBarber) {
    state.barberId = selBarber.getAttribute("data-select-barber");
    renderStep();
    return;
  }

  const selDate = e.target.closest("[data-select-date]");
  if (selDate) {
    state.date = new Date(selDate.getAttribute("data-select-date"));
    state.time = null;
    renderStep();
    return;
  }

  const selTime = e.target.closest("[data-select-time]");
  if (selTime) {
    state.time = selTime.getAttribute("data-select-time");
    renderStep();
    return;
  }

  const editStep = e.target.closest("[data-edit-step]");
  if (editStep) {
    state.step = Number(editStep.getAttribute("data-edit-step"));
    renderStep();
    return;
  }

  if (e.target.closest("[data-confirm]")) {
    submitBooking();
    return;
  }

  if (e.target.closest("[data-restart-home]")) {
    goHome();
    return;
  }

  if (e.target.closest("[data-restart-booking]")) {
    startBooking();
    return;
  }

  if (e.target === navNext) {
    goNext();
    return;
  }

  if (e.target === navBack) {
    goBack();
    return;
  }
});

document.addEventListener("input", (e) => {
  if (e.target.id === "input-phone") {
    const cursorFromEnd = e.target.value.length - e.target.selectionStart;
    e.target.value = formatPhoneValue(e.target.value);
    const pos = Math.max(0, e.target.value.length - cursorFromEnd);
    e.target.setSelectionRange(pos, pos);
  }
});

function init() {
  applyTheme();
  renderHome();
  showView("home");
  registerServiceWorker();
}

document.addEventListener("DOMContentLoaded", init);
