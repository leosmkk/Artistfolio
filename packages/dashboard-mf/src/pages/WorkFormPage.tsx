import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockWorks } from "../mocks/data";

export default function WorkFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const existing = isEditing ? mockWorks.find((w) => w.id === id) : null;

  const [form, setForm] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    tags: existing?.tags.join(", ") || "",
    imageUrl: existing?.imageUrl || "",
  });
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Mock save
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Obra salva:", {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    });
    setSaving(false);
    navigate("/dashboard/works");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          {isEditing ? "Editar Obra" : "Nova Obra"}
        </h1>
        <p className="mt-1 text-gray-500">
          {isEditing
            ? "Atualize as informações da sua obra."
            : "Adicione uma nova obra ao seu portfólio."}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem da Obra
            </label>
            {form.imageUrl ? (
              <div className="relative rounded-xl overflow-hidden bg-gray-50">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full max-h-64 object-contain"
                />
                <button
                  type="button"
                  onClick={() => update("imageUrl", "")}
                  className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-white/90 text-sm text-red-600 font-medium hover:bg-white transition"
                >
                  Remover
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-brand-300 transition cursor-pointer">
                <p className="text-3xl mb-2">📁</p>
                <p className="text-sm text-gray-500">
                  Clique ou arraste para fazer upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG ou WebP — máx. 10MB
                </p>
                {/* Mock: usa uma URL aleatória */}
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "imageUrl",
                      `https://picsum.photos/seed/${Date.now()}/800/600`
                    )
                  }
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 font-medium hover:bg-gray-200 transition"
                >
                  Usar imagem mock
                </button>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="work-title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              id="work-title"
              type="text"
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
              placeholder="Nome da obra"
            />
          </div>

          <div>
            <label htmlFor="work-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="work-desc"
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition resize-none"
              placeholder="Fale sobre técnica, contexto, inspiração..."
            />
          </div>

          <div>
            <label htmlFor="work-tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              id="work-tags"
              type="text"
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
              placeholder="concept art, digital, fantasia (separadas por vírgula)"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {saving ? "Salvando..." : isEditing ? "Salvar Alterações" : "Publicar Obra"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
