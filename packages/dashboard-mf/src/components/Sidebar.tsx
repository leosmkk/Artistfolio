import { NavLink } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

const links = [
  { to: "/dashboard", label: "Visão Geral", icon: "📊", end: true },
  { to: "/dashboard/works", label: "Minhas Obras", icon: "🖼️", end: false },
  { to: "/dashboard/works/new", label: "Nova Obra", icon: "➕", end: false },
  { to: "/dashboard/profile", label: "Meu Perfil", icon: "👤", end: false },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)] p-5 hidden lg:block">
      {/* User info */}
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-gray-100">
        {user?.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-100"
          />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {user?.name || "Artista"}
          </p>
          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition w-full"
        >
          <span>🚪</span>
          Sair
        </button>
      </div>
    </aside>
  );
}
