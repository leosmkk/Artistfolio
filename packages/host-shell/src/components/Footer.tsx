export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Artistfolio — Portfólios para artistas
          independentes.
        </p>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-brand-600 transition">
            Sobre
          </a>
          <a href="#" className="hover:text-brand-600 transition">
            Termos
          </a>
          <a href="#" className="hover:text-brand-600 transition">
            Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
