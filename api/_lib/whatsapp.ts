/**
 * Sends a WhatsApp message to the admin through the Twilio REST API.
 * Uses fetch (no SDK) to keep the serverless bundle small.
 */

/** Returns a Spanish greeting based on the current hour in Bogotá (UTC-5). */
export function greetingForNow(date = new Date()): string {
  // Convert to America/Bogota local hour (UTC-5, no DST).
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
  approveUrl: string;
  rejectUrl: string;
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
    `¿Deseas aprobar o eliminar la reseña?\n\n` +
    `✅ Aprobar: ${input.approveUrl}\n` +
    `🗑️ Eliminar: ${input.rejectUrl}`
  );
}

/** Sends a WhatsApp message via Twilio. Throws if Twilio is not configured. */
export async function sendWhatsApp(body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    throw new Error(
      "Twilio is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM and ADMIN_WHATSAPP_TO.",
    );
  }

  const normalize = (n: string) =>
    n.startsWith("whatsapp:") ? n : `whatsapp:${n}`;

  const params = new URLSearchParams({
    From: normalize(from),
    To: normalize(to),
    Body: body,
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Twilio error ${res.status}: ${detail}`);
  }
}
