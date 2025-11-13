// src/animations/scrollAnimations.js
import AOS from "aos";
import "aos/dist/aos.css";

export const initScrollAnimations = () => {
  AOS.init({
    duration: 900, // animation duration
    easing: "ease-in-out",
    once: false, // run only once per section
     mirror: true, // triggers slightly on scroll
  });
};
