/**
 * Renderiza as seções dinâmicas da landing page (serviços, equipe,
 * avaliações e rodapé) a partir de config.js.
 */

import CONFIG from "../config.js";
import ICONS from "./icons.js";
import { formatBRL, formatDuration } from "./utils.js";
import { initials, avatarColor } from "./avatar.js";

export function renderHome() {
  renderServices();
  renderTeam();
  renderReviews();
  renderFooter();
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = CONFIG.services
    .map(
      (s) => `
    <article class="service-card" data-service-id="${s.id}">
      <div class="service-card__media" data-state="loading">
        <img class="service-card__image" src="${s.imagem}" alt="${s.name}" loading="lazy" />
        <span class="service-card__media-overlay"></span>
        <span class="service-card__media-fallback">${s.name}</span>
      </div>
      <div class="service-card__body">
        <h3 class="service-card__name">${s.name}</h3>
        <p class="service-card__desc">${s.description}</p>
        <div class="service-card__meta">
          <span class="service-card__duration">${ICONS.clock}${formatDuration(s.duration)}</span>
          <span class="service-card__price">${formatBRL(s.price)}</span>
        </div>
      </div>
    </article>`
    )
    .join("");

  grid.querySelectorAll(".service-card__media").forEach((media) => {
    const img = media.querySelector("img");
    if (img.complete) {
      media.dataset.state = img.naturalWidth > 0 ? "loaded" : "error";
      return;
    }
    img.addEventListener("load", () => (media.dataset.state = "loaded"), { once: true });
    img.addEventListener("error", () => (media.dataset.state = "error"), { once: true });
  });
}

function renderTeam() {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = CONFIG.barbers
    .map(
      (b) => `
    <article class="barber-card">
      <div class="barber-card__avatar" style="--avatar-color:${avatarColor(b)}">${initials(b.name)}</div>
      <h3 class="barber-card__name">${b.name}</h3>
      <p class="barber-card__specialty">${b.specialty}</p>
    </article>`
    )
    .join("");
}

function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  grid.innerHTML = CONFIG.reviews
    .map(
      (r) => `
    <article class="review-card">
      <div class="review-card__stars" aria-label="${r.rating} de 5 estrelas">${starRow(r.rating)}</div>
      <p class="review-card__comment">&ldquo;${r.comment}&rdquo;</p>
      <p class="review-card__name">${r.name}</p>
    </article>`
    )
    .join("");
}

function starRow(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += `<span class="star ${i <= rating ? "star--filled" : ""}">${ICONS.star}</span>`;
  }
  return out;
}

function renderFooter() {
  const addr = document.getElementById("footer-address");
  if (addr) {
    addr.innerHTML = `<a href="${CONFIG.business.mapUrl}" target="_blank" rel="noopener">${ICONS.mapPin}${CONFIG.business.address}</a>`;
  }

  const phone = document.getElementById("footer-phone");
  if (phone) {
    phone.innerHTML = `<a href="tel:+55${CONFIG.business.whatsapp}">${ICONS.phone}${CONFIG.business.phone}</a>`;
  }

  const insta = document.getElementById("footer-instagram");
  if (insta) {
    insta.innerHTML = `<a href="#">${ICONS.instagram}${CONFIG.business.instagram}</a>`;
  }

  const hoursList = document.getElementById("footer-hours");
  if (hoursList) {
    hoursList.innerHTML = CONFIG.hours
      .map(
        (h) => `
      <li class="hours-row">
        <span>${h.day}</span>
        <span>${h.open ? `${h.open} &ndash; ${h.close}` : "Fechado"}</span>
      </li>`
      )
      .join("");
  }

  const year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();
}
