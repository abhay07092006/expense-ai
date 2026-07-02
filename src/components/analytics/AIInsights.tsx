"use client";

import { useExpense } from "@/hooks/useExpense";

export default function AIInsights() {
  const { expenses } = useExpense();

  const total = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const highest =
    expenses.length > 0
      ? [...expenses].sort(
          (a, b) => b.amount - a.amount
        )[0]
      : null;

  const categories: Record<string, number> = {};

  expenses.forEach((expense) => {
    categories[expense.category] =
      (categories[expense.category] || 0) +
      expense.amount;
  });

  const topCategory =
    Object.entries(categories).sort(
      (a, b) => b[1] - a[1]
    )[0];

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        🤖 AI Insights
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Total Spending
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            ₹{total.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Highest Expense
          </p>

          <h3 className="mt-2 text-xl font-bold text-red-400">
            {highest
              ? `${highest.title} (₹${highest.amount})`
              : "-"}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Top Category
          </p>

          <h3 className="mt-2 text-xl font-bold text-green-400">
            {topCategory
              ? topCategory[0]
              : "-"}
          </h3>
        </div>

      </div>

      <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5 text-blue-300">
        💡 Your highest spending is in{" "}
        <span className="font-semibold">
          {topCategory?.[0] ?? "N/A"}
        </span>
        . Consider setting a monthly budget for this category to improve savings.
      </div>

    </div>
  );
}