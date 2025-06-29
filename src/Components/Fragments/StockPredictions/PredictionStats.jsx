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
      value: summary?.total_medicines_analyzed || 0,
      icon: Package,
      color: "primary",
      bgColor: "bg-primary-light",
      iconColor: "text-primary",
      textColor: "text-primary",
      ariaLabel: "Total obat yang dianalisis dalam sistem prediksi",
      description: "Semua obat terdaftar",
    },
    {
      title: "Obat Mendesak",
      value: summary?.urgent_medicines || 0,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      textColor: "text-red-600",
      ariaLabel: "Obat dengan prioritas mendesak yang perlu segera dibeli",
      description: "Perlu tindakan segera",
    },
    {
      title: "Prioritas Tinggi",
      value: summary?.high_priority_medicines || 0,
      icon: TrendingUp,
      color: "orange",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-600",
      ariaLabel: "Obat dengan prioritas tinggi",
      description: "Prioritas tinggi",
    },
    {
      title: "Akan Habis Segera",
      value: summary?.medicines_running_out_soon || 0,
      icon: Clock,
      color: "yellow",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600",
      ariaLabel: "Obat yang akan habis dalam waktu dekat",
      description: "Monitoring ketat",
    },
    {
      title: "Rekomendasi Pembelian",
      value: summary?.total_recommended_purchases || 0,
      icon: ShoppingCart,
      color: "green",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-600",
      suffix: " unit",
      ariaLabel: "Total unit yang direkomendasikan untuk dibeli",
      description: "Total unit direkomendasikan",
    },
  ];

  if (!summary) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 animate-pulse hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-24"></div>
                <div className="p-2 sm:p-3 bg-gray-300 rounded-lg h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0"></div>
              </div>
              <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded w-16 sm:w-20"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow"
          role="region"
          aria-label={stat.ariaLabel}
        >
          <div className="flex flex-col gap-3">
            {/* Header with title and icon */}
            <div className="flex items-center justify-between">
              <p
                className="text-xs sm:text-sm font-medium text-gray-600 leading-tight"
                style={{ fontSize: "clamp(0.75rem, 1.8vw, 0.875rem)" }}
              >
                {stat.title}
              </p>
              <div
                className={`p-2 sm:p-2.5 lg:p-3 ${stat.bgColor} rounded-lg flex-shrink-0`}
              >
                <stat.icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${stat.iconColor}`}
                />
              </div>
            </div>

            {/* Value section */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <p
                  className="font-bold text-gray-900 leading-none"
                  style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
                >
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString("id-ID")
                    : stat.value}
                </p>
                {stat.suffix && (
                  <span
                    className="text-gray-500 font-medium leading-none"
                    style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              <p
                className="text-gray-500 leading-tight"
                style={{ fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)" }}
              >
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredictionStats;
