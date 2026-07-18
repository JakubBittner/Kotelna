import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;

    if (hash) {
      const id = hash.replace("#", "");
      const timer = window.setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Získání pozice elementu
          const top = element.getBoundingClientRect().top + window.scrollY;
          // Odčítáme 100px kvůli fixnímu navbaru (uprav si podle potřeby)
          window.scrollTo({ 
            top: top - 100, 
            behavior: "smooth" 
          });
        }
      }, 150); // Mírně prodloužená prodleva pro jistotu
      return () => window.clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname, hash, navigationType]);

  return null;
}