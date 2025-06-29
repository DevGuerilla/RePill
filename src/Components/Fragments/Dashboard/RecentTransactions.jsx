import React from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const RecentTransactions = ({ transactions }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTypeLabel = (type) => {
    return type === "in" ? "Masuk" : "Keluar";
  };

  if (!transactions || transactions.length === 0) {
    return (
      <section
        className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300"
        aria-label="Transaksi terbaru"
      >
        <header className="flex items-center mb-4 sm:mb-6">
          <div className="bg-purple-500 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors duration-300 flex-shrink-0">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <h2
            className="font-bold text-gray-900"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Transaksi Terbaru
          </h2>
        </header>
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 text-gray-300 animate-pulse" />
          <p style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
            Belum ada transaksi terbaru
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="glass rounded-xl p-4 sm:p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300"
      aria-label="Transaksi terbaru"
    >
      <header className="flex items-center mb-4 sm:mb-6">
        <div className="bg-purple-500 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors duration-300 flex-shrink-0">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h2
          className="font-bold text-gray-900"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Transaksi Terbaru
        </h2>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 hover:border-purple-200 transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 min-w-[480px]">
            <thead className="bg-gray-50/80 backdrop-blur-sm">
              <tr>
                <th
                  className="px-3 sm:px-4 py-3 sm:py-4 text-left font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  <span className="hidden sm:inline">Obat</span>
                  <span className="sm:hidden">Obat</span>
                </th>
                <th
                  className="px-2 sm:px-3 py-3 sm:py-4 text-center font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  <span className="hidden sm:inline">Jenis</span>
                  <span className="sm:hidden">Jenis</span>
                </th>
                <th
                  className="px-2 sm:px-3 py-3 sm:py-4 text-center font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  Jumlah
                </th>
                <th
                  className="px-3 sm:px-4 py-3 sm:py-4 text-right font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                >
                  <span className="hidden sm:inline">Tanggal</span>
                  <span className="sm:hidden">Tgl</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-200">
              {transactions?.slice(0, 5).map((transaction, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/90 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-0.5
                    transition-all duration-300 cursor-pointer group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Transaksi ${getTypeLabel(
                    transaction.type
                  )} obat ${transaction.stock.medicine.name}, ${
                    transaction.qty
                  } unit`}
                >
                  <td className="px-3 sm:px-4 py-3 sm:py-4">
                    <div className="flex items-center min-w-0">
                      <div
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg 
                        flex items-center justify-center mr-2 sm:mr-3
                        group-hover:scale-110 group-hover:shadow-md
                        transform transition-all duration-300 flex-shrink-0"
                      >
                        <span
                          className="text-white font-bold group-hover:scale-125 transition-transform duration-300"
                          style={{
                            fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
                          }}
                        >
                          {transaction.stock.medicine.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 truncate"
                          style={{
                            fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
                          }}
                          title={transaction.stock.medicine.name}
                        >
                          {transaction.stock.medicine.name}
                        </div>
                        <div
                          className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate"
                          style={{
                            fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)",
                          }}
                          title={transaction.stock.medicine.code}
                        >
                          {transaction.stock.medicine.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 text-center">
                    <span
                      className={`inline-flex items-center px-1.5 sm:px-2 py-1 rounded-full font-semibold 
                        group-hover:scale-105 transform transition-all duration-300 ${
                          transaction.type === "in"
                            ? "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200"
                            : "bg-red-100 text-red-800 group-hover:bg-red-200"
                        }`}
                      style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                    >
                      {transaction.type === "in" ? (
                        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 group-hover:animate-bounce" />
                      ) : (
                        <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 group-hover:animate-bounce" />
                      )}
                      <span className="hidden sm:inline">
                        {getTypeLabel(transaction.type)}
                      </span>
                      <span className="sm:hidden">
                        {transaction.type === "in" ? "In" : "Out"}
                      </span>
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-3 sm:py-4 text-center">
                    <span
                      className="font-semibold text-gray-900 bg-gray-100 px-1.5 sm:px-2 py-1 rounded-lg 
                      group-hover:bg-purple-100 group-hover:text-purple-600 group-hover:scale-105
                      transform transition-all duration-300"
                      style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                    >
                      {transaction.qty.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 text-right">
                    <div
                      className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300"
                      style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
                    >
                      {formatDate(transaction.created_at)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RecentTransactions;
