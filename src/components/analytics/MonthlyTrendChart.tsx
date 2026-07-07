"use client";

import { DateFilter } from "@/hooks/useExpenseStats";
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

interface Props {
  filter: DateFilter;
}

export default function MonthlyTrendChart({
  filter,
}: Props) {
  const { expenses } = useExpense();

  const now = new Date();

  function isInRange(dateString: string) {
    const date = new Date(dateString);

    switch (filter) {
      case "today":
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 6);

        return (
          date >= weekAgo &&
          date <= now
        );
      }

      case "month":
        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      case "lastMonth": {
        const month =
          now.getMonth() === 0
            ? 11
            : now.getMonth() - 1;

        const year =
          now.getMonth() === 0
            ? now.getFullYear() - 1
            : now.getFullYear();

        return (
          date.getMonth() === month &&
          date.getFullYear() === year
        );
      }

      case "year":
        return (
          date.getFullYear() ===
          now.getFullYear()
        );

      default:
        return true;
    }
  }

  const filteredExpenses =
    expenses.filter((expense) =>
      isInRange(expense.date)
    );

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

  const chartData = months.map(
    (month, index) => {
      const total =
        filteredExpenses
          .filter((expense) => {
            const date = new Date(
              expense.date
            );

            return (
              date.getMonth() ===
              index
            );
          })
          .reduce(
            (sum, expense) =>
              sum + expense.amount,
            0
          );

      return {
        month,
        expense: total,
      };
    }
  );

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
          <LineChart
            data={chartData}
          >
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
              formatter={(value) => [
                `₹${Number(
                  value
                ).toLocaleString()}`,
                "Expense",
              ]}
              contentStyle={{
                backgroundColor:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{ r: 5 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}