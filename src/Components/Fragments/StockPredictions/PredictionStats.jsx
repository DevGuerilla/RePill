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
      ariaLabel: "Total obat yang dianalisis dalam sistem prediksi",
    },
    {
      title: "Obat Mendesak",
      value: summary.urgent_medicines || 0,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      textColor: "text-red-900",
      ariaLabel: "Obat dengan prioritas mendesak yang perlu segera dibeli",
    },
    {
      title: "Prioritas Tinggi",
      value: summary.high_priority_medicines || 0,
      icon: TrendingUp,
      color: "orange",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      textColor: "text-orange-900",
      ariaLabel: "Obat dengan prioritas tinggi",
    },
    {
      title: "Akan Habis Segera",
      value: summary.medicines_running_out_soon || 0,
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-900",
      ariaLabel: "Obat yang akan habis dalam waktu dekat",
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
      ariaLabel: "Total unit yang direkomendasikan untuk dibeli",
    },
  ];

  if (!summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 sm:p-6 animate-pulse"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 sm:h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <article
          key={index}
          className={`${stat.bgColor} rounded-xl p-4 sm:p-6 border border-${stat.color}-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group min-h-[140px] sm:min-h-[160px]`}
          role="region"
          aria-label={stat.ariaLabel}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div
              className={`p-2 sm:p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0`}
            >
              <stat.icon
                className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${stat.iconColor}`}
              />
            </div>
            {stat.color === "red" && stat.value > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span
                  className="font-medium text-red-600"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  Perlu Perhatian
                </span>
              </div>
            )}
          </div>

          <div>
            <h3
              className="font-medium text-gray-600 mb-1"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
            >
              {stat.title}
            </h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className={`font-bold ${stat.textColor}`}
                style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}
              >
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString("id-ID")
                  : stat.value}
              </span>
              {stat.suffix && (
                <span
                  className="text-gray-500"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>
          </div>

          {(stat.color === "red" || stat.color === "orange") && (
            <div className="mt-3 sm:mt-4">
              <div className="flex justify-between items-center mb-1">
                <span
                  className="text-gray-500"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  Status
                </span>
                <span
                  className={`font-medium ${stat.textColor}`}
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
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
        </article>
      ))}
    </div>
  );
};

export default PredictionStats;
