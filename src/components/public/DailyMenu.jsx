import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/ui/SectionLabel";
import GhostButton from "@/components/ui/GhostButton";

// Tady je nová cesta k tvé lokální fotce jídla ve složce public/img
const DISH_IMG = "/img/jidlo.jpg";

export default function DailyMenu({ preview = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.MenuItem.filter({ is_daily: true, is_available: true }, "sort_order", 20)
      .then(setItems)
      .catch(() => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const soups = items.filter((i) => i.category === "polevka");
  const starters = items.filter((i) => i.category === "predkrm");
  const mains = items.filter((i) => i.category === "hlavni_jidlo");
  const desserts = items.filter((i) => i.category === "dezert");

  const today = new Date().toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long" });

  const col = (title, list) => (
    <div>
      <h3 className="font-heading text-xl text-[hsl(var(--gold-dark))]">{title}</h3>
      <div className="mt-6 space-y-6">
        {list.length === 0 && !loading && <p className="text-sm text-muted-foreground italic">Nedostupné</p>}
        {list.map((d) => (
          <div key={d.id} className="group">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-heading text-lg transition-colors group-hover:text-[hsl(var(--gold-dark))]">{d.name}</h4>
              <span className="eyebrow whitespace-nowrap text-[hsl(var(--gold-dark))]">{d.price} Kč</span>
            </div>
            <div className="hairline my-3" />
            {d.description && <p className="text-sm leading-relaxed text-muted-foreground">{d.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="denni-menu" className="px-6 py-30 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <SectionLabel>Denní menu</SectionLabel>
            <h2 className="mt-8 font-heading text-4xl md:text-6xl">
              Dnes v Kotelně
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow capitalize">{today}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Denní menu podáváme denně od 11:00 do 14:00. Vše připravujeme čerstvě z místních surovin.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-20 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border border-border border-t-[hsl(var(--gold-dark))]" />
          </div>
        ) : (
          <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="relative">
                <img src={DISH_IMG} alt="Denní doporučení šéfkuchaře" className="hidden aspect-[3/4] w-full object-cover md:block" />
                <span className="eyebrow mt-4 block text-muted-foreground">Doporučení šéfkuchaře</span>
              </div>
            </div>
            {col("Polévky & předkrmy", [...soups, ...starters])}
            {col("Hlavní jídla", [...mains, ...desserts])}
          </div>
        )}

        {!preview && (
          <div className="mt-16 flex justify-center">
            <GhostButton to="/menu" variant="gold" ariaLabel="Zobrazit kompletní menu">
              Kompletní menu
            </GhostButton>
          </div>
        )}
      </div>
    </section>
  );
}