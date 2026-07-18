import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Search } from "lucide-react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    base44.entities.User.list("-created_date", 200).then(setUsers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) => {
    const s = q.toLowerCase();
    return !s || (u.email || "").toLowerCase().includes(s) || (u.full_name || "").toLowerCase().includes(s);
  });

  return (
    <div>
      <p className="eyebrow text-[hsl(var(--gold))]">Správa uživatelů</p>
      <h1 className="mt-4 font-heading text-4xl md:text-5xl text-[hsl(var(--cream))]">User Manager</h1>

      <div className="mt-8 flex items-center gap-3 border border-white/20 px-4 py-3 max-w-md">
        <Search className="h-4 w-4 text-white/40" />
        <input className="flex-1 bg-transparent text-sm text-[hsl(var(--cream))] placeholder-white/30 focus:outline-none" placeholder="Hledat e-mail nebo jméno…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {loading ? (
        <div className="mt-16 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border border-white/20 border-t-[hsl(var(--gold))]" />
        </div>
      ) : (
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {filtered.map((u) => (
            <div key={u.id} className="grid grid-cols-12 items-center gap-4 py-5">
              <div className="col-span-5">
                <p className="font-heading text-lg text-[hsl(var(--cream))]">{u.full_name || "—"}</p>
                <p className="text-sm text-white/50">{u.email}</p>
              </div>
              <div className="col-span-3">
                <span className={`eyebrow ${u.role === "admin" ? "text-[hsl(var(--gold))]" : "text-white/50"}`}>{u.role === "admin" ? "Administrátor" : "Uživatel"}</span>
              </div>
              <div className="col-span-4 text-right text-sm text-white/40">
                {new Date(u.created_date).toLocaleDateString("cs-CZ")}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-8 text-white/40">Žádní uživatelé.</p>}
        </div>
      )}
    </div>
  );
}