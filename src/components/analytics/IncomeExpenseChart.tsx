"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useExpenseStats } from "@/hooks/useExpenseStats";

export default function IncomeExpenseChart() {
  const {
    monthlyIncome,
    monthlyExpenses,
  } = useExpenseStats();

  const data = [
    {
      name: "This Month",
      Income: monthlyIncome,
      Expense: monthlyExpenses,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Income vs Expense
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid stroke="#1e293b" />

            <XAxis dataKey="name" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Bar
              dataKey="Income"
              fill="#22c55e"
            />

            <Bar
              dataKey="Expense"
              fill="#ef4444"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}