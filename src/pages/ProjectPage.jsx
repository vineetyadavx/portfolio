import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/projects.js";
import { caseStudies } from "../data/caseStudies.js";
import "./CaseStudy.css";

function Heading({ children }) {
  return (
    <h2 className="case__h mono">
      <span>#</span> {children}
    </h2>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const study = caseStudies[id];

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} | Vineet Yadav`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project || !study) return <Navigate to="/#projects" replace />;

  const prev = projects[index - 1];
  const next = projects[index + 1];
  const num = String(index + 1).padStart(2, "0");
  const max = String(projects.length).padStart(2, "0");

  return (
    <main className="case">
      <div className="case__inner">
        <Link to="/#projects" className="case__back mono">
          ← All projects
        </Link>

        <p className="case__meta mono">
          {num} / {max} · {project.context}
        </p>
        <h1 className="case__title">{project.title}</h1>
        <p className="case__summary">{study.summary}</p>

        <div className="case__links">
          {project.links.live && (
            <a
              className="btn btn--primary"
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a
              className="btn"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Code
            </a>
          )}
        </div>

        <section className="case__block">
          <Heading>Problem</Heading>
          <p>{study.problem}</p>
        </section>

        <section className="case__block">
          <Heading>What I built</Heading>
          <ul className="case__list">
            {study.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case__block">
          <Heading>Architecture</Heading>
          <dl className="case__arch">
            {study.architecture.map(({ label, value }) => (
              <div key={label}>
                <dt className="mono">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="case__stack mono" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        <section className="case__block">
          <Heading>Result</Heading>
          <ul className="case__list">
            {study.result.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case__block">
          <Heading>What I'd build next</Heading>
          <ul className="case__list">
            {study.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <nav className="case__pager mono" aria-label="More projects">
          {prev ? (
            <Link to={`/projects/${prev.id}`}>← {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/projects/${next.id}`}>{next.title} →</Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}