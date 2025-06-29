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

  if (!medicines || medicines.length === 0) {
    return (
      <section
        className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
        aria-label="Obat terbaru"
      >
        <header className="flex items-center mb-4 sm:mb-6">
          <div className="bg-emerald-500 p-2 rounded-lg mr-3 group-hover:bg-emerald-600 transition-colors duration-300 flex-shrink-0">
            <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Obat Terbaru
          </h2>
        </header>
        <div className="text-center py-8">
          <Pill className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 text-gray-300" />
          <p
            className="text-gray-500"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Belum ada obat terbaru
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
      aria-label="Obat terbaru"
    >
      <header className="flex items-center mb-4 sm:mb-6">
        <div className="bg-emerald-500 p-2 rounded-lg mr-3 group-hover:bg-emerald-600 transition-colors duration-300 flex-shrink-0">
          <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h2
          className="font-bold text-gray-900"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Obat Terbaru
        </h2>
      </header>
      <div className="space-y-3 sm:space-y-4">
        {medicines?.slice(0, 5).map((medicine, index) => (
          <article
            key={index}
            className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl border border-white/20 
              hover:bg-white/90 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1
              transition-all duration-300 cursor-pointer
              hover:border-emerald-200 min-h-[60px] sm:min-h-[72px]"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
            role="button"
            tabIndex={0}
            aria-label={`Obat ${medicine.name}, tipe ${getTypeLabel(
              medicine.type
            )}`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full 
              flex items-center justify-center shadow-lg
              group-hover:scale-110 group-hover:shadow-xl
              transform transition-all duration-300 flex-shrink-0"
            >
              <Pill className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-125 group-hover:animate-pulse transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors duration-300"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                title={medicine.name}
              >
                {medicine.name}
              </p>
              <p
                className="text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                title={medicine.code}
              >
                {medicine.code}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full font-medium 
              ${getTypeColor(medicine.type)} 
              group-hover:scale-105 transform transition-all duration-300 flex-shrink-0`}
              style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
            >
              {getTypeLabel(medicine.type)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentMedicines;
