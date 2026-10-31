import { motion } from "framer-motion";
import { site } from "../data/site.js";
import { useMode } from "../hooks/modeContext.js";
import useTypewriter from "../hooks/useTypewriter.js";
import "./Hero.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Hero({ active }) {
  const { recruiter } = useMode();
  const instant = recruiter || prefersReducedMotion();
  const show = instant || active;
  const role = useTypewriter(site.role, { enabled: active, instant });

  const reveal = (delay = 0) => ({
    initial: instant ? false : { opacity: 0, y: 14 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: instant ? 0 : 0.5, delay: instant ? 0 : delay },
  });

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <motion.p className="hero__prompt mono muted" {...reveal(0)}>
          vineet@portfolio:~$ whoami
        </motion.p>

        <motion.h1
          className="hero__title"
          aria-label={`Hi, I'm ${site.firstName}, ${site.role}`}
          {...reveal(0.1)}
        >
          <span aria-hidden="true">
            Hi, I'm <span className="hero__name">{site.firstName}</span>
            <br />
            <span className="hero__role">
              {role}
              <span className="cursor" />
            </span>
          </span>
        </motion.h1>

        <motion.p className="hero__tagline" {...reveal(0.2)}>
          {site.tagline}
        </motion.p>

        <motion.div className="hero__chips mono" {...reveal(0.3)}>
          <span className="hero__status">
            <span className="hero__pulse" aria-hidden="true" />
            {site.status}
          </span>
          <span className="hero__badge">{site.badge}</span>
        </motion.div>

        <motion.div className="hero__actions" {...reveal(0.4)}>
          <a className="btn btn--primary" href="#projects">
            View projects
          </a>
          <a
            className="btn"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn"
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </motion.div>

        <motion.ul
          className="hero__stack mono"
          aria-label="Tech stack"
          {...reveal(0.5)}
        >
          {site.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}