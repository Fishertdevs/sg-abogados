import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle2 } from "lucide-react";
import { submitReview } from "@/lib/reviews-api";

const CAFE = "#1e56b4";
const CAFE2 = "#163d90";
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
    // Reset shortly after the closing animation finishes
    setTimeout(reset, 350);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (stars < 1) {
      setError("Por favor selecciona una calificación.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Por favor ingresa tu nombre.");
      return;
    }
    if (quote.trim().length < 10) {
      setError("Tu reseña es muy corta. Cuéntanos un poco más.");
      return;
    }

    setStatus("sending");

    // Open the WhatsApp tab synchronously (inside the user gesture) so the
    // popup blocker doesn't stop it; we set its URL once the request resolves.
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
        // Fallback if the pre-opened tab was blocked.
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    color: TEXT,
    background: "#fff",
    border: "1px solid rgba(26,61,124,0.22)",
    borderRadius: "10px",
    padding: "11px 14px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.66rem",
    letterSpacing: "0.1em",
    color: CAFE2,
    fontWeight: 700,
    marginBottom: "7px",
    display: "block",
    textTransform: "uppercase",
  };

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
            background: "rgba(8,18,42,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Subir reseña"
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 24px 70px rgba(8,18,42,0.32)",
              padding: "30px 30px 28px",
              position: "relative",
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "rgba(17,17,17,0.5)",
                padding: 4,
                lineHeight: 0,
              }}
            >
              <X size={22} />
            </button>

            {status === "done" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "26px 6px 12px",
                }}
              >
                <CheckCircle2 size={58} color={CAFE} strokeWidth={1.5} />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.7rem",
                    color: TEXT,
                    fontWeight: 600,
                    fontStyle: "italic",
                    margin: "18px 0 10px",
                  }}
                >
                  ¡Gracias por tu reseña!
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.12rem",
                    color: "rgba(17,17,17,0.7)",
                    lineHeight: 1.6,
                    maxWidth: "380px",
                  }}
                >
                  Hemos recibido tu opinión y será revisada por nuestro equipo
                  antes de publicarse. Agradecemos mucho que compartas tu
                  experiencia con SGC Abogados.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: "24px",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.74rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    color: "#fff",
                    background: CAFE,
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 30px",
                    cursor: "pointer",
                  }}
                >
                  CERRAR
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    color: TEXT,
                    fontWeight: 600,
                    fontStyle: "italic",
                    marginBottom: "6px",
                  }}
                >
                  Comparte tu experiencia
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    color: "rgba(17,17,17,0.6)",
                    lineHeight: 1.5,
                    marginBottom: "22px",
                  }}
                >
                  Tu reseña será revisada antes de publicarse en el sitio.
                </p>

                {/* Estrellas */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={labelStyle}>Calificación</span>
                  <div style={{ display: "flex", gap: "6px" }}>
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
                            padding: 2,
                            lineHeight: 0,
                          }}
                        >
                          <Star
                            size={30}
                            strokeWidth={1.5}
                            color={CAFE}
                            fill={active ? CAFE : "transparent"}
                            style={{ transition: "fill 0.15s ease" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nombre */}
                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="rv-name" style={labelStyle}>
                    Nombre
                  </label>
                  <input
                    id="rv-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    maxLength={80}
                    style={inputStyle}
                  />
                </div>

                {/* Rol / ciudad */}
                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="rv-role" style={labelStyle}>
                    Rol / Ciudad (opcional)
                  </label>
                  <input
                    id="rv-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ej. Empresario · Bogotá"
                    maxLength={80}
                    style={inputStyle}
                  />
                </div>

                {/* Reseña */}
                <div style={{ marginBottom: "18px" }}>
                  <label htmlFor="rv-quote" style={labelStyle}>
                    Tu reseña
                  </label>
                  <textarea
                    id="rv-quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Cuéntanos sobre tu experiencia con SGC Abogados…"
                    rows={4}
                    maxLength={600}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                  />
                </div>

                {error && (
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: "#c0392b",
                      marginBottom: "14px",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    color: "#fff",
                    background: status === "sending" ? CAFE2 : CAFE,
                    border: "none",
                    borderRadius: "11px",
                    padding: "14px",
                    cursor: status === "sending" ? "default" : "pointer",
                    opacity: status === "sending" ? 0.8 : 1,
                    transition: "background 0.2s ease",
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
