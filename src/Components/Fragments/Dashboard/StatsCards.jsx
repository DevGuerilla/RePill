import React from "react";
import { Users, Pill, Truck, Package } from "lucide-react";

const StatsCards = ({ dashboardStats }) => {
  const statsCards = [
    {
      title: "Total Pengguna",
      value: dashboardStats?.total_users?.total || 0,
      subtitle: `${dashboardStats?.total_users?.recent || 0} terbaru`,
      icon: Users,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:from-blue-500 hover:to-blue-600",
      ariaLabel: "Total pengguna dalam sistem",
    },
    {
      title: "Total Obat",
      value: dashboardStats?.total_medicines || 0,
      icon: Pill,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:from-green-500 hover:to-green-600",
      ariaLabel: "Total obat yang tersedia",
    },
    {
      title: "Total Supplier",
      value: dashboardStats?.total_suppliers || 0,
      icon: Truck,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:from-purple-500 hover:to-purple-600",
      ariaLabel: "Total supplier terdaftar",
    },
    {
      title: "Total Stok",
      value: dashboardStats?.total_stocks?.total || 0,
      subtitle: `${
        dashboardStats?.total_stocks?.low_stock_count || 0
      } stok rendah`,
      icon: Package,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:from-orange-500 hover:to-orange-600",
      ariaLabel: "Total stok obat tersedia",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <article
            key={index}
            role="button"
            tabIndex={0}
            aria-label={stat.ariaLabel}
            className={`group ${stat.bgColor} rounded-xl 
              p-4 sm:p-6 
              border border-gray-200 
              hover:scale-105 hover:shadow-xl hover:border-gray-300 
              transform transition-all duration-300 ease-out 
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              hover:bg-gradient-to-br ${stat.hoverColor} hover:text-white
              relative overflow-hidden
              min-h-[120px] sm:min-h-[140px]`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 group-hover:text-white/90 transition-colors duration-300">
                  {stat.title}
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform leading-tight">
                  {stat.value.toLocaleString()}
                </p>
                {stat.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 group-hover:text-white/80 transition-colors duration-300">
                    {stat.subtitle}
                  </p>
                )}
              </div>
              <div
                className={`${stat.color} p-2 sm:p-3 rounded-xl shadow-lg 
                group-hover:scale-125 
                transform transition-all duration-300 ease-out
                group-hover:shadow-2xl group-hover:bg-white/20
                flex-shrink-0 ml-2`}
              >
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:animate-pulse" />
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transform transition-all duration-500 ease-out" />
          </article>
        );
      })}
    </div>
  );
};

export default StatsCards;
