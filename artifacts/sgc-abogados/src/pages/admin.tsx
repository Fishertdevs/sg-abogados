import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Star, Check, Trash2, LogOut, Lock, Loader2, Inbox, KeyRound, X,
} from "lucide-react";
import {
  fetchAdminReviews,
  moderateReview,
  changeAdminPassword,
  type AdminReview,
} from "@/lib/reviews-api";

const BLUE = "#1e56b4";
const BLUE2 = "#163d90";
const INK = "#111111";
const BG = "#f4f5f8";

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
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        fontFamily: "'Cormorant Garamond', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {authed ? (
        <Dashboard
          password={password}
          onLogout={handleLogout}
          onPasswordChanged={handlePasswordChanged}
        />
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
    if (!value.trim()) {
      setError("Ingresa la contraseña.");
      return;
    }
    setChecking(true);
    try {
      // Validate by attempting an authorized request.
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
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 20px 60px rgba(8,18,42,0.14)",
          padding: "38px 32px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            background: BLUE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          <Lock size={26} color="#fff" />
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.7rem",
            color: INK,
            margin: "0 0 6px",
          }}
        >
          Panel de reseñas
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "rgba(17,17,17,0.6)",
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}
        >
          Ingresa la contraseña para gestionar las reseñas del sitio.
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          style={{
            width: "100%",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            color: INK,
            background: "#fff",
            border: "1px solid rgba(26,61,124,0.25)",
            borderRadius: "10px",
            padding: "12px 14px",
            outline: "none",
            marginBottom: "14px",
          }}
        />

        {error && (
          <p style={{ color: "#c0392b", fontSize: "1rem", margin: "0 0 14px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={checking}
          style={{
            width: "100%",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            fontWeight: 600,
            color: "#fff",
            background: checking ? BLUE2 : BLUE,
            border: "none",
            borderRadius: "11px",
            padding: "13px",
            cursor: checking ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {checking && <Loader2 size={16} className="sgc-spin" />}
          {checking ? "VERIFICANDO…" : "INGRESAR"}
        </button>
      </form>
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────── */

function Dashboard({
  password,
  onLogout,
  onPasswordChanged,
}: {
  password: string;
  onLogout: () => void;
  onPasswordChanged: (newPw: string) => void;
}) {
  const queryClient = useQueryClient();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => fetchAdminReviews(password),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string;
      action: "approve" | "delete";
    }) => moderateReview(password, id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["approved-reviews"] });
    },
  });

  const reviews = data ?? [];
  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");

  return (
    <>
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(26,61,124,0.12)",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: INK,
              margin: 0,
            }}
          >
            Panel de reseñas
          </h1>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.64rem",
              letterSpacing: "0.14em",
              color: BLUE,
              fontWeight: 600,
            }}
          >
            SGC ABOGADOS
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowPasswordModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.66rem",
              letterSpacing: "0.1em",
              fontWeight: 600,
              color: BLUE,
              background: "transparent",
              border: `1px solid ${BLUE}`,
              borderRadius: "9px",
              padding: "9px 16px",
              cursor: "pointer",
            }}
          >
            <KeyRound size={15} />
            CONTRASEÑA
          </button>
          <button
            onClick={onLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.66rem",
              letterSpacing: "0.1em",
              fontWeight: 600,
              color: BLUE,
              background: "transparent",
              border: `1px solid ${BLUE}`,
              borderRadius: "9px",
              padding: "9px 16px",
              cursor: "pointer",
            }}
          >
            <LogOut size={15} />
            SALIR
          </button>
        </div>
      </header>

      {showPasswordModal && (
        <ChangePasswordModal
          currentPassword={password}
          onClose={() => setShowPasswordModal(false)}
          onChanged={(newPw) => {
            onPasswordChanged(newPw);
            setShowPasswordModal(false);
          }}
        />
      )}

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "860px",
          margin: "0 auto",
          padding: "28px 20px 60px",
        }}
      >
        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: BLUE }}>
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
            <SectionTitle
              label={`Pendientes (${pending.length})`}
              hint="Estas reseñas aún no se muestran en el sitio."
            />
            {pending.length === 0 ? (
              <EmptyState text="No hay reseñas pendientes por revisar." />
            ) : (
              pending.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  busy={mutation.isPending}
                  onApprove={() =>
                    mutation.mutate({ id: r.id, action: "approve" })
                  }
                  onDelete={() =>
                    mutation.mutate({ id: r.id, action: "delete" })
                  }
                />
              ))
            )}

            <div style={{ height: "34px" }} />

            <SectionTitle
              label={`Publicadas (${approved.length})`}
              hint="Visibles actualmente en el sitio."
            />
            {approved.length === 0 ? (
              <EmptyState text="Todavía no hay reseñas publicadas." />
            ) : (
              approved.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  busy={mutation.isPending}
                  onDelete={() =>
                    mutation.mutate({ id: r.id, action: "delete" })
                  }
                />
              ))
            )}
          </>
        )}
      </main>
    </>
  );
}

