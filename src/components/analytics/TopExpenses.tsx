"use client";

import { useExpense } from "@/hooks/useExpense";
import { ArrowUpRight } from "lucide-react";

export default function TopExpenses() {
  const { expenses } = useExpense();

  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Top Expenses
        </h2>

        <span className="text-sm text-slate-400">
          Highest spending
        </span>
      </div>

      <div className="space-y-4">
        {topExpenses.length === 0 ? (
          <p className="py-12 text-center text-slate-400">
            No expenses found.
          </p>
        ) : (
          topExpenses.map((expense, index) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-blue-500"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 font-bold text-blue-400">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {expense.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {expense.category}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-red-400">
                  ₹{expense.amount.toLocaleString()}
                </p>

                <div className="mt-1 flex items-center justify-end gap-1 text-xs text-slate-400">
                  <ArrowUpRight size={14} />
                  {expense.payment}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}