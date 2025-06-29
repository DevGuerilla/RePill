import React from "react";
import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ dashboardStats }) => {
  const transactionData = [
    {
      name: "Stok Masuk",
      value: dashboardStats?.total_transactions?.in || 0,
      fill: "#10B981",
    },
    {
      name: "Stok Keluar",
      value: dashboardStats?.total_transactions?.out || 0,
      fill: "#EF4444",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 text-sm">{label}</p>
          <p className="text-xs text-gray-600">
            Jumlah: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      className="glass rounded-xl p-4 sm:p-6 border border-white/20"
      role="region"
      aria-labelledby="transaction-chart-title"
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <div className="bg-primary p-2 rounded-lg mr-3 flex-shrink-0">
          <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h2
          id="transaction-chart-title"
          className="text-lg sm:text-xl font-bold text-gray-900"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          Ringkasan Transaksi
        </h2>
      </div>
      <div
        className="h-64 sm:h-80"
        role="img"
        aria-label="Grafik batang menampilkan perbandingan stok masuk dan keluar"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transactionData}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#cbd5e1"
              strokeWidth={1}
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: "clamp(10px, 1.5vw, 12px)" }}
              axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              tickLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: "clamp(10px, 1.5vw, 12px)" }}
              axisLine={{ stroke: "#cbd5e1", strokeWidth: 1 }}
              tickLine={{ stroke: "#cbd5e1" }}
              grid={{ stroke: "#cbd5e1" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              className="drop-shadow-sm"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TransactionChart;