/* ─── Pieces ─────────────────────────────────────────────── */

function SectionTitle({ label, hint }: { label: string; hint: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h2
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.82rem",
          letterSpacing: "0.12em",
          color: BLUE2,
          fontWeight: 700,
          margin: "0 0 2px",
        }}
      >
        {label}
      </h2>
      <p style={{ fontSize: "1rem", color: "rgba(17,17,17,0.5)", margin: 0 }}>
        {hint}
      </p>
    </div>
  );
}

function ChangePasswordModal({
  currentPassword,
  onClose,
  onChanged,
}: {
  currentPassword: string;
  onClose: () => void;
  onChanged: (newPw: string) => void;
}) {
  const [current, setCurrent] = useState(currentPassword);
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (next.trim().length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (next.trim() !== confirm.trim()) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    setSaving(true);
    try {
      await changeAdminPassword(current.trim(), next.trim());
      onChanged(next.trim());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo cambiar la contraseña.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    color: INK,
    background: "#fff",
    border: "1px solid rgba(26,61,124,0.25)",
    borderRadius: "10px",
    padding: "12px 14px",
    outline: "none",
    marginBottom: "12px",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,18,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 50,
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 24px 70px rgba(8,18,42,0.25)",
          padding: "30px 28px 26px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(17,17,17,0.4)",
          }}
        >
          <X size={20} />
        </button>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "1.5rem",
            color: INK,
            margin: "0 0 6px",
          }}
        >
          Cambiar contraseña
        </h2>
        <p
          style={{
            fontSize: "1.02rem",
            color: "rgba(17,17,17,0.55)",
            margin: "0 0 22px",
            lineHeight: 1.5,
          }}
        >
          Define una nueva contraseña para entrar al panel.
        </p>

        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Contraseña actual"
          style={inputStyle}
        />
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="Nueva contraseña"
          style={inputStyle}
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirmar nueva contraseña"
          style={{ ...inputStyle, marginBottom: error ? "12px" : "18px" }}
        />

        {error && (
          <p style={{ color: "#c0392b", fontSize: "1rem", margin: "0 0 16px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            width: "100%",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.76rem",
            letterSpacing: "0.12em",
            fontWeight: 600,
            color: "#fff",
            background: saving ? BLUE2 : BLUE,
            border: "none",
            borderRadius: "11px",
            padding: "13px",
            cursor: saving ? "default" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {saving && <Loader2 size={16} className="sgc-spin" />}
          {saving ? "GUARDANDO…" : "GUARDAR CONTRASEÑA"}
        </button>
      </form>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "34px 0",
        color: "rgba(17,17,17,0.4)",
        background: "#fff",
        borderRadius: "14px",
        border: "1px dashed rgba(26,61,124,0.2)",
      }}
    >
      <Inbox size={26} />
      <span style={{ fontSize: "1.05rem" }}>{text}</span>
    </div>
  );
}

function ReviewCard({
  review,
  busy,
  onApprove,
  onDelete,
}: {
  review: AdminReview;
  busy: boolean;
  onApprove?: () => void;
  onDelete: () => void;
}) {
  const date = new Date(review.createdAt).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid rgba(26,61,124,0.1)",
        boxShadow: "0 6px 20px rgba(8,18,42,0.05)",
        padding: "20px 22px",
        marginBottom: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={16}
              strokeWidth={1.5}
              color={BLUE}
              fill={s <= review.stars ? BLUE : "transparent"}
            />
          ))}
        </div>
        <span style={{ fontSize: "0.92rem", color: "rgba(17,17,17,0.45)" }}>
          {date}
        </span>
      </div>

      <p
        style={{
          fontSize: "1.18rem",
          fontStyle: "italic",
          color: INK,
          lineHeight: 1.55,
          margin: "0 0 12px",
        }}
      >
        “{review.quote}”
      </p>

      <p style={{ margin: "0 0 16px" }}>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.82rem",
            letterSpacing: "0.06em",
            color: BLUE2,
            fontWeight: 600,
          }}
        >
          {review.name}
        </span>
        {review.role && (
          <span style={{ fontSize: "1rem", color: "rgba(17,17,17,0.5)" }}>
            {"  ·  " + review.role}
          </span>
        )}
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        {onApprove && (
          <button
            onClick={onApprove}
            disabled={busy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.66rem",
              letterSpacing: "0.08em",
              fontWeight: 600,
              color: "#fff",
              background: BLUE,
              border: "none",
              borderRadius: "9px",
              padding: "10px 18px",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.6 : 1,
            }}
          >
            <Check size={15} />
            APROBAR
          </button>
        )}
        <button
          onClick={onDelete}
          disabled={busy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.66rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
            color: "#c0392b",
            background: "transparent",
            border: "1px solid rgba(192,57,43,0.4)",
            borderRadius: "9px",
            padding: "10px 18px",
            cursor: busy ? "default" : "pointer",
            opacity: busy ? 0.6 : 1,
          }}
        >
          <Trash2 size={15} />
          ELIMINAR
        </button>
      </div>
    </div>
  );
}
