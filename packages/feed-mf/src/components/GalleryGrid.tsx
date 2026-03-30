import { useState } from "react";
import TagBadge from "./TagBadge";
import type { Work } from "../types";

interface Props {
  works: Work[];
}

export default function GalleryGrid({ works }: Props) {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <>
      {/* Grid masonry via CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {works.map((work) => (
          <button
            key={work.id}
            onClick={() => setSelected(work)}
            className="block w-full break-inside-avoid rounded-xl overflow-hidden group cursor-pointer bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-brand-200 transition-all duration-300"
          >
            <img
              src={work.imageUrl}
              alt={work.title}
              loading="lazy"
              className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                {work.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {work.tags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.imageUrl}
              alt={selected.title}
              className="w-full rounded-t-2xl object-contain max-h-[60vh]"
            />
            <div className="p-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {selected.title}
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {selected.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">
                {new Date(selected.createdAt).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
