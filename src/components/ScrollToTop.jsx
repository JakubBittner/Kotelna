import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const forceSmoothScroll = (targetTop, duration = 600) => {
  const startY = window.scrollY;
  const distance = targetTop - startY;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4); 
    window.scrollTo(0, startY + distance * ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };
  requestAnimationFrame(animation);
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          // Zde voláme naši vynucenou funkci
          forceSmoothScroll(top, 600);
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      forceSmoothScroll(0, 500);
    }
  }, [pathname, hash]);

  return null;
}