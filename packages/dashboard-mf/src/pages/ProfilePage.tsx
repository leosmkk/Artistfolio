import { useState } from "react";
import { mockProfile } from "../mocks/data";
import type { Profile } from "../types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (field: keyof Profile, value: string) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const updateSocial = (platform: string, url: string) =>
    setProfile((p) => ({
      ...p,
      socialLinks: { ...p.socialLinks, [platform]: url },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Perfil salvo:", profile);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Meu Perfil
        </h1>
        <p className="mt-1 text-gray-500">
          Configure como seu portfólio aparece para visitantes.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <img
              src={profile.avatarUrl || "https://i.pravatar.cc/150?img=0"}
              alt="Avatar"
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-brand-100"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">Foto do perfil</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Recomendado: 400×400px, JPG ou PNG
              </p>
              <button
                type="button"
                className="mt-2 px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200 transition"
              >
                Alterar foto
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="profile-name"
              type="text"
              required
              value={profile.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="profile-specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade
            </label>
            <input
              id="profile-specialty"
              type="text"
              value={profile.specialty}
              onChange={(e) => update("specialty", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
              placeholder="Ilustração Digital, Fotografia, etc."
            />
          </div>

          <div>
            <label htmlFor="profile-bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="profile-bio"
              rows={4}
              value={profile.bio}
              onChange={(e) => update("bio", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition resize-none"
              placeholder="Conte um pouco sobre você e seu trabalho..."
            />
          </div>

          {/* Social Links */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Redes sociais
            </p>
            <div className="space-y-3">
              {["instagram", "behance", "dribbble", "linkedin", "website"].map(
                (platform) => (
                  <div key={platform} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-gray-500 capitalize">
                      {platform}
                    </span>
                    <input
                      type="url"
                      value={profile.socialLinks[platform] || ""}
                      onChange={(e) => updateSocial(platform, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-sm"
                      placeholder={`https://${platform}.com/seu-perfil`}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {saving ? "Salvando..." : saved ? "✓ Salvo!" : "Salvar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
