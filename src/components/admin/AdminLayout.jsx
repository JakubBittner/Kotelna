import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { UtensilsCrossed, CalendarDays, Users, FileText, LogOut, Menu as MenuIcon, X } from "lucide-react";

const links = [
  { to: "/admin/menu", label: "Menu Manager", icon: UtensilsCrossed },
  { to: "/admin/rezervace", label: "Rezervace", icon: CalendarDays },
  { to: "/admin/uzivatele", label: "Uživatelé", icon: Users },
  { to: "/admin/obsah", label: "Obsah", icon: FileText },
];

export default function AdminLayout() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {}).finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[hsl(var(--ink))]">
        <div className="h-8 w-8 animate-spin rounded-full border border-white/20 border-t-[hsl(var(--gold))]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-[hsl(var(--ink))] text-[hsl(var(--cream))]">
        <h1 className="font-heading text-3xl">Přístup zamítnut</h1>
        <p className="text-white/60">Tato sekce je pouze pro administrátory.</p>
        <Link to="/" className="ghost-btn-gold mt-4">Zpět na web</Link>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <Link to="/admin/menu" className="font-heading text-2xl tracking-[0.2em] uppercase text-[hsl(var(--cream))]" onClick={() => setOpen(false)}>
        Kotelna
      </Link>
      <p className="eyebrow mt-2 text-white/40">Admin Dashboard</p>
      <nav className="mt-12 flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const active = location.pathname === l.to;
          return (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 border-l-2 px-4 py-3 text-sm transition-all ${active ? "border-[hsl(var(--gold))] bg-white/5 text-[hsl(var(--gold))]" : "border-transparent text-white/60 hover:text-white"}`}>
              <l.icon className="h-4 w-4" strokeWidth={1.25} />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 pt-6">
        <p className="mb-2 truncate text-sm text-white/60">{user.email}</p>
        <button onClick={() => base44.auth.logout("/")} className="eyebrow flex items-center gap-2 text-white/50 transition-colors hover:text-destructive">
          <LogOut className="h-4 w-4" /> Odhlásit
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--ink))] text-[hsl(var(--cream))]">
      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 p-8 lg:block">
          <SidebarContent />
        </aside>

        <button className="fixed left-4 top-4 z-50 lg:hidden" onClick={() => setOpen(true)} aria-label="Otevřít navigaci">
          <MenuIcon className="h-6 w-6 text-[hsl(var(--cream))]" />
        </button>
        {open && (
          <div className="fixed inset-0 z-50 bg-[hsl(var(--ink))]/95 p-8 lg:hidden">
            <button onClick={() => setOpen(false)} className="mb-8" aria-label="Zavřít navigaci">
              <X className="h-6 w-6 text-[hsl(var(--cream))]" />
            </button>
            <SidebarContent />
          </div>
        )}

        <main className="min-h-screen flex-1 px-6 py-16 md:px-12 md:py-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}