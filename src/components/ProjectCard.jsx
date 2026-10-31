import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies.js";

export default function ProjectCard({ project, index, total }) {
  const { id, title, context, blurb, highlights, stack, links, image } = project;
  const num = String(index + 1).padStart(2, "0");
  const max = String(total).padStart(2, "0");

  return (
    <article className="card">
      <div className="card__preview">
        {image ? (
          <img src={image} alt={`${title} screenshot`} />
        ) : (
          <span className="card__num mono" aria-hidden="true">
            {num}
          </span>
        )}
      </div>

      <div className="card__body">
        <p className="card__meta mono">
          {num} / {max} · {context}
        </p>
        <h3 className="card__title">{title}</h3>
        <p className="card__blurb">{blurb}</p>

        <ul className="card__highlights">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <ul className="card__stack mono" aria-label="Tech stack">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="card__actions">
          {caseStudies[id] && (
            <Link className="btn btn--primary" to={`/projects/${id}`}>
              Case study
            </Link>
          )}
          {links.live && (
            <a
              className="btn"
              href={links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
            </a>
          )}
          {links.repo && (
            <a
              className="btn"
              href={links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}