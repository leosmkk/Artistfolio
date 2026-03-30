import { useState, useMemo } from "react";
import ArtistCard from "../components/ArtistCard";
import { mockArtists } from "../mocks/artists";

const specialties = [
  "Todas",
  ...Array.from(new Set(mockArtists.map((a) => a.specialty))),
];

export default function FeedPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const filtered = useMemo(() => {
    return mockArtists.filter((artist) => {
      const matchesSearch =
        artist.name.toLowerCase().includes(search.toLowerCase()) ||
        artist.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "Todas" || artist.specialty === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 tracking-tight">
          Descubra Artistas
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-xl">
          Explore portfólios de artistas independentes e encontre trabalhos que
          inspiram.
        </p>
      </div>

      {/* Busca + Filtros */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar artistas por nome ou especialidade..."
          className="w-full max-w-md px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-sm"
        />

        <div className="flex flex-wrap gap-2">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeFilter === spec
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de artistas */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Nenhum artista encontrado.</p>
          <p className="text-sm mt-1">Tente outro termo de busca ou filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </section>
  );
}
