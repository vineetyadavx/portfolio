import { useEffect, useState } from "react";

export default function useTypewriter(
  text,
  { speed = 70, delay = 400, instant = false, enabled = true } = {}
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (instant || !enabled) return;
    let i = 0;
    let timer;

    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay, instant, enabled]);

  if (instant) return text;
  return text.slice(0, count);
}