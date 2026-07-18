import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const categoryLabels = {
  polevka: "Polévka",
  predkrm: "Předkrm",
  hlavni_jidlo: "Hlavní jídlo",
  dezert: "Dezert",
  napoj: "Nápoj",
};

const empty = { name: "", description: "", price: 0, category: "hlavni_jidlo", is_daily: false, is_available: true, image_url: "", sort_order: 0 };

export default function MenuManager() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.MenuItem.list("sort_order", 200).then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await base44.entities.MenuItem.update(editing, form);
        toast({ title: "Položka aktualizována" });
      } else {
        await base44.entities.MenuItem.create(form);
        toast({ title: "Položka vytvořena" });
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast({ title: "Chyba", description: err.message, variant: "destructive" });
    }
  };

  const remove = async (id) => {
    await base44.entities.MenuItem.delete(id);
    toast({ title: "Smazáno" });
    load();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-[hsl(var(--gold))]">Správa jídel</p>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl text-[hsl(var(--cream))]">Menu Manager</h1>
        </div>
        <button onClick={openNew} className="ghost-btn-gold"><Plus className="h-4 w-4" /> Nová položka</button>
      </div>

      {loading ? (
        <div className="mt-16 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border border-white/20 border-t-[hsl(var(--gold))]" />
        </div>
      ) : (
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 items-center gap-4 py-5">
              <div className="col-span-5">
                <p className="font-heading text-lg text-[hsl(var(--cream))]">{item.name}</p>
                <p className="text-xs text-white/40">{categoryLabels[item.category]}{item.is_daily ? " · Denní" : ""}</p>
              </div>
              <div className="col-span-2 text-sm text-[hsl(var(--gold))]">{item.price} Kč</div>
              <div className="col-span-3 text-sm text-white/50">{item.is_available ? "Dostupné" : "Nedostupné"}</div>
              <div className="col-span-2 flex justify-end gap-3">
                <button onClick={() => openEdit(item)} className="text-white/50 hover:text-[hsl(var(--gold))]" aria-label="Upravit"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(item.id)} className="text-white/50 hover:text-destructive" aria-label="Smazat"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowForm(false)}>
          <form onSubmit={save} className="w-full max-w-lg border border-white/10 bg-[hsl(var(--ink))] p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl text-[hsl(var(--cream))]">{editing ? "Upravit" : "Nová položka"}</h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Zavřít"><X className="h-5 w-5 text-white/50" /></button>
            </div>
            <div className="mt-8 space-y-5">
              <input className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))] placeholder-white/30" placeholder="Název *" value={form.name} onChange={(e) => set("name", e.target.value)} required />
              <textarea rows="2" className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))] placeholder-white/30" placeholder="Popis" value={form.description} onChange={(e) => set("description", e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))]" placeholder="Cena (Kč)" value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
                <select className="border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))]" value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k} className="bg-[hsl(var(--ink))]">{v}</option>)}
                </select>
              </div>
              <input className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-[hsl(var(--cream))] placeholder-white/30" placeholder="URL obrázku" value={form.image_url} onChange={(e) => set("image_url", e.target.value)} />
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.is_daily} onChange={(e) => set("is_daily", e.target.checked)} /> Denní menu</label>
                <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.is_available} onChange={(e) => set("is_available", e.target.checked)} /> Dostupné</label>
              </div>
              <button type="submit" className="ghost-btn-gold w-full">{editing ? "Uložit změny" : "Vytvořit"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}