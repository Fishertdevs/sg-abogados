export interface Review {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  stars: number;
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

/** Submit a new review. It is stored as "pending" until the admin approves it. */
export async function submitReview(review: NewReview): Promise<void> {
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
}
