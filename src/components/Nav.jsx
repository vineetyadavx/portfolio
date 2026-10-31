import { useState } from "react";
import { sections, sectionIds } from "../data/site.js";
import useActiveSection from "../hooks/useActiveSection.js";
import "./Nav.css";

export default function Nav() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a
          href="#home"
          className="nav__brand mono"
          onClick={() => setOpen(false)}
        >
          <span className="nav__prompt">~/</span>vineet
        </a>

        <button
          type="button"
          className="nav__menu mono"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="nav-links"
          className={`nav__links mono${open ? " is-open" : ""}`}
          aria-label="Primary"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "is-active" : ""}
              aria-current={active === s.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}