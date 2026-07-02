"use client";

import { useExpense } from "@/hooks/useExpense";

export default function PaymentBreakdown() {
  const { expenses } = useExpense();

  const methods = ["UPI", "Cash", "Credit Card", "Debit Card"];

  const totals = methods.map((method) => {
    const amount = expenses
      .filter((expense) => expense.payment === method)
      .reduce((sum, expense) => sum + expense.amount, 0);

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
              : (item.amount / grandTotal) * 100;

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