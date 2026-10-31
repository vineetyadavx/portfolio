import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./BootScreen.css";

const LINES = [
  "initialising portfolio v1.0 ...",
  "loading projects ........ 5 found",
  "loading experience ...... ok",
  "mounting github ......... vineetyadavx",
  "status: open to internships and part-time software roles",
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BootScreen({ onDone }) {
  const [visible, setVisible] = useState(() =>
    prefersReducedMotion() ? LINES.length : 0
  );
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const ready = visible >= LINES.length;

  useEffect(() => {
    if (visible >= LINES.length) return;
    const id = setTimeout(() => setVisible((v) => v + 1), 380);
    return () => clearTimeout(id);
  }, [visible]);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onDone();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  function push(cmd, reply) {
    setHistory((h) => [...h, { cmd, reply }]);
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (cmd === "") return;
    if (cmd === "start" || cmd === "skip") return onDone();
    if (cmd === "help") return push(cmd, "commands: start, skip, help");
    push(cmd, `command not found: ${cmd}. try 'help'`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const current = value;
    setValue("");
    run(current);
  }

  return (
    <motion.div
      className="boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-label="Intro terminal"
    >
      <div className="boot__window" onClick={() => inputRef.current?.focus()}>
        <div className="boot__bar mono">
          <span className="boot__dot" />
          <span className="boot__dot" />
          <span className="boot__dot" />
          <span className="boot__title">vineet@portfolio: ~</span>
        </div>

        <div className="boot__body mono">
          {LINES.slice(0, visible).map((line, i) => (
            <p
              key={line}
              className={
                i === LINES.length - 1
                  ? "boot__line boot__line--status"
                  : "boot__line"
              }
            >
              {line}
            </p>
          ))}

          {history.map((h, i) => (
            <div key={i}>
              <p className="boot__line boot__line--cmd">
                <span className="boot__ps1">vineet@portfolio:~$</span> {h.cmd}
              </p>
              <p className="boot__line">{h.reply}</p>
            </div>
          ))}

          {ready && (
            <form className="boot__prompt" onSubmit={handleSubmit}>
              <label htmlFor="boot-input" className="boot__ps1">
                vineet@portfolio:~$
              </label>
              <input
                id="boot-input"
                ref={inputRef}
                className="boot__input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="type 'start'"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </form>
          )}
        </div>

        <div className="boot__actions">
          <button type="button" className="btn btn--primary" onClick={onDone}>
            Start
          </button>
          <button type="button" className="btn" onClick={onDone}>
            Skip intro
          </button>
        </div>
      </div>
    </motion.div>
  );
}