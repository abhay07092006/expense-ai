"use client";

import { DateFilter } from "@/hooks/useExpenseStats";
import { useExpense } from "@/hooks/useExpense";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  filter: DateFilter;
}

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#eab308",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export default function CategoryBreakdown({
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
          date.getFullYear() === now.getFullYear()
        );

      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 6);

        return date >= weekAgo && date <= now;
      }

      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      case "lastMonth": {
        const month =
          now.getMonth() === 0 ? 11 : now.getMonth() - 1;

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
          date.getFullYear() === now.getFullYear()
        );

      default:
        return true;
    }
  }

  const filteredExpenses = expenses.filter((expense) =>
    isInRange(expense.date)
  );

  const categoryTotals: Record<string, number> = {};

  filteredExpenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) +
      expense.amount;
  });

  const data = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-white">
          Category Breakdown
        </h2>

        <div className="mt-10 flex h-64 items-center justify-center text-slate-400">
          No expenses available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Category Breakdown
      </h2>

      <div className="mx-auto h-64 w-64">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${Number(
                  value
                ).toLocaleString()}`,
                "Amount",
              ]}
              contentStyle={{
                backgroundColor:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius:
                  "10px",
              }}
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-8 space-y-5">

        {data.map((item, index) => {
          const percent =
            (item.value / total) * 100;

          return (
            <div key={item.name}>

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="h-3.5 w-3.5 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[
                          index %
                            COLORS.length
                        ],
                    }}
                  />

                  <span className="font-medium text-white">
                    {item.name}
                  </span>

                </div>

                <span className="font-semibold text-white">
                  ₹{item.value.toLocaleString()}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                    backgroundColor:
                      COLORS[
                        index %
                          COLORS.length
                      ],
                  }}
                />

              </div>

              <div className="mt-1 text-right text-xs text-slate-400">
                {percent.toFixed(1)}%
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}