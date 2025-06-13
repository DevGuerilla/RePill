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

  return (
    <div className="glass rounded-xl p-6 border border-white/20 hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-purple-500 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors duration-300">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 hover:border-purple-200 transition-colors duration-300">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Obat
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Jenis
              </th>
              <th className="px-3 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tanggal
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
              >
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg 
                      flex items-center justify-center mr-3
                      group-hover:scale-110 group-hover:shadow-md
                      transform transition-all duration-300"
                    >
                      <span className="text-white text-xs font-bold group-hover:scale-125 transition-transform duration-300">
                        {transaction.stock.medicine.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 truncate">
                        {transaction.stock.medicine.name}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate">
                        {transaction.stock.medicine.code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold 
                      group-hover:scale-105 transform transition-all duration-300 ${
                        transaction.type === "in"
                          ? "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200"
                          : "bg-red-100 text-red-800 group-hover:bg-red-200"
                      }`}
                  >
                    {transaction.type === "in" ? (
                      <TrendingUp className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1 group-hover:animate-bounce" />
                    )}
                    <span className="hidden sm:inline">
                      {getTypeLabel(transaction.type)}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <span
                    className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg 
                    group-hover:bg-purple-100 group-hover:text-purple-600 group-hover:scale-105
                    transform transition-all duration-300"
                  >
                    {transaction.qty.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  <div className="text-xs">
                    {formatDate(transaction.created_at)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(!transactions || transactions.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <Activity className="h-12 w-12 mx-auto mb-3 text-gray-300 animate-pulse" />
          <p>Belum ada transaksi terbaru</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
