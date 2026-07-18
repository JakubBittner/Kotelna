import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-border bg-[hsl(var(--cream))]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="font-heading text-4xl md:text-5xl">Kotelna</h3>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Chuť tradice v moderním pojetí. Prémiová gastronomie v prostorách bývalé kotelny v srdci Opavy.
            </p>
            <div className="mt-8 flex gap-5">
              <a href="https://www.facebook.com/p/Kotelna-61559107666746/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-[hsl(var(--gold-dark))]">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-5">Kontakt</p>
            <p className="text-foreground">Horní náměstí 12</p>
            <p className="text-muted-foreground">746 01 Opava</p>
            <p className="mt-4 text-muted-foreground">
              <a href="tel:+420555123456" className="transition-colors hover:text-[hsl(var(--gold-dark))]">+420 555 123 456</a>
            </p>
            <p className="text-muted-foreground">
              <a href="mailto:info@kotelna.cz" className="transition-colors hover:text-[hsl(var(--gold-dark))]">info@kotelna.cz</a>
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Otevírací doba</p>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between"><span>Po–Čt</span><span>11:00 – 22:00</span></div>
              <div className="flex justify-between"><span>Pá–So</span><span>11:00 – 24:00</span></div>
              <div className="flex justify-between"><span>Ne</span><span>11:00 – 21:00</span></div>
            </div>
            <Link to="/rezervace" className="ghost-btn-gold mt-8" aria-label="Rezervovat stůl">
              Rezervovat
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-muted-foreground md:flex-row">
          <p className="text-xs uppercase tracking-[0.15em]">© 2026 Kotelna Opava</p>
          <div className="flex gap-6 text-xs uppercase tracking-[0.15em]">
            <Link to="/admin" className="transition-colors hover:text-[hsl(var(--gold-dark))]">Admin</Link>
            <Link to="/ucet" className="transition-colors hover:text-[hsl(var(--gold-dark))]">Můj účet</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}