import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Check, Trash2, LogOut, Lock, Loader2, Inbox, KeyRound } from "lucide-react";
import {
  fetchAdminReviews,
  moderateReview,
  changePassword,
  type AdminReview,
} from "@/lib/reviews-api";

const CAFE  = "#C4A355";
const CAFE2 = "#9E8033";
const DARK  = "#3F4937";
const INK   = "#2A2820";
const BG    = "#FAF7F2";
const BG2   = "#EDE7DC";

const SESSION_KEY = "sgc_admin_pw";

export default function AdminPage() {
  const [password, setPassword] = useState<string>(
    () => sessionStorage.getItem(SESSION_KEY) ?? "",
  );
  const [authed, setAuthed] = useState<boolean>(
    () => !!sessionStorage.getItem(SESSION_KEY),
  );

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setPassword("");
    setAuthed(false);
  }

  function handlePasswordChanged(newPw: string) {
    sessionStorage.setItem(SESSION_KEY, newPw);
    setPassword(newPw);
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Cormorant Garamond', serif", display: "flex", flexDirection: "column" }}>
      {authed ? (
        <Dashboard password={password} onLogout={handleLogout} onPasswordChanged={handlePasswordChanged} />
      ) : (
        <LoginGate
          onSuccess={(pw) => {
            sessionStorage.setItem(SESSION_KEY, pw);
            setPassword(pw);
            setAuthed(true);
          }}
        />
      )}
    </div>
  );
}

/* ─── Login ──────────────────────────────────────────────── */

function LoginGate({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!value.trim()) { setError("Ingresa la contraseña."); return; }
    setChecking(true);
    try {
      await fetchAdminReviews(value.trim());
      onSuccess(value.trim());
    } catch (err) {
      setError(
        err instanceof Error && err.message === "unauthorized"
          ? "Contraseña incorrecta."
          : "No se pudo verificar. Intenta de nuevo.",
      );
    } finally {
      setChecking(false);
    }
  }

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "380px", background: "#fff", borderRadius: "18px", boxShadow: "0 20px 60px rgba(63,73,55,0.14)", padding: "38px 32px 32px", textAlign: "center" }}>
        <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
          <Lock size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.7rem", color: INK, margin: "0 0 6px" }}>
          Panel de reseñas
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(42,40,32,0.55)", margin: "0 0 24px", lineHeight: 1.5 }}>
          Ingresa la contraseña para gestionar las reseñas del sitio.
        </p>

        <input
          type="password" value={value} onChange={(e) => setValue(e.target.value)}
          placeholder="Contraseña" autoFocus
          style={{ width: "100%", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: INK, background: BG2, border: "1px solid rgba(63,73,55,0.22)", borderRadius: "10px", padding: "12px 14px", outline: "none", marginBottom: "14px", boxSizing: "border-box" }}
        />

        {error && <p style={{ color: "#c0392b", fontSize: "1rem", margin: "0 0 14px" }}>{error}</p>}

        <button type="submit" disabled={checking}
          style={{ width: "100%", fontFamily: "'Cinzel', serif", fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600, color: "#fff", background: checking ? CAFE2 : DARK, border: "none", borderRadius: "11px", padding: "13px", cursor: checking ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {checking && <Loader2 size={16} className="sgc-spin" />}
          {checking ? "VERIFICANDO…" : "INGRESAR"}
        </button>
      </form>
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────── */

function Dashboard({ password, onLogout, onPasswordChanged }: { password: string; onLogout: () => void; onPasswordChanged: (newPw: string) => void }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => fetchAdminReviews(password),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "approve" | "delete" }) =>
      moderateReview(password, id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
    },
  });

  const reviews = data ?? [];
  const pending  = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");

  return (
    <>
      <header style={{ background: DARK, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.5rem", color: "#fff", margin: 0 }}>
            Panel de reseñas
          </h1>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.64rem", letterSpacing: "0.14em", color: CAFE, fontWeight: 600 }}>
            SGC ABOGADOS
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <ChangePassword password={password} onPasswordChanged={onPasswordChanged} />
          <button onClick={onLogout}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Cinzel', serif", fontSize: "0.66rem", letterSpacing: "0.1em", fontWeight: 600, color: CAFE, background: "transparent", border: `1px solid ${CAFE}`, borderRadius: "9px", padding: "9px 16px", cursor: "pointer" }}>
            <LogOut size={15} />
            SALIR
          </button>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", maxWidth: "860px", margin: "0 auto", padding: "28px 20px 60px" }}>
        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: CAFE }}>
            <Loader2 size={30} className="sgc-spin" />
          </div>
        )}

        {isError && (
          <p style={{ textAlign: "center", color: "#c0392b", padding: "40px 0" }}>
            No se pudieron cargar las reseñas. Recarga la página.
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <SectionTitle label={`Pendientes (${pending.length})`} hint="Estas reseñas aún no se muestran en el sitio." />
            {pending.length === 0 ? (
              <EmptyState text="No hay reseñas pendientes por revisar." />
            ) : (
              pending.map((r) => (
                <ReviewCard key={r.id} review={r} busy={mutation.isPending}
                  onApprove={() => mutation.mutate({ id: r.id, action: "approve" })}
                  onDelete={() => mutation.mutate({ id: r.id, action: "delete" })}
                />
              ))
            )}

            <div style={{ height: "34px" }} />

            <SectionTitle label={`Publicadas (${approved.length})`} hint="Visibles actualmente en el sitio." />
            {approved.length === 0 ? (
              <EmptyState text="Todavía no hay reseñas publicadas." />
            ) : (
              approved.map((r) => (
                <ReviewCard key={r.id} review={r} busy={mutation.isPending}
                  onDelete={() => mutation.mutate({ id: r.id, action: "delete" })}
                />
              ))
            )}
          </>
        )}
      </main>
    </>
  );
}

