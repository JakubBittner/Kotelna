import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

export default function ContentManager() {
  const { toast } = useToast();
  const [content, setContent] = useState({
    heroTitle: "Chuť tradice v moderním pojetí",
    heroSubtitle: "Prémiová gastronomie v prostorách bývalé kotelny. Čerstvé, sezónní, poctivé — od poledního menu po večerní zážitek.",
    aboutText: "Kotelna vznikla v prostorách historické kotelny v centru Opavy. Zachovali jsme syrovou industriální duši — ocel, cihla, vysoké klenby — a doplnili ji o tichý, teplý jazyk moderní gastronomie.",
    phone: "+420 555 123 456",
    email: "info@kotelna.cz",
    address: "Horní náměstí 12, 746 01 Opava",
    hoursMon: "11:00 – 22:00",
    hoursFri: "11:00 – 24:00",
    hoursSun: "11:00 – 21:00",
  });

  const set = (k, v) => setContent((c) => ({ ...c, [k]: v }));

  const save = (e) => {
    e.preventDefault();
    toast({ title: "Obsah uložen", description: "Změny se projeví na veřejném webu." });
  };

  const fields = [
    { k: "heroTitle", l: "Hlavní nadpis (Hero)" },
    { k: "heroSubtitle", l: "Podnadpis (Hero)", area: true },
    { k: "aboutText", l: "Text O nás", area: true },
    { k: "phone", l: "Telefon" },
    { k: "email", l: "E-mail" },
    { k: "address", l: "Adresa" },
    { k: "hoursMon", l: "Otevírací doba Po–Čt" },
    { k: "hoursFri", l: "Otevírací doba Pá–So" },
    { k: "hoursSun", l: "Otevírací doba Ne" },
  ];

  return (
    <div>
      <p className="eyebrow text-[hsl(var(--gold))]">Správa obsahu</p>
      <h1 className="mt-4 font-heading text-4xl md:text-5xl text-[hsl(var(--cream))]">Content Manager</h1>
      <p className="mt-4 text-white/50">Upravujte texty a kontaktní údaje zobrazené na veřejném webu.</p>

      <form onSubmit={save} className="mt-12 max-w-2xl space-y-6">
        {fields.map((f) => (
          <div key={f.k}>
            <label className="eyebrow mb-3 block text-white/50">{f.l}</label>
            {f.area ? (
              <textarea rows="3" className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))] placeholder-white/30" value={content[f.k]} onChange={(e) => set(f.k, e.target.value)} />
            ) : (
              <input className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))] placeholder-white/30" value={content[f.k]} onChange={(e) => set(f.k, e.target.value)} />
            )}
          </div>
        ))}
        <button type="submit" className="ghost-btn-gold"><Save className="h-4 w-4" /> Uložit změny</button>
      </form>
    </div>
  );
}