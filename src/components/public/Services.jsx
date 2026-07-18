import SectionLabel from "@/components/ui/SectionLabel";
import GhostButton from "@/components/ui/GhostButton";
import { Truck, Trees, Gamepad2 } from "lucide-react";

// Tady je nová cesta k tvé fotce bowlingu ve složce public/img
const BOWLING_IMG = "/img/bowling.jpg"; 

// Až budeš mít i fotku terasy, změníš to tady úplně stejně (např. "/img/terasa.jpg")
const TERRACE_IMG = "https://media.base44.com/images/public/6a5a7be5f309f4cf5ee1e6c0/9b0a38482_generated_624ba98b.png";

const services = [
  {
    icon: Truck,
    title: "Rozvoz jídla",
    desc: "Doručujeme čerstvě připravená jídla po celé Opavě. Rozvoz zdarma při objednávce nad 600 Kč.",
    detail: "Denně 11:00 – 21:00",
  },
  {
    icon: Trees,
    title: "Krytá terasa",
    desc: "Celoročně klimatizovaná terasa se prosklenými stěnami. Ideální pro oběd i večerní posezení.",
    detail: "40 míst",
  },
  {
    icon: Gamepad2,
    title: "Bowling & šipky",
    desc: "Dvě dráhy na bowling a profesionální terč na šipky. Zábava pro firmy i přátele.",
    detail: "Rezervace nutná",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="border-y border-border bg-[hsl(var(--cream))]">
      <div className="mx-auto max-w-[1400px] px-6 py-30 md:px-12 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel>Služby</SectionLabel>
            <h2 className="mt-8 font-heading text-4xl md:text-6xl">
              Více než jen restaurace
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <img src={TERRACE_IMG} alt="Krytá terasa Kotelna" className="w-full object-cover" />
          </div>
        </div>

        <div className="mt-20 divide-y divide-border border-t border-b border-border">
          {services.map((s, i) => (
            <div key={s.title} className="group grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10">
              <div className="md:col-span-1">
                <span className="font-heading text-2xl text-[hsl(var(--gold-dark))]">0{i + 1}</span>
              </div>
              <div className="md:col-span-1">
                <s.icon className="h-7 w-7 text-[hsl(var(--gold-dark))] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
              </div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-2xl md:text-3xl">{s.title}</h3>
              </div>
              <div className="md:col-span-4">
                <p className="leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <span className="eyebrow">{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <img src={BOWLING_IMG} alt="Bowling dráha Kotelna" className="h-72 w-full object-cover md:h-96" />
          <div className="flex flex-col justify-center">
            <SectionLabel>Zábava</SectionLabel>
            <h3 className="mt-6 font-heading text-3xl md:text-4xl">
              Bowling a šipky ve večerních hodinách
            </h3>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Rezervujte si dráhu nebo terč na šipky společně se stolem. Ideální pro firemní akce, oslavy i neformální večer s přáteli.
            </p>
            <div className="mt-8">
              <GhostButton to="/rezervace" variant="gold" ariaLabel="Rezervovat dráhu na bowling">
                Rezervovat dráhu
              </GhostButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}