/* ─── Change Password ────────────────────────────────────── */

function ChangePassword({ password, onPasswordChanged }: { password: string; onPasswordChanged: (newPw: string) => void }) {
  const [open, setOpen] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    if (newPw.length < 6) { setErrMsg("Mínimo 6 caracteres."); return; }
    if (newPw !== confirm) { setErrMsg("Las contraseñas no coinciden."); return; }
    setStatus("saving");
    try {
      await changePassword(password, newPw);
      onPasswordChanged(newPw);
      setStatus("ok");
      setNewPw(""); setConfirm("");
      setTimeout(() => { setOpen(false); setStatus("idle"); }, 2200);
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "Error al cambiar contraseña.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: INK,
    background: BG2, border: "1px solid rgba(63,73,55,0.22)", borderRadius: "8px",
    padding: "10px 12px", outline: "none", boxSizing: "border-box", marginBottom: "10px",
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Cinzel', serif", fontSize: "0.66rem", letterSpacing: "0.1em", fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "9px", padding: "9px 16px", cursor: "pointer" }}>
        <KeyRound size={15} />
        CONTRASEÑA
      </button>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", padding: "32px 28px", width: "100%", maxWidth: "360px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.35rem", color: INK, margin: 0 }}>Cambiar contraseña</h2>
          <button type="button" onClick={() => { setOpen(false); setStatus("idle"); setErrMsg(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(42,40,32,0.4)", fontSize: "1.2rem", lineHeight: 1 }}>✕</button>
        </div>

        <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
          placeholder="Nueva contraseña" autoFocus style={inputStyle} />
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
          placeholder="Confirmar contraseña" style={inputStyle} />

        {errMsg && <p style={{ color: "#c0392b", fontSize: "0.95rem", margin: "0 0 10px" }}>{errMsg}</p>}
        {status === "ok" && <p style={{ color: DARK, fontSize: "0.95rem", margin: "0 0 10px", fontWeight: 600 }}>✓ Contraseña cambiada exitosamente.</p>}

        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
          <button type="submit" disabled={status === "saving"}
            style={{ flex: 1, fontFamily: "'Cinzel', serif", fontSize: "0.70rem", letterSpacing: "0.10em", fontWeight: 600, color: "#fff", background: status === "saving" ? CAFE2 : DARK, border: "none", borderRadius: "9px", padding: "11px", cursor: status === "saving" ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
            {status === "saving" && <Loader2 size={14} className="sgc-spin" />}
            {status === "saving" ? "GUARDANDO…" : "GUARDAR"}
          </button>
          <button type="button" onClick={() => { setOpen(false); setStatus("idle"); setErrMsg(""); }}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.70rem", letterSpacing: "0.10em", fontWeight: 600, color: INK, background: BG2, border: "none", borderRadius: "9px", padding: "11px 18px", cursor: "pointer" }}>
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Pieces ─────────────────────────────────────────────── */

function SectionTitle({ label, hint }: { label: string; hint: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", letterSpacing: "0.12em", color: CAFE2, fontWeight: 700, margin: "0 0 2px" }}>
        {label}
      </h2>
      <p style={{ fontSize: "1rem", color: "rgba(42,40,32,0.5)", margin: 0 }}>{hint}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "34px 0", color: "rgba(42,40,32,0.35)", background: "#fff", borderRadius: "14px", border: "1px dashed rgba(63,73,55,0.2)" }}>
      <Inbox size={26} />
      <span style={{ fontSize: "1.05rem" }}>{text}</span>
    </div>
  );
}

function ReviewCard({ review, busy, onApprove, onDelete }: { review: AdminReview; busy: boolean; onApprove?: () => void; onDelete: () => void }) {
  const date = new Date(review.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(63,73,55,0.1)", boxShadow: "0 6px 20px rgba(63,73,55,0.06)", padding: "20px 22px", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "10px" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={16} strokeWidth={1.5} color={CAFE} fill={s <= review.stars ? CAFE : "transparent"} />
          ))}
        </div>
        <span style={{ fontSize: "0.92rem", color: "rgba(42,40,32,0.42)" }}>{date}</span>
      </div>

      <p style={{ fontSize: "1.18rem", fontStyle: "italic", color: INK, lineHeight: 1.55, margin: "0 0 12px" }}>
        "{review.quote}"
      </p>

      <p style={{ margin: "0 0 16px" }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.82rem", letterSpacing: "0.06em", color: CAFE2, fontWeight: 600 }}>
          {review.name}
        </span>
        {review.role && (
          <span style={{ fontSize: "1rem", color: "rgba(42,40,32,0.45)" }}>{"  ·  " + review.role}</span>
        )}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        {onApprove && (
          <button onClick={onApprove} disabled={busy}
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'Cinzel', serif", fontSize: "0.66rem", letterSpacing: "0.08em", fontWeight: 600, color: "#fff", background: DARK, border: "none", borderRadius: "9px", padding: "10px 18px", cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1 }}>
            <Check size={15} />
            APROBAR
          </button>
        )}
        <button onClick={onDelete} disabled={busy}
          style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'Cinzel', serif", fontSize: "0.66rem", letterSpacing: "0.08em", fontWeight: 600, color: "#c0392b", background: "transparent", border: "1px solid rgba(192,57,43,0.4)", borderRadius: "9px", padding: "10px 18px", cursor: busy ? "default" : "pointer", opacity: busy ? 0.6 : 1 }}>
          <Trash2 size={15} />
          ELIMINAR
        </button>
      </div>
    </div>
  );
}
