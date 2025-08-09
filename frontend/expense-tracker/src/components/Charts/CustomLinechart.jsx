import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// Format numbers with commas and currency
const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, amount } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2">
        <p className="text-xs text-gray-500 font-medium">{month}</p>
        <p className="text-sm text-gray-800 font-semibold">
          Amount: <span className="text-primary">{formatAmount(amount)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data = [] }) => {
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
        <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            strokeWidth={2}
            fill="url(#incomeGradient)"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
