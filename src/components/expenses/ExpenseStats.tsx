"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useExpenseStats } from "@/hooks/useExpenseStats";
import {
  Wallet,
  CreditCard,
  TrendingDown,
  Receipt,
} from "lucide-react";

export default function ExpenseStats() {
  const {
    totalExpenses,
    monthlyExpenses,
    totalTransactions,
    averagePerTransaction,
  } = useExpenseStats();

  const stats = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: Wallet,
      color: "text-red-500",
    },
    {
      title: "This Month",
      value: `₹${monthlyExpenses.toLocaleString()}`,
      icon: CreditCard,
      color: "text-blue-500",
    },
    {
      title: "Average / Expense",
      value: `₹${Math.round(
        averagePerTransaction
      ).toLocaleString()}`,
      icon: TrendingDown,
      color: "text-yellow-500",
    },
    {
      title: "Transactions",
      value: totalTransactions.toString(),
      icon: Receipt,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
        >
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {item.value}
              </h2>
            </div>

            <item.icon
              className={`h-10 w-10 ${item.color}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}