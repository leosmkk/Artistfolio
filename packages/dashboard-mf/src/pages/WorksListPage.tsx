import { useState } from "react";
import { Link } from "react-router-dom";
import WorkCard from "../components/WorkCard";
import { mockWorks as initialWorks } from "../mocks/data";
import type { Work } from "../types";

export default function WorksListPage() {
  const [works, setWorks] = useState<Work[]>(initialWorks);

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      setWorks((prev) => prev.filter((w) => w.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Minhas Obras
          </h1>
          <p className="mt-1 text-gray-500">
            {works.length} {works.length === 1 ? "obra publicada" : "obras publicadas"}
          </p>
        </div>
        <Link
          to="/dashboard/works/new"
          className="px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition"
        >
          + Nova Obra
        </Link>
      </div>

      {works.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl ring-1 ring-gray-100">
          <p className="text-4xl mb-3">🎨</p>
          <p className="text-lg text-gray-600 font-medium">
            Nenhuma obra publicada ainda
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Comece adicionando sua primeira obra ao portfólio.
          </p>
          <Link
            to="/dashboard/works/new"
            className="inline-block mt-5 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition"
          >
            Publicar primeira obra
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
