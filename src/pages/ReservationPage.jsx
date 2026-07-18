import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/ui/SectionLabel";
import GhostButton from "@/components/ui/GhostButton";
import { useToast } from "@/components/ui/use-toast";

const zones = {
  kotelna: { label: "Kotelna — jádro", desc: "Hlavní sál s klenbami a industriálním duchem." },
  terasa: { label: "Skleněná terasa", desc: "Celoročně klimatizovaná terasa s přírodním světlem." },
  drahy: { label: "Dráhy — bowling & šipky", desc: "Zábava pro firmy i přátele." },
};

const types = {
  stul: "Stůl",
  bowling: "Bowling",
  sipky: "Šipky",
};

export default function ReservationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    reservation_type: "stul",
    zone: "kotelna",
    party_size: 2,
    date: "",
    time: "18:00",
    duration_hours: 2,
    contact_name: "",
    contact_phone: "",
    notes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.contact_name || !form.contact_phone) {
      toast({ title: "Vyplňte prosím všechna povinná pole.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.Reservation.create(form);
      toast({ title: "Rezervace odeslána", description: "Potvrzení zašleme e-mailem." });
      navigate("/ucet");
    } catch (err) {
      toast({ title: "Chyba při odesílání", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32">
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <SectionLabel>Rezervace</SectionLabel>
          <h1 className="mt-8 font-heading text-5xl md:text-7xl">Rezervační divadlo</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Nevybíráte jen čas — vybíráte atmosféru. Rezervujte stůl v hlavním sále, na terase, nebo si zajistěte dráhu na bowling a šipky.
          </p>

          <form onSubmit={submit} className="mt-16 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow mb-6">Vyberte atmosféru</p>
              <div className="space-y-4">
                {Object.entries(zones).map(([key, z]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => set("zone", key)}
                    className={`block w-full border p-6 text-left transition-all duration-300 ${
                      form.zone === key ? "border-[hsl(var(--gold-dark))] bg-[hsl(var(--gold))]/5" : "border-border hover:border-[hsl(var(--gold))]"
                    }`}
                  >
                    <span className="font-heading text-xl">{z.label}</span>
                    <span className="mt-2 block text-sm text-muted-foreground">{z.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="border border-border p-8 md:p-10">
                <div className="grid gap-6">
                  <div>
                    <label className="eyebrow mb-3 block">Typ rezervace</label>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(types).map(([key, label]) => (
                        <button type="button" key={key} onClick={() => set("reservation_type", key)} className={`eyebrow border px-4 py-2 transition-colors ${form.reservation_type === key ? "border-[hsl(var(--gold-dark))] text-[hsl(var(--gold-dark))]" : "border-border"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="eyebrow mb-3 block">Datum</label>
                      <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                    <div>
                      <label className="eyebrow mb-3 block">Čas</label>
                      <input type="time" value={form.time} onChange={(e) => set("time", e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="eyebrow mb-3 block">Počet osob</label>
                      <input type="number" min="1" max="20" value={form.party_size} onChange={(e) => set("party_size", parseInt(e.target.value) || 1)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                    <div>
                      <label className="eyebrow mb-3 block">Délka (h)</label>
                      <input type="number" min="1" max="6" value={form.duration_hours} onChange={(e) => set("duration_hours", parseInt(e.target.value) || 1)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="eyebrow mb-3 block">Jméno *</label>
                      <input type="text" value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                    <div>
                      <label className="eyebrow mb-3 block">Telefon *</label>
                      <input type="tel" value={form.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow mb-3 block">Poznámka</label>
                    <textarea rows="3" value={form.notes} onChange={(e) => set("notes", e.target.value)} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-[hsl(var(--gold-dark))]" placeholder="Alergeny, oslava, dětská židlička…" />
                  </div>

                  <div className="pt-2">
                    <GhostButton type="submit" variant="gold" className={`w-full ${submitting ? "opacity-50" : ""}`} ariaLabel="Odeslat rezervaci">
                      {submitting ? "Odesílám…" : "Odeslat rezervaci"}
                    </GhostButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}