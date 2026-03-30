import { useState } from "react";

interface Props {
  artistId: string;
  artistName: string;
}

export default function ContactForm({ artistId, artistName }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Mock — simula envio com delay
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Mensagem enviada:", { ...form, artistId });
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
      <h2 className="text-xl font-display font-bold text-gray-900">
        Fale com {artistName}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Envie uma mensagem diretamente para o artista.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
            Seu nome
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
            placeholder="Maria Silva"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
            Seu e-mail
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
            placeholder="maria@email.com"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensagem
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition resize-none"
            placeholder="Adorei seu trabalho! Gostaria de conversar sobre..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {status === "sending" ? "Enviando..." : status === "sent" ? "✓ Enviado!" : "Enviar Mensagem"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-emerald-600 text-center">
            Mensagem enviada com sucesso!
          </p>
        )}
      </form>
    </section>
  );
}
