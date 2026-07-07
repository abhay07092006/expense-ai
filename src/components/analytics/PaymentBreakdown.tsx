"use client";

import { DateFilter } from "@/hooks/useExpenseStats";
import { useExpense } from "@/hooks/useExpense";

interface Props {
  filter: DateFilter;
}

export default function PaymentBreakdown({
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

        return (
          date >= weekAgo &&
          date <= now
        );
      }

      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
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

  const methods = [
    "UPI",
    "Cash",
    "Credit Card",
    "Debit Card",
  ];

  const totals = methods.map((method) => {
    const amount = filteredExpenses
      .filter(
        (expense) =>
          expense.payment === method
      )
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    return {
      method,
      amount,
    };
  });

  const grandTotal = totals.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Payment Breakdown
      </h2>

      <div className="space-y-6">

        {totals.map((item) => {
          const percentage =
            grandTotal === 0
              ? 0
              : (item.amount /
                  grandTotal) *
                100;

          return (
            <div key={item.method}>

              <div className="mb-2 flex justify-between">

                <span className="text-white">
                  {item.method}
                </span>

                <span className="text-slate-400">
                  ₹{item.amount.toLocaleString()}
                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-800">

                <div
                  className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="mt-1 text-right text-xs text-slate-400">
                {percentage.toFixed(1)}%
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}