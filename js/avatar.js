/** Gera iniciais e cor de avatar a partir do nome — sem depender de fotos reais. */

export function initials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function avatarColor(barber) {
  return barber.color || "var(--color-secondary)";
}
