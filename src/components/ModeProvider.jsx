import { useCallback, useEffect, useMemo, useState } from "react";
import { ModeContext } from "../hooks/modeContext.js";

const STORAGE_KEY = "recruiter-mode";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

export default function ModeProvider({ children }) {
  const [recruiter, setRecruiter] = useState(readStored);

  useEffect(() => {
    document.documentElement.dataset.recruiter = recruiter ? "on" : "off";
    try {
      localStorage.setItem(STORAGE_KEY, recruiter ? "on" : "off");
    } catch {
      /* storage unavailable, ignore */
    }
  }, [recruiter]);

  const toggle = useCallback(() => setRecruiter((v) => !v), []);
  const value = useMemo(() => ({ recruiter, toggle }), [recruiter, toggle]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}