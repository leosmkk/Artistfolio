import { useParams, Link } from "react-router-dom";
import GalleryGrid from "../components/GalleryGrid";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/ContactForm";
import { mockArtists } from "../mocks/artists";

export default function ArtistPage() {
  const { slug } = useParams<{ slug: string }>();
  const artist = mockArtists.find((a) => a.slug === slug);

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Artista não encontrado
        </h1>
        <p className="mt-2 text-gray-500">
          O portfólio que você procura não existe ou foi removido.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
        >
          Voltar ao Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-400">
        <Link to="/" className="hover:text-brand-600 transition">
          Explorar
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">{artist.name}</span>
      </nav>

      {/* Sobre */}
      <AboutSection artist={artist} />

      {/* Galeria */}
      <div className="mt-10">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
          Obras ({artist.works.length})
        </h2>
        <GalleryGrid works={artist.works} />
      </div>

      {/* Contato */}
      <div className="mt-12 max-w-lg">
        <ContactForm artistId={artist.id} artistName={artist.name} />
      </div>
    </div>
  );
}
