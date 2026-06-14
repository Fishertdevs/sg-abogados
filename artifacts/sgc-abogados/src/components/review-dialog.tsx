import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { submitReview } from "@/lib/reviews-api";

const BLUE = "#1e56b4";
const BLUE2 = "#163d90";
const TEXT = "#111111";

const STEPS = ["stars", "name", "role", "quote"] as const;
type Step = (typeof STEPS)[number];

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ReviewDialog({ open, onClose }: ReviewDialogProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const currentStep: Step = STEPS[stepIndex];
  const totalSteps = STEPS.length;

  function reset() {
    setStepIndex(0);
    setDirection(1);
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

  function goNext() {
    setError(null);
    if (currentStep === "stars" && stars < 1) {
      setError("Selecciona al menos una estrella.");
      return;
    }
    if (currentStep === "name" && name.trim().length < 2) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }
    if (currentStep === "quote" && quote.trim().length < 10) {
      setError("Tu reseña es muy corta. Cuéntanos un poco más.");
      return;
    }
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }

  function goBack() {
    setError(null);
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit() {
    setError(null);
    if (quote.trim().length < 10) {
      setError("Tu reseña es muy corta. Cuéntanos un poco más.");
      return;
    }
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

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    color: TEXT,
    background: "#f4f6fb",
    border: "1.5px solid rgba(26,61,124,0.15)",
    borderRadius: "11px",
    padding: "10px 14px",
    outline: "none",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: "0.63rem",
    letterSpacing: "0.11em",
    color: BLUE2,
    fontWeight: 700,
    textTransform: "uppercase",
    display: "block",
    marginBottom: "12px",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(8,18,42,0.62)",
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "360px",
              background: "#f0f3fa",
              borderRadius: "22px",
              boxShadow: "0 28px 80px rgba(8,18,42,0.38)",
              padding: "20px 16px 22px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: "13px",
                right: "13px",
                background: "rgba(255,255,255,0.85)",
                border: "none",
                cursor: "pointer",
                color: "rgba(17,17,17,0.4)",
                padding: "5px",
                lineHeight: 0,
                borderRadius: "50%",
                boxShadow: "0 1px 5px rgba(0,0,0,0.10)",
                zIndex: 2,
              }}
            >
              <X size={17} />
            </button>

            {/* ── SUCCESS ── */}
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "32px 20px",
                  textAlign: "center",
                  boxShadow: "0 2px 14px rgba(30,86,180,0.10)",
                }}
              >
                <CheckCircle2 size={52} color={BLUE} strokeWidth={1.5} />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
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
                    color: "rgba(17,17,17,0.62)",
                    lineHeight: 1.6,
                    margin: "0 0 20px",
                  }}
                >
                  Tu opinión será revisada antes de publicarse.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    color: "#fff",
                    background: BLUE,
                    border: "none",
                    borderRadius: "11px",
                    padding: "11px 30px",
                    cursor: "pointer",
                  }}
                >
                  CERRAR
                </button>
              </motion.div>
            ) : (
              <>
                {/* Header card */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "16px 14px 13px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(30,86,180,0.08)",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.25rem",
                      color: TEXT,
                      fontWeight: 600,
                      fontStyle: "italic",
                      margin: "0 0 4px",
                    }}
                  >
                    Comparte tu experiencia
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.93rem",
                      color: "rgba(17,17,17,0.52)",
                      margin: 0,
                    }}
                  >
                    Tu reseña será revisada antes de publicarse.
                  </p>
                </div>

                {/* Progress dots */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "7px",
                    marginBottom: "10px",
                  }}
                >
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === stepIndex ? "22px" : "7px",
                        height: "7px",
                        borderRadius: "4px",
                        background: i <= stepIndex ? BLUE : "rgba(30,86,180,0.2)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                {/* Step card — animated */}
                <div style={{ position: "relative", minHeight: "148px" }}>
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        padding: "20px 16px 18px",
                        textAlign: "center",
                        boxShadow: "0 2px 14px rgba(30,86,180,0.10)",
                      }}
                    >
                      {/* STEP: Stars */}
                      {currentStep === "stars" && (
                        <>
                          <span style={labelStyle}>Calificación</span>
                          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "4px" }}>
                            {[1, 2, 3, 4, 5].map((value) => {
                              const active = value <= (hover || stars);
                              return (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() => {
                                    setStars(value);
                                    setError(null);
                                  }}
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
                                    size={34}
                                    strokeWidth={1.4}
                                    color={BLUE}
                                    fill={active ? BLUE : "transparent"}
                                    style={{ transition: "fill 0.13s ease" }}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}

                      {/* STEP: Name */}
                      {currentStep === "name" && (
                        <>
                          <span style={labelStyle}>Tu nombre</span>
                          <input
                            autoFocus
                            type="text"
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError(null); }}
                            onKeyDown={(e) => e.key === "Enter" && goNext()}
                            placeholder="Tu nombre completo"
                            maxLength={80}
                            style={inputBase}
                          />
                        </>
                      )}

                      {/* STEP: Role */}
                      {currentStep === "role" && (
                        <>
                          <span style={labelStyle}>
                            Rol / Ciudad{" "}
                            <span style={{ fontWeight: 400, opacity: 0.55, textTransform: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: 0 }}>
                              (opcional)
                            </span>
                          </span>
                          <input
                            autoFocus
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && goNext()}
                            placeholder="Ej. Empresario · Bogotá"
                            maxLength={80}
                            style={inputBase}
                          />
                        </>
                      )}

                      {/* STEP: Quote */}
                      {currentStep === "quote" && (
                        <>
                          <span style={labelStyle}>Tu reseña</span>
                          <textarea
                            autoFocus
                            value={quote}
                            onChange={(e) => { setQuote(e.target.value); setError(null); }}
                            placeholder="Cuéntanos sobre tu experiencia con SGC Abogados…"
                            rows={4}
                            maxLength={600}
                            style={{ ...inputBase, resize: "none", lineHeight: 1.55 }}
                          />
                        </>
                      )}

                      {/* Inline error */}
                      {error && (
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "0.92rem",
                            color: "#c0392b",
                            margin: "8px 0 0",
                          }}
                        >
                          {error}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {stepIndex > 0 && (
                    <button
                      onClick={goBack}
                      style={{
                        flex: "0 0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        cursor: "pointer",
                        color: BLUE,
                        boxShadow: "0 2px 8px rgba(30,86,180,0.12)",
                      }}
                      aria-label="Volver"
                    >
                      <ArrowLeft size={18} strokeWidth={2} />
                    </button>
                  )}

                  {currentStep !== "quote" ? (
                    <button
                      onClick={goNext}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.11em",
                        fontWeight: 600,
                        color: "#fff",
                        background: BLUE,
                        border: "none",
                        borderRadius: "12px",
                        padding: "13px 18px",
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(30,86,180,0.28)",
                      }}
                    >
                      CONTINUAR <ArrowRight size={15} strokeWidth={2.2} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={status === "sending"}
                      style={{
                        flex: 1,
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.11em",
                        fontWeight: 600,
                        color: "#fff",
                        background: status === "sending" ? BLUE2 : BLUE,
                        border: "none",
                        borderRadius: "12px",
                        padding: "13px 18px",
                        cursor: status === "sending" ? "default" : "pointer",
                        opacity: status === "sending" ? 0.8 : 1,
                        boxShadow: "0 4px 16px rgba(30,86,180,0.28)",
                        transition: "background 0.2s",
                      }}
                    >
                      {status === "sending" ? "ENVIANDO…" : "ENVIAR RESEÑA"}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
