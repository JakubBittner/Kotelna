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

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const isLightBg = scrolled || open || !isHome;

  // Pomocná funkce pro plynulé scrollování
  const handleHashClick = (e, to) => {
    if (to.includes('#')) {
      const hash = to.split('#')[1];
      const element = document.getElementById(hash);
      
      if (element) {
        e.preventDefault();
        // Pokud jsme na domovské, jen plynule sroluj
        if (isHome) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Pokud nejsme na domovské, jdi na domovskou a pak sroluj
          navigate('/');
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
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
          className={`font-heading text-3xl md:text-4xl tracking-[0.15em] uppercase transition-colors duration-300 ${
            isLightBg ? "text-foreground" : "text-[hsl(var(--cream))]"
          }`} 
        >
          Kotelna
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={(e) => handleHashClick(e, l.to)}
              className={`font-body text-[0.85rem] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[hsl(var(--gold))] ${
                isLightBg ? "text-muted-foreground" : "text-[hsl(var(--cream))]/80"
              }`}
            >
              {l.label}
            </Link>
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
              <Link 
                key={l.label} 
                to={l.to}
                onClick={(e) => handleHashClick(e, l.to)}
                className="py-4 font-body text-sm font-medium uppercase tracking-[0.15em] border-b border-border/60 text-muted-foreground hover:text-[hsl(var(--gold-dark))]"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/rezervace" className="py-4 font-body text-sm font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold-dark))] hover:text-foreground">
              Rezervace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}