import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock login — aceita qualquer email/senha
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      setError("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    // Simula resposta do backend
    const mockUser = {
      id: "1",
      name: "Marina Alcântara",
      slug: "marina-alcantara",
      email,
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    };

    login("mock-jwt-token-" + Date.now(), mockUser);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-gray-500">
            Entre para gerenciar seu portfólio.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
                placeholder="artista@email.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem conta?{" "}
            <Link to="/register" className="text-brand-600 font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </div>

        {/* Dica de desenvolvimento */}
        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700 text-center">
          Mock: qualquer e-mail e senha funcionam para login.
        </div>
      </div>
    </div>
  );
}
