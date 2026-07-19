import GhostButton from "@/components/ui/GhostButton";

// Změněná cesta k tvé lokální fotce ve složce public/img
const HERO_IMG = "/img/uvod.jpg";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Interiér restaurace Kotelna v bývalé kotelně"
          className="h-full w-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Tady jsme smazali pt-32 a přidali -mt-20 md:-mt-40 pro posun nahoru */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 -mt-20 md:-mt-52">
        <div className="max-w-3xl">
          <p className="eyebrow text-[hsl(var(--cream))]/80 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Restaurace · Opava
          </p>
          <h1 className="mt-8 font-heading text-[2.75rem] leading-[1.05] text-[hsl(var(--cream))] sm:text-6xl md:text-7xl lg:text-[5rem] animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
            Chuť tradice
            <br />
            <span className="italic text-[hsl(var(--gold))]">v moderním pojetí</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[hsl(var(--cream))]/80 animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            Prémiová gastronomie v prostorách bývalé kotelny. Čerstvé, sezónní, poctivé — od poledního menu po večerní zážitek.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 animate-fade-up opacity-0" style={{ animationDelay: "1.1s" }}>
            <GhostButton to="/menu" variant="gold" className="border-[hsl(var(--gold))] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--ink))]" ariaLabel="Zobrazit menu">
              Zobrazit menu
            </GhostButton>
            <GhostButton to="/rezervace" className="border-[hsl(var(--cream))]/40 text-[hsl(var(--cream))] hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]" ariaLabel="Rezervovat stůl">
              Rezervovat stůl
            </GhostButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="eyebrow text-[hsl(var(--cream))]/60">Sjeďte dolů</span>
      </div>
    </section>
  );
}