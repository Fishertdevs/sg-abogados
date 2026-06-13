/**
 * Builds a WhatsApp notification for the admin WITHOUT any external API.
 * The frontend opens the resulting wa.me link so the message is pre-filled
 * and addressed to the admin number — no Twilio or paid service required.
 */

/** Admin WhatsApp number (Colombia). Override with ADMIN_WHATSAPP_TO env var. */
function adminNumber(): string {
  const raw = process.env.ADMIN_WHATSAPP_TO ?? "573112512939";
  // wa.me expects digits only (country code + number, no "+" or spaces).
  return raw.replace(/[^\d]/g, "");
}

/** Returns a Spanish greeting based on the current hour in Bogotá (UTC-5). */
export function greetingForNow(date = new Date()): string {
  const bogotaHour = Number(
    new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      hour: "numeric",
      hour12: false,
    }).format(date),
  );

  if (bogotaHour >= 5 && bogotaHour < 12) return "Buenos días";
  if (bogotaHour >= 12 && bogotaHour < 19) return "Buenas tardes";
  return "Buenas noches";
}

export interface ReviewMessageInput {
  name: string;
  role?: string | null;
  quote: string;
  stars: number;
  adminUrl: string;
}

/** Builds the admin notification body for a new review. */
export function buildReviewMessage(input: ReviewMessageInput): string {
  const greeting = greetingForNow();
  const starLine = "⭐".repeat(Math.max(1, Math.min(5, input.stars)));
  const roleLine = input.role ? ` (${input.role})` : "";

  return (
    `${greeting}.\n\n` +
    `El usuario *${input.name}*${roleLine} ha escrito una reseña:\n\n` +
    `${starLine}\n` +
    `"${input.quote}"\n\n` +
    `Para aprobarla o eliminarla, ingresa al panel:\n${input.adminUrl}`
  );
}

/** Builds a wa.me deep link that opens WhatsApp with the message pre-filled. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${adminNumber()}?text=${encodeURIComponent(message)}`;
}
