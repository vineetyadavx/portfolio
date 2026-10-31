import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import RecruiterToggle from "./components/RecruiterToggle.jsx";
import NodeGraph from "./components/NodeGraph.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Section from "./components/Section.jsx";
import { useMode } from "./hooks/modeContext.js";
import useActiveSection from "./hooks/useActiveSection.js";
import { sectionIds } from "./data/site.js";

const BOOT_KEY = "boot-done";

function bootAlreadyDone() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "yes";
  } catch {
    return false;
  }
}

function App() {
  const { recruiter } = useMode();
  const [bootDone, setBootDone] = useState(bootAlreadyDone);
  const activeSection = useActiveSection(sectionIds);
  const showBoot = !bootDone && !recruiter;

  function finishBoot() {
    try {
      sessionStorage.setItem(BOOT_KEY, "yes");
    } catch {
      /* storage unavailable, ignore */
    }
    setBootDone(true);
  }

  return (
    <>
      <RecruiterToggle />

      <AnimatePresence>
        {showBoot && <BootScreen key="boot" onDone={finishBoot} />}
      </AnimatePresence>

      {!recruiter && <NodeGraph section={activeSection} />}

      <Nav active={activeSection} />

      <main>
        <Hero active={!showBoot} />

        <Section id="projects" title="Projects">
          <p className="muted">Project cards arrive in a later phase.</p>
        </Section>

        <Section id="experience" title="Experience">
          <p className="muted">Work and education timeline arrives in a later phase.</p>
        </Section>

        <Section id="contact" title="Contact">
          <p className="muted">Contact links and resume button arrive in a later phase.</p>
        </Section>
      </main>
    </>
  );
}

export default App;