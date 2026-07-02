
"use client";

import { useExpense } from "@/hooks/useExpense";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyTrendChart() {
  const { expenses } = useExpense();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => {
    const total = expenses
      .filter((expense) => {
        const date = new Date(expense.date);
        return date.getMonth() === index;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    return {
      month,
      expense: total,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Monthly Expense Trend
      </h2>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}