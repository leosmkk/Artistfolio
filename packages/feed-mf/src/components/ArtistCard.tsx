import { Link } from "react-router-dom";
import type { Artist } from "../types";

interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
  const preview = artist.works?.[0];

  return (
    <Link
      to={`/artist/${artist.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-xl hover:ring-brand-200 transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-50">
        {preview ? (
          <img
            src={preview.imageUrl}
            alt={preview.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            Sem obras publicadas
          </div>
        )}
      </div>

      <div className="p-5 flex items-center gap-3">
        <img
          src={artist.avatarUrl}
          alt={artist.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-100"
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-brand-600 transition-colors">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{artist.specialty}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400 shrink-0">
          {artist.works?.length || 0} obras
        </span>
      </div>
    </Link>
  );
}
