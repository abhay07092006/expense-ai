"use client";

import { ArrowDownRight } from "lucide-react";
import { useExpense } from "@/hooks/useExpense";

export default function RecentTransactions() {
  const { expenses } = useExpense();

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Transactions
      </h2>

      {recentExpenses.length === 0 ? (
        <div className="text-center text-slate-400 py-12">
          No transactions found
        </div>
      ) : (
        <div className="space-y-5">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <ArrowDownRight className="text-red-500" />

                <div>
                  <p className="font-medium text-white">
                    {expense.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {new Date(
                      expense.date
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="font-semibold text-red-500">
                ₹{expense.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}