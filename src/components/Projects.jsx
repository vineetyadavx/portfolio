import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects.js";
import { useMode } from "../hooks/modeContext.js";
import ProjectCard from "./ProjectCard.jsx";
import "./Projects.css";

const VISIBLE = 2;

function Fan({ onFocus }) {
  const [active, setActive] = useState(0);
  const startX = useRef(null);
  const swiped = useRef(false);
  const count = projects.length;

  useEffect(() => {
    onFocus(projects[active].id);
  }, [active, onFocus]);

  function go(i) {
    setActive(Math.max(0, Math.min(count - 1, i)));
  }

  function onKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  }

  function onPointerDown(e) {
    startX.current = e.clientX;
    swiped.current = false;
  }

  function onPointerUp(e) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) {
      swiped.current = true;
      go(active + (dx < 0 ? 1 : -1));
    }
  }

  function onSlotClick(i) {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (i !== active) go(i);
  }

  return (
    <div
      className="fan"
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="fan__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {projects.map((p, i) => {
          const o = i - active;
          const abs = Math.abs(o);
          const classes = [
            "fan__slot",
            o === 0 ? "is-active" : "",
            abs > VISIBLE ? "is-hidden" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={p.id}
              className={classes}
              style={{ "--o": o, "--abs": abs, zIndex: 10 - abs }}
              onClick={() => onSlotClick(i)}
            >
              <div className="fan__inner" inert={o !== 0}>
                <ProjectCard project={p} index={i} total={count} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="fan__controls mono">
        <button
          type="button"
          className="btn"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous project"
        >
          ←
        </button>

        <div className="fan__dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={i === active ? "is-active" : ""}
              onClick={() => go(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="btn"
          onClick={() => go(active + 1)}
          disabled={active === count - 1}
          aria-label="Next project"
        >
          →
        </button>
      </div>

      <p className="fan__hint mono muted">
        Use the arrows, swipe, or click a card.
      </p>
    </div>
  );
}

function Grid() {
  return (
    <div className="grid">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}

export default function Projects({ onFocus }) {
  const { recruiter } = useMode();
  return recruiter ? <Grid /> : <Fan onFocus={onFocus} />;
}