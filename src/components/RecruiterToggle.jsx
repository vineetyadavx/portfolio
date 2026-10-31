import { useMode } from "../hooks/modeContext.js";
import "./RecruiterToggle.css";

export default function RecruiterToggle() {
  const { recruiter, toggle } = useMode();

  return (
    <button
      type="button"
      className="recruiter-toggle mono"
      onClick={toggle}
      aria-pressed={recruiter}
      title="Recruiter Mode shows a fast, plain version of the site"
    >
      Recruiter Mode: {recruiter ? "On" : "Off"}
    </button>
  );
}