import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../context/authStore";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-display font-bold tracking-tight text-brand-600 hover:text-brand-700 transition"
        >
          Artistfolio
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg transition ${
              location.pathname === "/"
                ? "bg-brand-50 text-brand-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Explorar
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-lg transition ${
                  isActive("/dashboard")
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-3 ml-2">
                {user?.avatarUrl && (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-100"
                  />
                )}
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition font-medium"
              >
                Criar Conta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
