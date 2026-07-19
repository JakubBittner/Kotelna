import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Domů", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "O nás", to: "/#o-nas" },
  { label: "Služby", to: "/#sluzby" },
  { label: "Kontakt", to: "/#kontakt" },
];

// Naše vlastní neprůstřelná scrollovací funkce
const forceSmoothScroll = (targetTop, duration = 600) => {
  const startY = window.scrollY;
  const distance = targetTop - startY;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing funkce (aby to na konci hezky zpomalilo)
    const ease = 1 - Math.pow(1 - progress, 4); 
    
    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isLightBg = scrolled || open || !isHome;

  const handleNavClick = (e, to) => {
    e.preventDefault(); 
    setOpen(false); 

    if (to.includes('#')) {
      const hash = to.split('#')[1];
      
      if (isHome) {
        const element = document.getElementById(hash);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          // Zde voláme naši vynucenou funkci
          forceSmoothScroll(top, 600);
          window.history.pushState(null, '', `/#${hash}`);
        }
      } else {
        navigate(`/#${hash}`);
      }
    } else {
      navigate(to);
      forceSmoothScroll(0, 500);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isLightBg 
          ? "bg-[hsl(var(--cream))]/95 backdrop-blur-md border-b border-border py-4" 
          : "bg-transparent py-8 md:py-10"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link 
          to="/" 
          onClick={(e) => { e.preventDefault(); forceSmoothScroll(0, 600); navigate('/'); }}
          className={`font-heading text-3xl md:text-4xl tracking-[0.15em] uppercase transition-colors duration-300 ${
            isLightBg ? "text-foreground" : "text-[hsl(var(--cream))]"
          }`} 
        >
          Kotelna
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={(e) => handleNavClick(e, l.to)}
              className={`cursor-pointer font-body text-[0.85rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[hsl(var(--gold))] ${
                isLightBg ? "text-muted-foreground" : "text-[hsl(var(--cream))]/80"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link 
            to="/rezervace" 
            className={`font-body text-[0.85rem] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
              isLightBg 
                ? "text-[hsl(var(--gold-dark))] hover:text-foreground" 
                : "text-[hsl(var(--gold))] hover:text-[hsl(var(--cream))]"
            }`}
          >
            Rezervace
          </Link>
        </div>

        <button
          className={`md:hidden transition-colors ${
            isLightBg ? "text-foreground" : "text-[hsl(var(--cream))]"
          }`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-[hsl(var(--cream))] md:hidden mt-4">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((l) => (
              <a 
                key={l.label} 
                href={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className="py-4 font-body text-sm font-medium uppercase tracking-[0.15em] border-b border-border/60 text-muted-foreground hover:text-[hsl(var(--gold-dark))]"
              >
                {l.label}
              </a>
            ))}
            <Link onClick={() => setOpen(false)} to="/rezervace" className="py-4 font-body text-sm font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold-dark))] hover:text-foreground">
              Rezervace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}