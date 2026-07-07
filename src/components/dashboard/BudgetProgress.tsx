"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useExpense } from "@/hooks/useExpense";

export default function BudgetProgress() {
  const { expenses } = useExpense();

  const [budget, setBudget] = useState<number>(0);
  async function loadBudget() {
    const res = await fetch("/api/budget");

    if (!res.ok) return;

    const data = await res.json();

    if (data) {
      setBudget(data.amount);
    }
  }

  useEffect(() => {
    loadBudget();
  }, []);

  

  const spent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = Math.max(budget - spent, 0);

  const percentage =
    budget === 0
      ? 0
      : Math.min((spent / budget) * 100, 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Monthly Budget
      </h2>

      <p className="mt-2 text-slate-400">
        ₹{spent.toLocaleString()} spent from ₹
        {budget.toLocaleString()}
      </p>

      <Progress value={percentage} className="mt-6" />

      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-slate-400">
            Remaining
          </p>

          <h3 className="text-2xl font-bold text-green-500">
            ₹{remaining.toLocaleString()}
          </h3>
        </div>

        <div>
          <p className="text-slate-400">
            Used
          </p>

          <h3 className="text-2xl font-bold text-red-500">
            {percentage.toFixed(0)}%
          </h3>
        </div>
      </div>

      {percentage >= 80 && percentage < 100 && (
        <div className="mt-6 rounded-xl bg-yellow-500/10 p-4 text-yellow-400">
          ⚠️ You have used more than 80% of your monthly budget.
        </div>
      )}

      {percentage >= 100 && (
        <div className="mt-6 rounded-xl bg-red-500/10 p-4 text-red-400">
          🚨 Budget exceeded! Consider reducing your spending.
        </div>
      )}
    </div>
  );
}