import type { Artist } from "../types";

interface Props {
  artist: Artist;
}

const socialIcons: Record<string, string> = {
  instagram: "📷",
  behance: "🅱️",
  dribbble: "🏀",
  linkedin: "💼",
  youtube: "▶️",
  website: "🌐",
};

export default function AboutSection({ artist }: Props) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start gap-6">
        <img
          src={artist.avatarUrl}
          alt={artist.name}
          className="h-24 w-24 rounded-2xl object-cover ring-4 ring-brand-100 shrink-0"
        />
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">
            {artist.name}
          </h2>
          <p className="text-brand-600 font-medium mt-1">{artist.specialty}</p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            {artist.bio}
          </p>

          {Object.keys(artist.socialLinks).length > 0 && (
            <div className="mt-5 flex gap-3">
              {Object.entries(artist.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition"
                  title={platform}
                >
                  <span>{socialIcons[platform] || "🔗"}</span>
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
