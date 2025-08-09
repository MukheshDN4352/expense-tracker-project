import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Format number as currency
const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Sample color palette
const COLORS = [
  "#875cf5", "#34d399", "#facc15", "#fb923c", "#f472b6",
  "#60a5fa", "#f87171", "#4ade80", "#c084fc", "#f97316",
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2">
        <p className="text-xs text-gray-500 font-medium">{category}</p>
        <p className="text-sm text-gray-800 font-semibold">
          Amount: <span className="text-primary">{formatAmount(amount)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data = [], xAxisKey = "month", barKey = "amount" }) => {
  if (!data.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={barKey} barSize={30}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
