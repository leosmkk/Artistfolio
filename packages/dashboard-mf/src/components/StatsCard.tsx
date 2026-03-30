interface Props {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
}

export default function StatsCard({ label, value, icon, trend }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
