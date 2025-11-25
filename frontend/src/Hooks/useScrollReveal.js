import { useEffect, useRef } from "react";

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1, // trigger when 20% of the section is visible
      ...options,
    };

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add("reveal-active");
        } else {
          // element.classList.remove("reveal-active"); // ✅ works both ways (scroll up/down)
        }
      });
    }, defaultOptions);

    reveal.observe(element);

    return () => reveal.disconnect();
  }, [options]);

  return ref;
}
