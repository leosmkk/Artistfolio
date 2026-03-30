import { Link } from "react-router-dom";
import type { Work } from "../types";

interface Props {
  work: Work;
  onDelete: (id: string) => void;
}

export default function WorkCard({ work, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-100 flex flex-col sm:flex-row">
      <div className="sm:w-48 h-40 sm:h-auto shrink-0">
        <img
          src={work.imageUrl}
          alt={work.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{work.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {work.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>👁 {work.views} views</span>
            <span>
              {new Date(work.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/dashboard/works/${work.id}/edit`}
              className="px-3 py-1.5 text-sm rounded-lg bg-brand-50 text-brand-700 font-medium hover:bg-brand-100 transition"
            >
              Editar
            </Link>
            <button
              onClick={() => onDelete(work.id)}
              className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
