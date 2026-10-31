import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BootScreen from "./components/BootScreen.jsx";
import RecruiterToggle from "./components/RecruiterToggle.jsx";
import Home from "./pages/Home.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import { useMode } from "./hooks/modeContext.js";

const BOOT_KEY = "boot-done";

function bootAlreadyDone() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "yes";
  } catch {
    return false;
  }
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const { recruiter } = useMode();
  const { pathname } = useLocation();
  const [bootDone, setBootDone] = useState(bootAlreadyDone);
  const showBoot = !bootDone && !recruiter && pathname === "/";

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
      <ScrollManager />
      <RecruiterToggle />

      <AnimatePresence>
        {showBoot && <BootScreen key="boot" onDone={finishBoot} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home heroActive={!showBoot} />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;