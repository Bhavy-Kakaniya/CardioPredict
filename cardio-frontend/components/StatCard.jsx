function StatCard({ value, label }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-4xl font-extrabold text-blue-600">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default StatCard;
