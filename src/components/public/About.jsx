import SectionLabel from "@/components/ui/SectionLabel";

const ABOUT_IMG = "https://media.base44.com/images/public/6a5a7be5f309f4cf5ee1e6c0/0e9728ef7_generated_d99878d7.png";

export default function About() {
  return (
    <section id="o-nas" className="px-6 py-30 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5 md:col-start-1">
          <SectionLabel>O nás</SectionLabel>
          <h2 className="mt-8 font-heading text-4xl leading-tight md:text-6xl">
            Kde se potkává
            <br />
            <span className="italic text-[hsl(var(--gold-dark))]">řemeslo a prostor</span>
          </h2>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
            Kotelna vznikla v prostorách historické kotelny v centru Opavy. Zachovali jsme syrovou industriální duši — ocel, cihla, vysoké klenby — a doplnili ji o tichý, teplý jazyk moderní gastronomie.
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Vaříme z místních surovin, s respektem k sezoně a s pokorou k tradici. Každé jídlo je příběh — od farmáře přes kuchyni až k vašemu stolu.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="relative">
            <img
              src={ABOUT_IMG}
              alt="Atmosféra restaurace Kotelna"
              className="w-full object-cover"
            />
            <span className="eyebrow absolute -bottom-8 right-0 max-w-[200px] text-right text-muted-foreground">
              Detail prostoru — světlo, struktura, ticho
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}