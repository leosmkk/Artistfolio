import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import { mockStats, mockWorks } from "../mocks/data";

export default function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Visão Geral
        </h1>
        <p className="mt-1 text-gray-500">
          Acompanhe o desempenho do seu portfólio.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard
          icon="🖼️"
          label="Obras Publicadas"
          value={mockStats.totalWorks}
        />
        <StatsCard
          icon="👁"
          label="Visualizações Totais"
          value={mockStats.totalViews}
          trend="+12%"
        />
        <StatsCard
          icon="✉️"
          label="Mensagens Recebidas"
          value={mockStats.totalContacts}
        />
        <StatsCard
          icon="📈"
          label="Views (7 dias)"
          value={mockStats.recentViews.reduce((a, b) => a + b, 0)}
          trend="+8%"
        />
      </div>

      {/* Mini chart placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-100 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Views — Últimos 7 dias</h2>
        <div className="flex items-end gap-2 h-32">
          {mockStats.recentViews.map((val, i) => {
            const max = Math.max(...mockStats.recentViews);
            const height = (val / max) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-brand-200 rounded-t-md transition-all hover:bg-brand-400"
                  style={{ height: `${height}%` }}
                  title={`${val} views`}
                />
                <span className="text-xs text-gray-400">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent works */}
      <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Obras Recentes</h2>
          <Link
            to="/dashboard/works"
            className="text-sm text-brand-600 font-medium hover:underline"
          >
            Ver todas →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {mockWorks.slice(0, 3).map((work) => (
            <div key={work.id} className="flex items-center gap-4 py-3">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  {work.title}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(work.createdAt).toLocaleDateString("pt-BR")} · {work.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
