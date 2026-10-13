import { useEffect, useRef } from "react";

const WELL_RADIUS = 160; // size of the soft shadow that follows the cursor
const WELL_STRENGTH = 0.07; // how dark the shadow is (0 to 1), keep it small
const FAST_SPEED = 1500; // cursor speed (px per second) needed to make a ring; lower = easier
const RIPPLE_COOLDOWN = 800; // minimum time between rings (ms)
const RIPPLE_MAX = 200; // how far the ring spreads before it disappears
const RIPPLE_SPEED = 140; // how fast the ring spreads (px per second)
const RIPPLE_STRENGTH = 1; // multiply to make the ring stronger or fainter

export default function FabricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let lastRing = 0;
    let hasPosition = false;
    const mouse = { x: -9999, y: -9999, t: 0, speed: 0 }; // pointer position (screen) and speed
    const cur = { x: 0, y: 0, s: 0 }; // eased position (in canvas) and strength
    let ring = null; // only one ring at a time

    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      // shadow on light mode, soft light sheen on dark mode (a shadow is invisible on dark)
      const rgb = dark ? "255,255,255" : "0,0,0";
      const k = dark ? 0.6 : 1;
      ctx.clearRect(0, 0, w, h);

      // soft shadow under the cursor
      if (cur.s > 0.01) {
        const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, WELL_RADIUS);
        const a = WELL_STRENGTH * cur.s * k;
        g.addColorStop(0, `rgba(${rgb}, ${a})`);
        g.addColorStop(0.5, `rgba(${rgb}, ${a * 0.4})`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // the ring: drawn three times, wide and faint to thin and stronger, so the edge is soft
      if (ring) {
        const fade = Math.pow(1 - ring.r / RIPPLE_MAX, 1.6) * RIPPLE_STRENGTH * k;
        const passes = [
          [16, 0.018],
          [7, 0.03],
          [1.5, 0.05],
        ];
        for (const [width, alpha] of passes) {
          ctx.lineWidth = width;
          ctx.strokeStyle = `rgba(${rgb}, ${alpha * fade})`;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const tick = (t) => {
      if (!last) last = t;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      const rect = canvas.getBoundingClientRect();
      const lx = mouse.x - rect.left;
      const ly = mouse.y - rect.top;
      const inside = lx >= 0 && ly >= 0 && lx <= rect.width && ly <= rect.height;

      if (inside) {
        if (!hasPosition) {
          cur.x = lx;
          cur.y = ly;
          hasPosition = true;
        }
        cur.x += (lx - cur.x) * 0.1; // follows with a slight delay
        cur.y += (ly - cur.y) * 0.1;

        // a fast drag makes one ring; slow movement makes none
        if (!ring && mouse.speed > FAST_SPEED && t - lastRing > RIPPLE_COOLDOWN) {
          ring = { x: cur.x, y: cur.y, r: 10 };
          lastRing = t;
        }
      }
      mouse.speed *= 0.9; // speed fades if the cursor stops
      cur.s += ((inside ? 1 : 0) - cur.s) * 0.08;

      if (ring) {
        ring.r += RIPPLE_SPEED * dt;
        if (ring.r >= RIPPLE_MAX) ring = null;
      }

      draw();

      if (inside || cur.s > 0.005 || ring) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
        cur.s = 0;
        hasPosition = false;
        draw();
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (e) => {
      const now = performance.now();
      const dtMs = now - mouse.t;
      if (mouse.t && dtMs > 0 && dtMs < 100) {
        const dist = Math.hypot(e.clientX - mouse.x, e.clientY - mouse.y);
        const inst = (dist / dtMs) * 1000;
        mouse.speed = mouse.speed * 0.5 + inst * 0.5; // smoothed cursor speed
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.t = now;
      if (!reduced) start();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.t = 0;
      mouse.speed = 0;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
