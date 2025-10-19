import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4, // Trigger when 20% of section is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" variants={variants}>
      {children}
    </motion.div>
  );
}
