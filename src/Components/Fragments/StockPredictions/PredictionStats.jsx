import React from "react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Clock,
  Target,
} from "lucide-react";

const PredictionStats = ({ summary }) => {
  const stats = [
    {
      title: "Total Obat Dianalisis",
      value: summary.total_medicines_analyzed || 0,
      icon: Package,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
      textColor: "text-blue-500",
    },
    {
      title: "Obat Mendesak",
      value: summary.urgent_medicines || 0,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      textColor: "text-red-900",
    },
    {
      title: "Prioritas Tinggi",
      value: summary.high_priority_medicines || 0,
      icon: TrendingUp,
      color: "orange",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      textColor: "text-orange-900",
    },
    {
      title: "Akan Habis Segera",
      value: summary.medicines_running_out_soon || 0,
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-900",
    },
    {
      title: "Rekomendasi Pembelian",
      value: summary.total_recommended_purchases || 0,
      icon: ShoppingCart,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-900",
      suffix: " unit",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-6 border border-${stat.color}-200 hover:shadow-lg transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow`}
            >
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            {stat.color === "red" && stat.value > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-red-600">
                  Perlu Perhatian
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {stat.title}
            </p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${stat.textColor}`}>
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString("id-ID")
                  : stat.value}
              </span>
              {stat.suffix && (
                <span className="text-sm text-gray-500">{stat.suffix}</span>
              )}
            </div>
          </div>

          {/* Progress indicator for certain stats */}
          {(stat.color === "red" || stat.color === "orange") && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-medium ${stat.textColor}`}>
                  {stat.value === 0
                    ? "Aman"
                    : stat.value <= 5
                    ? "Terkendali"
                    : "Perlu Tindakan"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full bg-gradient-to-r ${
                    stat.value === 0
                      ? "from-green-400 to-green-500"
                      : stat.value <= 5
                      ? "from-yellow-400 to-yellow-500"
                      : "from-red-400 to-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (stat.value / (summary.total_medicines_analyzed || 1)) *
                        100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PredictionStats;
