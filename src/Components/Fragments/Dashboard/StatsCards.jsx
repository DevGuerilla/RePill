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
    },
    {
      title: "Total Obat",
      value: dashboardStats?.total_medicines || 0,
      icon: Pill,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:from-green-500 hover:to-green-600",
    },
    {
      title: "Total Supplier",
      value: dashboardStats?.total_suppliers || 0,
      icon: Truck,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:from-purple-500 hover:to-purple-600",
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
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`group ${stat.bgColor} rounded-xl p-6 border border-gray-200 
              hover:scale-105 hover:shadow-xl hover:border-gray-300 
              transform transition-all duration-300 ease-out cursor-pointer
              hover:bg-gradient-to-br ${stat.hoverColor} hover:text-white
              relative overflow-hidden`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-white/90 transition-colors duration-300">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform">
                  {stat.value.toLocaleString()}
                </p>
                {stat.subtitle && (
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-white/80 transition-colors duration-300">
                    {stat.subtitle}
                  </p>
                )}
              </div>
              <div
                className={`${stat.color} p-3 rounded-xl shadow-lg 
                group-hover:scale-125 
                transform transition-all duration-300 ease-out
                group-hover:shadow-2xl group-hover:bg-white/20`}
              >
                <IconComponent className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
            </div>

            {/* Ripple effect */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transform transition-all duration-500 ease-out"></div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
