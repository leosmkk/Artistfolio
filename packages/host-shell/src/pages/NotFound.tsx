import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-7xl font-display font-bold text-brand-200 mb-4">404</p>
      <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
        Página não encontrada
      </h1>
      <p className="text-gray-500 mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
