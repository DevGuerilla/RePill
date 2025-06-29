import React from "react";
import { TrendingUp, Pill, BarChart3, Database } from "lucide-react";

const DrugReportStats = ({ summary }) => {
  const stats = [
    {
      title: "Total Penggunaan",
      value: summary.totalUsage || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Semua transaksi obat",
    },
    {
      title: "Total Obat",
      value: summary.totalDrugs || 0,
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Jenis obat berbeda",
    },
    {
      title: "Rata-rata Penggunaan",
      value: summary.averageUsage?.toFixed(1) || "0.0",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Per jenis obat",
    },
    {
      title: "Obat Terpopuler",
      value: summary.topDrug?.name || "Tidak Ada",
      icon: Database,
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Paling banyak digunakan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {typeof stat.value === "string" && stat.value.length > 10
                    ? `${stat.value.substring(0, 10)}...`
                    : stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div
                className={`p-2 sm:p-3 ${stat.bgColor} rounded-lg self-start sm:self-auto flex-shrink-0`}
              >
                <IconComponent
                  className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DrugReportStats;
