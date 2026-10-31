import { useState } from "react";
import NodeGraph from "../components/NodeGraph.jsx";
import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Projects from "../components/Projects.jsx";
import Experience from "../components/Experience.jsx";
import { useMode } from "../hooks/modeContext.js";
import useActiveSection from "../hooks/useActiveSection.js";
import { sectionIds } from "../data/site.js";

export default function Home({ heroActive }) {
  const { recruiter } = useMode();
  const [focusId, setFocusId] = useState(null);
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      {!recruiter && <NodeGraph section={activeSection} focusId={focusId} />}

      <Nav active={activeSection} />

      <main>
        <Hero active={heroActive} />

        <Section id="projects" title="Projects">
          <Projects onFocus={setFocusId} />
        </Section>

        <Section id="experience" title="Experience">
          <Experience />
        </Section>

        <Section id="contact" title="Contact">
          <p className="muted">Contact links and resume button arrive in a later phase.</p>
        </Section>
      </main>
    </>
  );
}