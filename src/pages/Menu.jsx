import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/ui/SectionLabel";
import GhostButton from "@/components/ui/GhostButton";

const categoryLabels = {
  polevka: "Polévky",
  predkrm: "Předkrmy",
  hlavni_jidlo: "Hlavní jídla",
  dezert: "Dezerty",
  napoj: "Nápoje",
};
const categoryOrder = ["polevka", "predkrm", "hlavni_jidlo", "dezert", "napoj"];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_available: true }, "sort_order", 100)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);
  const grouped = active === "all"
    ? categoryOrder.filter((c) => items.some((i) => i.category === c)).map((c) => ({ cat: c, list: items.filter((i) => i.category === c) }))
    : [{ cat: active, list: filtered }];

  return (
    <div className="pt-32">
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>Menu</SectionLabel>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="font-heading text-5xl md:text-7xl">Karta jídel</h1>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActive("all")} className={`eyebrow border px-4 py-2 transition-colors ${active === "all" ? "border-[hsl(var(--gold-dark))] text-[hsl(var(--gold-dark))]" : "border-border"}`}>
                Vše
              </button>
              {categoryOrder.map((c) => (
                <button key={c} onClick={() => setActive(c)} className={`eyebrow border px-4 py-2 transition-colors ${active === c ? "border-[hsl(var(--gold-dark))] text-[hsl(var(--gold-dark))]" : "border-border"}`}>
                  {categoryLabels[c]}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mt-20 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border border-border border-t-[hsl(var(--gold-dark))]" />
            </div>
          ) : (
            <div className="mt-20 space-y-24">
              {grouped.map(({ cat, list }) => (
                <div key={cat}>
                  <h2 className="font-heading text-3xl text-[hsl(var(--gold-dark))] md:text-4xl">{categoryLabels[cat]}</h2>
                  <div className="hairline-gold mt-4" />
                  <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
                    {list.map((d) => (
                      <div key={d.id} className="group">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-heading text-xl transition-colors group-hover:text-[hsl(var(--gold-dark))]">{d.name}</h3>
                          <span className="hairline flex-1" />
                          <span className="eyebrow whitespace-nowrap text-[hsl(var(--gold-dark))]">{d.price} Kč</span>
                        </div>
                        {d.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.description}</p>}
                        {d.is_daily && <span className="eyebrow mt-2 block text-[hsl(var(--gold-dark))]">· Denní menu</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-24 border-t border-border pt-12 text-center">
            <p className="text-muted-foreground">Alergeny na vyžádání u obsluhy. Polední menu platí denně 11:00–14:00.</p>
            <div className="mt-8">
              <GhostButton to="/rezervace" variant="gold" ariaLabel="Rezervovat stůl">
                Rezervovat stůl
              </GhostButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}