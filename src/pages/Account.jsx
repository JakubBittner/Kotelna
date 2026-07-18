import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionLabel from "@/components/ui/SectionLabel";
import GhostButton from "@/components/ui/GhostButton";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Plus, Trash2 } from "lucide-react";

export default function Account() {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [tab, setTab] = useState("profile");
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addr, setAddr] = useState({ label: "Domů", street: "", city: "Opava", zip: "", phone: "", notes: "" });

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
    base44.entities.DeliveryAddress.filter({}, "-created_date", 50).then(setAddresses).catch(() => {});
    base44.entities.Order.filter({}, "-created_date", 20).then(setOrders).catch(() => {});
    base44.entities.Reservation.filter({}, "-created_date", 20).then(setReservations).catch(() => {});
  }, []);

  const reload = () => {
    base44.entities.DeliveryAddress.filter({}, "-created_date", 50).then(setAddresses);
    base44.entities.Order.filter({}, "-created_date", 20).then(setOrders);
    base44.entities.Reservation.filter({}, "-created_date", 20).then(setReservations);
  };

  const saveAddr = async (e) => {
    e.preventDefault();
    try {
      await base44.entities.DeliveryAddress.create(addr);
      toast({ title: "Adresa uložena" });
      setShowAddrForm(false);
      setAddr({ label: "Domů", street: "", city: "Opava", zip: "", phone: "", notes: "" });
      reload();
    } catch (err) {
      toast({ title: "Chyba", description: err.message, variant: "destructive" });
    }
  };

  const deleteAddr = async (id) => {
    await base44.entities.DeliveryAddress.delete(id);
    reload();
  };

  const statusMap = { ceka: "Čeká", schvaleno: "Schváleno", zruseno: "Zrušeno" };
  const orderStatusMap = { prijato: "Přijato", pripravuje_se: "Připravuje se", na_cesta: "Na cestě", doruceno: "Doručeno", zruseno: "Zrušeno" };
  const typeMap = { stul: "Stůl", bowling: "Bowling", sipky: "Šipky" };

  const tabs = [
    { key: "profile", label: "Profil" },
    { key: "addresses", label: "Adresy" },
    { key: "reservations", label: "Rezervace" },
    { key: "orders", label: "Objednávky" },
  ];

  return (
    <div className="min-h-screen pt-32">
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <SectionLabel>Můj účet</SectionLabel>
          <h1 className="mt-8 font-heading text-4xl md:text-5xl">
            {user?.full_name || "Vítejte"}
          </h1>

          <div className="mt-12 flex flex-wrap gap-2 border-b border-border">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`eyebrow border-b-2 px-4 py-3 transition-colors ${tab === t.key ? "border-[hsl(var(--gold-dark))] text-[hsl(var(--gold-dark))]" : "border-transparent text-muted-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-12">
            {tab === "profile" && (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="border border-border p-8">
                  <p className="eyebrow mb-4">E-mail</p>
                  <p className="text-lg">{user?.email || "—"}</p>
                  <p className="eyebrow mb-4 mt-6">Jméno</p>
                  <p className="text-lg">{user?.full_name || "—"}</p>
                  <p className="eyebrow mb-4 mt-6">Role</p>
                  <p className="text-lg capitalize">{user?.role || "—"}</p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <GhostButton to="/rezervace" variant="gold" ariaLabel="Nová rezervace">Nová rezervace</GhostButton>
                  <GhostButton to="/menu" ariaLabel="Zobrazit menu">Zobrazit menu</GhostButton>
                  <button onClick={() => base44.auth.logout("/")} className="eyebrow mt-4 inline-flex items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-destructive">
                    <LogOut className="h-4 w-4" /> Odhlásit se
                  </button>
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl">Doručovací adresy</h2>
                  <button onClick={() => setShowAddrForm((s) => !s)} className="ghost-btn-gold">
                    <Plus className="h-4 w-4" /> {showAddrForm ? "Zrušit" : "Přidat"}
                  </button>
                </div>
                {showAddrForm && (
                  <form onSubmit={saveAddr} className="mt-8 grid gap-6 border border-border p-8 sm:grid-cols-2">
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="Označení" value={addr.label} onChange={(e) => setAddr({ ...addr, label: e.target.value })} />
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="Ulice a číslo *" value={addr.street} onChange={(e) => setAddr({ ...addr, street: e.target.value })} required />
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="Město" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="PSČ *" value={addr.zip} onChange={(e) => setAddr({ ...addr, zip: e.target.value })} required />
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="Telefon *" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} required />
                    <input className="border border-border bg-transparent px-4 py-3 text-sm" placeholder="Poznámka" value={addr.notes} onChange={(e) => setAddr({ ...addr, notes: e.target.value })} />
                    <button type="submit" className="ghost-btn-gold sm:col-span-2">Uložit adresu</button>
                  </form>
                )}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {addresses.length === 0 && <p className="text-muted-foreground">Zatím žádné adresy.</p>}
                  {addresses.map((a) => (
                    <div key={a.id} className="flex items-start justify-between border border-border p-6">
                      <div>
                        <p className="font-heading text-lg">{a.label}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{a.street}</p>
                        <p className="text-sm text-muted-foreground">{a.zip} {a.city}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{a.phone}</p>
                      </div>
                      <button onClick={() => deleteAddr(a.id)} className="text-muted-foreground hover:text-destructive" aria-label="Smazat adresu">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "reservations" && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl">Moje rezervace</h2>
                  <GhostButton to="/rezervace" variant="gold" ariaLabel="Nová rezervace">Nová rezervace</GhostButton>
                </div>
                <div className="mt-8 divide-y divide-border border-t border-b border-border">
                  {reservations.length === 0 && <p className="py-8 text-muted-foreground">Zatím žádné rezervace.</p>}
                  {reservations.map((r) => (
                    <div key={r.id} className="grid gap-4 py-6 md:grid-cols-5 md:items-center">
                      <div>
                        <p className="font-heading text-lg">{typeMap[r.reservation_type]}</p>
                        <p className="text-sm text-muted-foreground">{r.zone}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{r.date}</div>
                      <div className="text-sm text-muted-foreground">{r.time} · {r.duration_hours}h</div>
                      <div className="text-sm text-muted-foreground">{r.party_size} osob</div>
                      <div>
                        <span className={`eyebrow ${r.status === "schvaleno" ? "text-[hsl(var(--gold-dark))]" : r.status === "zruseno" ? "text-destructive" : "text-muted-foreground"}`}>
                          {statusMap[r.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h2 className="font-heading text-2xl">Historie objednávek</h2>
                <div className="mt-8 divide-y divide-border border-t border-b border-border">
                  {orders.length === 0 && <p className="py-8 text-muted-foreground">Zatím žádné objednávky.</p>}
                  {orders.map((o) => (
                    <div key={o.id} className="grid gap-4 py-6 md:grid-cols-4 md:items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{new Date(o.created_date).toLocaleDateString("cs-CZ")}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm">{o.items?.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{o.delivery_address}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-heading text-lg">{o.total} Kč</span>
                        <span className="eyebrow ml-3 text-[hsl(var(--gold-dark))]">{orderStatusMap[o.status]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}