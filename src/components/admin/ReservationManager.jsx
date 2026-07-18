import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Pencil } from "lucide-react";

const statusMap = { ceka: "Čeká", schvaleno: "Schváleno", zruseno: "Zrušeno" };
const typeMap = { stul: "Stůl", bowling: "Bowling", sipky: "Šipky" };
const zoneMap = { kotelna: "Kotelna", terasa: "Terasa", drahy: "Dráhy" };

export default function ReservationManager() {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    base44.entities.Reservation.list("-date", 200).then(setReservations).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await base44.entities.Reservation.update(id, { status });
    toast({ title: `Rezervace ${statusMap[status].toLowerCase()}` });
    load();
  };

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  const sorted = [...filtered].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-[hsl(var(--gold))]">Správa rezervací</p>
          <h1 className="mt-4 font-heading text-4xl md:text-5xl text-[hsl(var(--cream))]">Reservation Manager</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {[{ k: "all", l: "Vše" }, { k: "ceka", l: "Čeká" }, { k: "schvaleno", l: "Schváleno" }, { k: "zruseno", l: "Zrušeno" }].map((f) => (
            <button key={f.k} onClick={() => setFilter(f.k)} className={`eyebrow border px-4 py-2 transition-colors ${filter === f.k ? "border-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "border-white/20 text-white/50"}`}>
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-16 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border border-white/20 border-t-[hsl(var(--gold))]" />
        </div>
      ) : (
        <div className="mt-12">
          <div className="hidden grid-cols-12 gap-4 border-b border-white/10 pb-4 text-xs uppercase tracking-[0.15em] text-white/40 md:grid">
            <div className="col-span-2">Typ</div>
            <div className="col-span-2">Datum / čas</div>
            <div className="col-span-2">Zákazník</div>
            <div className="col-span-2">Detail</div>
            <div className="col-span-1">Stav</div>
            <div className="col-span-3 text-right">Akce</div>
          </div>
          <div className="divide-y divide-white/10">
            {sorted.map((r) => (
              <div key={r.id} className="grid grid-cols-1 gap-4 py-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-2">
                  <p className="font-heading text-lg text-[hsl(var(--cream))]">{typeMap[r.reservation_type]}</p>
                  <p className="text-xs text-white/40">{zoneMap[r.zone]}</p>
                </div>
                <div className="md:col-span-2 text-sm text-white/60">{r.date} · {r.time} · {r.duration_hours}h</div>
                <div className="md:col-span-2 text-sm text-white/60">
                  <p>{r.contact_name}</p>
                  <p className="text-xs text-white/40">{r.contact_phone}</p>
                </div>
                <div className="md:col-span-2 text-sm text-white/60">{r.party_size} osob{r.notes && <p className="text-xs text-white/40">{r.notes}</p>}</div>
                <div className="md:col-span-1">
                  <span className={`eyebrow ${r.status === "schvaleno" ? "text-[hsl(var(--gold))]" : r.status === "zruseno" ? "text-destructive" : "text-white/50"}`}>
                    {statusMap[r.status]}
                  </span>
                </div>
                <div className="flex gap-2 md:col-span-3 md:justify-end">
                  {r.status !== "schvaleno" && <button onClick={() => update(r.id, "schvaleno")} className="border border-white/20 px-3 py-2 text-white/60 hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]" aria-label="Schválit"><Check className="h-4 w-4" /></button>}
                  {r.status !== "zruseno" && <button onClick={() => update(r.id, "zruseno")} className="border border-white/20 px-3 py-2 text-white/60 hover:border-destructive hover:text-destructive" aria-label="Zrušit"><X className="h-4 w-4" /></button>}
                </div>
              </div>
            ))}
            {sorted.length === 0 && <p className="py-8 text-white/40">Žádné rezervace.</p>}
          </div>
        </div>
      )}
    </div>
  );
}