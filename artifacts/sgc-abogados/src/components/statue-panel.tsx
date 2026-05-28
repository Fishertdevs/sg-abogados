import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import justiceStatueImg from "@assets/image_1779927370844.png";

const GOLD = "#C49A18";
const BG   = "#06060E";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; maxAlpha: number;
  life: number; maxLife: number;
}

function mkP(w: number, h: number): Particle {
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(Math.random() * 0.5 + 0.15),
    size: Math.random() * 1.6 + 0.4,
    alpha: 0, maxAlpha: Math.random() * 0.5 + 0.1,
    life: Math.floor(Math.random() * 240),
    maxLife: Math.floor(Math.random() * 180 + 120),
  };
}

export default function StatuePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sx = useSpring(rawX, { stiffness: 30, damping: 20 });
  const sy = useSpring(rawY, { stiffness: 30, damping: 20 });

  const statueX = useTransform(sx, [0, 1], [-20, 20]);
  const statueY = useTransform(sy, [0, 1], [-12, 12]);
  const glowX   = useTransform(sx, [0, 1], [14, -14]);
  const glowY   = useTransform(sy, [0, 1], [8, -8]);

  const onMove = useCallback((e: MouseEvent) => {
    rawX.set(e.clientX / window.innerWidth);
    rawY.set(e.clientY / window.innerHeight);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width  || 600;
    const H = () => canvas.height || 900;
    const ps: Particle[] = Array.from({ length: 80 }, () => mkP(W(), H()));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.life++;
        const prog = p.life / p.maxLife;
        p.alpha = prog < 0.2  ? p.maxAlpha * prog / 0.2 :
                  prog > 0.75 ? p.maxAlpha * (1 - prog) / 0.25 :
                                 p.maxAlpha;
        if (p.life >= p.maxLife) {
          p.x = Math.random() * W(); p.y = H() + 10;
          p.vx = (Math.random() - 0.5) * 0.35;
          p.vy = -(Math.random() * 0.5 + 0.15);
          p.size = Math.random() * 1.6 + 0.4;
          p.maxAlpha = Math.random() * 0.5 + 0.1;
          p.life = 0; p.maxLife = Math.floor(Math.random() * 180 + 120);
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,154,24,${p.alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div
      className="hidden md:block"
      style={{
        position: "fixed", right: 0, top: 0, bottom: 0,
        width: "clamp(300px, 43vw, 660px)",
        zIndex: 2, pointerEvents: "none", overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Film grain */}
      <div className="absolute inset-0" style={{
        opacity: 0.26,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
      }} />

      {/* Left edge fade — blends with page bg */}
      <div className="absolute inset-y-0 left-0" style={{
        width: "42%",
        background: `linear-gradient(to right, ${BG} 0%, ${BG}BB 50%, transparent 100%)`,
      }} />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: "14%",
        background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
      }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "18%",
        background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
      }} />

      {/* Outer glow */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "580px", height: "580px", borderRadius: "50%", flexShrink: 0,
          background: `radial-gradient(circle, ${GOLD}1E 0%, ${GOLD}08 40%, transparent 65%)`,
          filter: "blur(65px)",
        }} />
      </motion.div>

      {/* Inner hot glow */}
      <motion.div style={{ x: glowX, y: glowY }} className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "260px", height: "260px", borderRadius: "50%", flexShrink: 0,
          background: "radial-gradient(circle, rgba(255,210,80,0.16) 0%, transparent 70%)",
          filter: "blur(28px)",
        }} />
      </motion.div>

      {/* Cinematic light rays */}
      <div style={{
        position: "absolute", top: "10%", right: "22%",
        width: "1px", height: "42%",
        background: `linear-gradient(to bottom, transparent, ${GOLD}28, transparent)`,
        transform: "rotate(11deg)", filter: "blur(1.5px)",
      }} />
      <div style={{
        position: "absolute", top: "18%", right: "36%",
        width: "1px", height: "28%",
        background: `linear-gradient(to bottom, transparent, ${GOLD}13, transparent)`,
        transform: "rotate(-7deg)", filter: "blur(2px)",
      }} />

      {/* The statue */}
      <motion.div style={{ x: statueX, y: statueY }} className="absolute inset-0 flex items-center justify-center">
        <img
          src={justiceStatueImg}
          alt="Estatua de la Justicia — SG Abogados"
          style={{
            width: "clamp(260px, 30vw, 480px)",
            height: "auto",
            objectFit: "contain",
            filter: "brightness(1.08) contrast(1.06) drop-shadow(0 0 55px rgba(196,154,24,0.22))",
            flexShrink: 0,
          }}
        />
      </motion.div>
    </div>
  );
}
