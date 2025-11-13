// src/Component/AnimatedCounter.jsx
import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ from = 0, to = 0, duration = 2000 }) {
  const [value, setValue] = useState(from);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(from + (to - from) * progress));

          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={ref}>{value}</span>;
}
