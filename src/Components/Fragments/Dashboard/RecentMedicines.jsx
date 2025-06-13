import React from "react";
import { Pill } from "lucide-react";

const RecentMedicines = ({ medicines }) => {
  const getTypeLabel = (type) => {
    const typeMap = {
      tablet: "Tablet",
      capsule: "Kapsul",
      bottle: "Botol",
      syrup: "Sirup",
      cream: "Krim",
      ointment: "Salep",
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type) => {
    const colorMap = {
      tablet: "bg-blue-100 text-blue-800 group-hover:bg-blue-200",
      capsule: "bg-green-100 text-green-800 group-hover:bg-green-200",
      bottle: "bg-purple-100 text-purple-800 group-hover:bg-purple-200",
      syrup: "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200",
      cream: "bg-pink-100 text-pink-800 group-hover:bg-pink-200",
      ointment: "bg-indigo-100 text-indigo-800 group-hover:bg-indigo-200",
    };
    return (
      colorMap[type] || "bg-gray-100 text-gray-800 group-hover:bg-gray-200"
    );
  };

  return (
    <div className="glass rounded-xl p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-500 p-2 rounded-lg mr-3 group-hover:bg-emerald-600 transition-colors duration-300">
          <Pill className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Obat Terbaru</h2>
      </div>
      <div className="space-y-4">
        {medicines?.slice(0, 5).map((medicine, index) => (
          <div
            key={index}
            className="group flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white/20 
              hover:bg-white/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 cursor-pointer
              hover:border-emerald-200"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div
              className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full 
              flex items-center justify-center shadow-lg
              group-hover:scale-110 group-hover:shadow-xl
              transform transition-all duration-300"
            >
              <Pill className="h-6 w-6 text-white group-hover:scale-125 group-hover:animate-pulse transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors duration-300">
                {medicine.name}
              </p>
              <p className="text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300">
                {medicine.code}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
              ${getTypeColor(medicine.type)} 
              group-hover:scale-105 transform transition-all duration-300`}
            >
              {getTypeLabel(medicine.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMedicines;
