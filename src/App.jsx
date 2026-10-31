import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import RecruiterToggle from "./components/RecruiterToggle.jsx";
import { useMode } from "./hooks/modeContext.js";

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

      <main className="container" style={{ paddingTop: "20vh" }}>
        <p className="mono muted">vineet@portfolio:~$</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
          Hi, I'm <span style={{ color: "var(--accent)" }}>Vineet</span>
          <span className="cursor" />
        </h1>
        <p className="muted">
          Placeholder home. Mode: {recruiter ? "recruiter" : "full"}. The real
          hero comes next phase.
        </p>
      </main>
    </>
  );
}

export default App;