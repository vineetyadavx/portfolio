import { motion } from "framer-motion";
import {
  experienceIntro,
  education,
  work,
  certifications,
  languages,
} from "../data/experience.js";
import { useMode } from "../hooks/modeContext.js";
import "./Experience.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Timeline({ title, items, instant }) {
  return (
    <div className="exp__group">
      <h3 className="exp__group-title mono">{title}</h3>
      <ol className="exp__list">
        {items.map((item, i) => (
          <motion.li
            key={item.id}
            className="exp__item"
            initial={instant ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: instant ? 0 : 0.5,
              delay: instant ? 0 : i * 0.05,
            }}
          >
            <span className="exp__dot" aria-hidden="true" />
            <p className="exp__dates mono">{item.dates}</p>
            <h4 className="exp__role">{item.role}</h4>
            <p className="exp__org">
              {item.org}
              {item.place ? ` · ${item.place}` : ""}
            </p>
            {item.points.length > 0 && (
              <ul className="exp__points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const { recruiter } = useMode();
  const instant = recruiter || prefersReducedMotion();

  return (
    <div className="exp">
      <p className="exp__intro">{experienceIntro}</p>

      <Timeline title="Education" items={education} instant={instant} />
      <Timeline title="Work" items={work} instant={instant} />
      <Timeline title="Certifications" items={certifications} instant={instant} />

      <div className="exp__group">
        <h3 className="exp__group-title mono">Languages</h3>
        <ul className="exp__langs mono" aria-label="Languages">
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}