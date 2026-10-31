import { useEffect, useRef } from "react";
import { graph } from "../data/graph.js";
import "./NodeGraph.css";

const ACCENT = "34, 211, 238";
const TEXT = "230, 237, 243";
const MUTED = "139, 152, 165";
const BG = "#07090c";
const FONT = '"JetBrains Mono", ui-monospace, monospace';

const EMPHASIS = {
  home: { me: 1, project: 0.75, skill: 0.5, edge: 0.35 },
  projects: { me: 0.6, project: 1, skill: 0.75, edge: 0.6 },
  experience: { me: 1, project: 0.3, skill: 0.45, edge: 0.18 },
  contact: { me: 1, project: 0.35, skill: 0.35, edge: 0.2 },
};

function targetsFor(section, w, h) {
  const mobile = w < 720;
  const base = Math.min(w, h);
  switch (section) {
    case "projects":
      return mobile
        ? { x: 0.5 * w, y: 0.5 * h, s: 0.62 * base }
        : { x: 0.78 * w, y: 0.5 * h, s: 0.42 * base };
    case "experience":
      return {
        x: mobile ? 0.5 * w : 0.8 * w,
        y: 0.5 * h,
        s: (mobile ? 0.5 : 0.34) * base,
      };
    case "contact":
      return { x: 0.5 * w, y: 0.5 * h, s: (mobile ? 0.45 : 0.34) * base };
    default:
      return {
        x: mobile ? 0.5 * w : 0.76 * w,
        y: mobile ? 0.74 * h : 0.52 * h,
        s: (mobile ? 0.5 : 0.42) * base,
      };
  }
}

export default function NodeGraph({ section, focusId = null }) {
  const canvasRef = useRef(null);
  const sectionRef = useRef(section);
  const focusRef = useRef(focusId);
  const apiRef = useRef(null);

  useEffect(() => {
    sectionRef.current = section;
    focusRef.current = focusId;
    apiRef.current?.refresh();
  }, [section, focusId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    const state = { x: 0, y: 0, s: 0, emph: { ...EMPHASIS.home } };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function snap() {
      const t = targetsFor(sectionRef.current, w, h);
      state.x = t.x;
      state.y = t.y;
      state.s = t.s;
      Object.assign(state.emph, EMPHASIS[sectionRef.current] || EMPHASIS.home);
    }

    function layout(time, rot) {
      const pos = {};
      pos.me = { x: state.x + mouse.x * 10, y: state.y + mouse.y * 10 };

      const P = graph.projects.length;
      graph.projects.forEach((n, i) => {
        const a = rot + (i / P) * Math.PI * 2 - Math.PI / 2;
        const wob = reduced ? 0 : Math.sin(time * 0.0007 + i * 1.9) * 0.02;
        const r = 0.38 + wob;
        pos[n.id] = {
          x: state.x + Math.cos(a) * r * state.s + mouse.x * 18,
          y: state.y + Math.sin(a) * r * state.s + mouse.y * 18,
        };
      });

      const S = graph.skills.length;
      graph.skills.forEach((n, i) => {
        const a = -rot * 0.6 + (i / S) * Math.PI * 2 - Math.PI / 2;
        const wob = reduced ? 0 : Math.sin(time * 0.0005 + i * 2.3) * 0.025;
        const r = 0.78 + wob;
        pos[n.id] = {
          x: state.x + Math.cos(a) * r * state.s + mouse.x * 28,
          y: state.y + Math.sin(a) * r * state.s + mouse.y * 28,
        };
      });

      return pos;
    }

    function line(a, b, alpha) {
      if (alpha <= 0.01) return;
      ctx.strokeStyle = `rgba(${ACCENT}, ${Math.min(alpha, 1)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    function dot(p, radius, color, alpha, glow, filled) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = `rgba(${ACCENT}, 0.8)`;
      ctx.shadowBlur = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      if (filled) {
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        ctx.fillStyle = BG;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();
    }

    function label(p, text, alpha, size, mode) {
      if (alpha <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `${size}px ${FONT}`;
      ctx.fillStyle = `rgb(${TEXT})`;
      ctx.textBaseline = "middle";
      if (mode === "below") {
        ctx.textAlign = "center";
        ctx.fillText(text, p.x, p.y + 24);
      } else {
        const right = p.x >= state.x;
        ctx.textAlign = right ? "left" : "right";
        ctx.fillText(text, p.x + (right ? 12 : -12), p.y);
      }
      ctx.restore();
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      const mobile = w < 720;
      const rot = reduced ? 0 : window.scrollY * 0.0008 + time * 0.00004;
      const pos = layout(time, rot);
      const e = state.emph;

      const focusId = sectionRef.current === "projects" ? focusRef.current : null;
      const focused = focusId
        ? graph.projects.find((p) => p.id === focusId)
        : null;

      graph.projects.forEach((n) => {
        const isFocus = focused && focused.id === n.id;
        const dim = focused && !isFocus ? 0.25 : 1;
        line(pos.me, pos[n.id], e.edge * 0.9 * dim);
        n.links.forEach((id) =>
          line(pos[n.id], pos[id], e.edge * (isFocus ? 1.4 : 0.7) * dim)
        );
      });
      graph.meLinks.forEach((id) => line(pos.me, pos[id], e.edge * 0.6));
      graph.skillEdges.forEach(([a, b]) => line(pos[a], pos[b], e.edge * 0.5));

      graph.skills.forEach((n) => {
        const lit = focused && focused.links.includes(n.id);
        const a = lit ? 1 : e.skill * (focused ? 0.45 : 1);
        dot(
          pos[n.id],
          (mobile ? 3 : 4) + (lit ? 1.5 : 0),
          `rgb(${lit ? ACCENT : MUTED})`,
          a,
          lit ? 14 : 6,
          false
        );
        label(pos[n.id], n.label, lit ? 1 : a * 0.8, mobile ? 10 : 11, "side");
      });

      graph.projects.forEach((n) => {
        const isFocus = focused && focused.id === n.id;
        const a = e.project * (focused && !isFocus ? 0.35 : 1);
        dot(
          pos[n.id],
          (mobile ? 5 : 6) + (isFocus ? 2 : 0),
          `rgb(${ACCENT})`,
          a,
          isFocus ? 28 : 14,
          true
        );
        label(pos[n.id], n.label, a, mobile ? 11 : 13, "side");
      });

      const pulse = reduced ? 0 : Math.sin(time * 0.002) * 1.5;
      dot(pos.me, 8 + pulse, `rgb(${TEXT})`, e.me, 26, true);
      label(pos.me, "vineet", e.me, mobile ? 12 : 14, "below");
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 3.2);

      const t = targetsFor(sectionRef.current, w, h);
      state.x += (t.x - state.x) * k;
      state.y += (t.y - state.y) * k;
      state.s += (t.s - state.s) * k;

      const goal = EMPHASIS[sectionRef.current] || EMPHASIS.home;
      Object.keys(goal).forEach((key) => {
        state.emph[key] += (goal[key] - state.emph[key]) * k;
      });

      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;

      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function once() {
      snap();
      draw(performance.now());
    }

    function onResize() {
      resize();
      if (reduced) once();
    }

    function onMove(e) {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;
    }

    resize();
    snap();
    apiRef.current = {
      refresh: () => {
        if (reduced) once();
      },
    };

    window.addEventListener("resize", onResize);
    if (reduced) {
      once();
    } else {
      window.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      apiRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="node-graph" aria-hidden="true" />;
}