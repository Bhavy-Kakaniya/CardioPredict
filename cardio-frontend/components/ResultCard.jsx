import { AlertTriangle, CheckCircle2, Activity, HeartPulse, TrendingUp } from "lucide-react";

function ResultCard({ result }) {
  const isHighRisk = result.cardio_prediction === 1;
  const riskColor = isHighRisk ? "red" : "green";
  const m = result.clinical_metrics;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className={`px-8 py-8 ${
          isHighRisk
            ? "bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-100"
            : "bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${
                isHighRisk ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {isHighRisk ? <AlertTriangle size={28} /> : <CheckCircle2 size={28} />}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Prediction Result
              </p>
              <h2
                className={`text-3xl font-extrabold ${
                  isHighRisk ? "text-red-700" : "text-green-700"
                }`}
              >
                {result.risk_label}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500">Cardiovascular Risk</p>
            <p
              className={`text-5xl font-extrabold ${
                isHighRisk ? "text-red-600" : "text-green-600"
              }`}
            >
              {result.risk_percentage.toFixed(1)}%
            </p>
            <span
              className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-bold ${
                result.risk_level === "High"
                  ? "bg-red-100 text-red-700"
                  : result.risk_level === "Moderate"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {result.risk_level} Risk Level
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isHighRisk ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${result.risk_percentage}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
            <span>0% — Low Risk</span>
            <span>100% — High Risk</span>
          </div>
        </div>
      </div>

      {/* Clinical Metrics */}
      <div className="grid gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <Activity size={18} />,
            label: "BMI",
            value: m.bmi.toFixed(1),
            sub: m.bmi_category,
          },
          {
            icon: <HeartPulse size={18} />,
            label: "Blood Pressure",
            value: `${result.input_features_transformed.high_bp}/${result.input_features_transformed.low_bp}`,
            sub: m.bp_category,
          },
          {
            icon: <TrendingUp size={18} />,
            label: "Pulse Pressure",
            value: `${m.pulse_pressure} mmHg`,
            sub: "Systolic − Diastolic",
          },
          {
            icon: <CheckCircle2 size={18} />,
            label: "Probability",
            value: `${(result.cardio_probability * 100).toFixed(2)}%`,
            sub: "Model confidence",
          },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="bg-white px-6 py-5">
            <div className="flex items-center gap-2 text-slate-500">
              {icon}
              <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* Insights */}
      {result.insights && result.insights.length > 0 && (
        <div className="px-8 py-8">
          <h3 className="mb-4 font-bold text-slate-900">Health Insights</h3>
          <ul className="space-y-3">
            {result.insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    isHighRisk ? "bg-red-500" : "bg-blue-500"
                  }`}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-slate-600">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
