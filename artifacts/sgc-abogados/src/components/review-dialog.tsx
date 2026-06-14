import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/lib/reviews-api";

const BLUE = "#1e56b4";
const BLUE2 = "#163d90";
const TEXT = "#111111";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ReviewDialog({ open, onClose }: ReviewDialogProps) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setStars(0);
    setHover(0);
    setName("");
    setRole("");
    setQuote("");
    setStatus("idle");
    setError(null);
  }

  function handleClose() {
    if (status === "sending") return;
    onClose();
    setTimeout(reset, 350);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (stars < 1) { setError("Por favor selecciona una calificación."); return; }
    if (name.trim().length < 2) { setError("Por favor ingresa tu nombre."); return; }
    if (quote.trim().length < 10) { setError("Tu reseña es muy corta. Cuéntanos un poco más."); return; }

    setStatus("sending");
    const waTab = window.open("", "_blank");

    try {
      const { whatsappUrl } = await submitReview({
        name: name.trim(),
        role: role.trim(),
        quote: quote.trim(),
        stars,
      });

      if (whatsappUrl && waTab && !waTab.closed) {
        waTab.location.href = whatsappUrl;
      } else if (whatsappUrl) {
        window.location.href = whatsappUrl;
      } else if (waTab && !waTab.closed) {
        waTab.close();
      }

      setStatus("done");
    } catch (err) {
      if (waTab && !waTab.closed) waTab.close();
      setStatus("idle");
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la reseña. Intenta de nuevo.",
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(8,18,42,0.60)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Subir reseña"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "400px",
              maxHeight: "95vh",
              overflowY: "auto",
              background: "#f4f6fb",
              borderRadius: "20px",
              boxShadow: "0 28px 80px rgba(8,18,42,0.36)",
              padding: "24px 16px 20px",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(255,255,255,0.8)",
                border: "none",
                cursor: "pointer",
                color: "rgba(17,17,17,0.45)",
                padding: "5px",
                lineHeight: 0,
                borderRadius: "50%",
                boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              }}
            >
              <X size={18} />
            </button>

            {status === "done" ? (
              /* ── Success card ── */
              <div
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "30px 20px",
                  textAlign: "center",
                  boxShadow: "0 2px 12px rgba(30,86,180,0.10)",
                }}
              >
                <CheckCircle2 size={52} color={BLUE} strokeWidth={1.5} />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.45rem",
                    color: TEXT,
                    fontWeight: 600,
                    fontStyle: "italic",
                    margin: "14px 0 8px",
                  }}
                >
                  ¡Gracias por tu reseña!
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    color: "rgba(17,17,17,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  Tu opinión será revisada por nuestro equipo antes de publicarse.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: "20px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    color: "#fff",
                    background: BLUE,
                    border: "none",
                    borderRadius: "10px",
                    padding: "11px 28px",
                    cursor: "pointer",
                  }}
                >
                  CERRAR
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* Header card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "18px 16px 14px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.35rem",
                      color: TEXT,
                      fontWeight: 600,
                      fontStyle: "italic",
                      margin: "0 0 5px",
                    }}
                  >
                    Comparte tu experiencia
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.97rem",
                      color: "rgba(17,17,17,0.55)",
                      margin: 0,
                    }}
                  >
                    Tu reseña será revisada antes de publicarse.
                  </p>
                </div>

                {/* Stars card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: BLUE2,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    Calificación
                  </span>
                  <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
                    {[1, 2, 3, 4, 5].map((value) => {
                      const active = value <= (hover || stars);
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setStars(value)}
                          onMouseEnter={() => setHover(value)}
                          onMouseLeave={() => setHover(0)}
                          aria-label={`${value} estrella${value > 1 ? "s" : ""}`}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                            lineHeight: 0,
                          }}
                        >
                          <Star
                            size={28}
                            strokeWidth={1.5}
                            color={BLUE}
                            fill={active ? BLUE : "transparent"}
                            style={{ transition: "fill 0.15s ease" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                  }}
                >
                  <label
                    htmlFor="rv-name"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: BLUE2,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Nombre
                  </label>
                  <input
                    id="rv-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    maxLength={80}
                    style={{
                      width: "100%",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: TEXT,
                      background: "#f4f6fb",
                      border: "1.5px solid rgba(26,61,124,0.14)",
                      borderRadius: "10px",
                      padding: "9px 12px",
                      outline: "none",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Role card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                  }}
                >
                  <label
                    htmlFor="rv-role"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: BLUE2,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Rol / Ciudad <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span>
                  </label>
                  <input
                    id="rv-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej. Empresario · Bogotá"
                    maxLength={80}
                    style={{
                      width: "100%",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: TEXT,
                      background: "#f4f6fb",
                      border: "1.5px solid rgba(26,61,124,0.14)",
                      borderRadius: "10px",
                      padding: "9px 12px",
                      outline: "none",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Review card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                  }}
                >
                  <label
                    htmlFor="rv-quote"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: BLUE2,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Tu reseña
                  </label>
                  <textarea
                    id="rv-quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Cuéntanos sobre tu experiencia con SGC Abogados…"
                    rows={3}
                    maxLength={600}
                    style={{
                      width: "100%",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: TEXT,
                      background: "#f4f6fb",
                      border: "1.5px solid rgba(26,61,124,0.14)",
                      borderRadius: "10px",
                      padding: "9px 12px",
                      outline: "none",
                      resize: "none",
                      lineHeight: 1.55,
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      color: "#c0392b",
                      textAlign: "center",
                      margin: "0 4px",
                    }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.74rem",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    color: "#fff",
                    background: status === "sending" ? BLUE2 : BLUE,
                    border: "none",
                    borderRadius: "14px",
                    padding: "13px",
                    cursor: status === "sending" ? "default" : "pointer",
                    opacity: status === "sending" ? 0.8 : 1,
                    transition: "background 0.2s ease",
                    boxShadow: "0 4px 16px rgba(30,86,180,0.28)",
                  }}
                >
                  {status === "sending" ? "ENVIANDO…" : "ENVIAR RESEÑA"}
                </button>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
