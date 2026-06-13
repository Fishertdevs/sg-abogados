export interface Review {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  stars: number;
}

export interface AdminReview extends Review {
  status: "pending" | "approved";
  createdAt: string;
}

export interface NewReview {
  name: string;
  role: string;
  quote: string;
  stars: number;
}

/**
 * Fetch approved reviews from the serverless API.
 * Returns an empty array when the API is unavailable (e.g. the Vite dev
 * preview where /api functions don't run), so the UI can fall back to the
 * built-in static testimonials without throwing.
 */
export async function fetchApprovedReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews", {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.reviews) ? (data.reviews as Review[]) : [];
}

/**
 * Submit a new review. It is stored as "pending" until the admin approves it
 * from the /admin panel. Returns a wa.me URL the caller can open to notify the
 * admin via WhatsApp (no external API involved).
 */
export async function submitReview(
  review: NewReview,
): Promise<{ whatsappUrl?: string }> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) {
    let message = "No se pudo enviar la reseña. Intenta de nuevo.";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message);
  }
  const data = await res.json().catch(() => ({}));
  return { whatsappUrl: data?.whatsappUrl };
}

/* ─── Admin API (protected by a shared password) ─────────────── */

async function adminRequest(
  password: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch("/api/admin/reviews", {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      ...(init?.headers ?? {}),
    },
  });
}

/** List all pending + approved reviews. Throws "unauthorized" on a wrong password. */
export async function fetchAdminReviews(
  password: string,
): Promise<AdminReview[]> {
  const res = await adminRequest(password);
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Error ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data?.reviews) ? (data.reviews as AdminReview[]) : [];
}

/** Approve or delete a review by id. */
export async function moderateReview(
  password: string,
  id: string,
  action: "approve" | "delete",
): Promise<void> {
  const res = await adminRequest(password, {
    method: "POST",
    body: JSON.stringify({ id, action }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? "No se pudo procesar la acción.");
  }
}
