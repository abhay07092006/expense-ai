"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useExpenseStats } from "@/hooks/useExpenseStats";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  PiggyBank,
} from "lucide-react";

export default function DashboardCards() {
  const {
    totalExpenses,
    monthlyExpenses,
    totalTransactions,
    averagePerTransaction,
  } = useExpenseStats();

  const cards = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "This Month",
      value: `₹${monthlyExpenses.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      title: "Average / Transaction",
      value: `₹${Math.round(
        averagePerTransaction
      ).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-yellow-500",
    },
    {
      title: "Transactions",
      value: totalTransactions.toString(),
      icon: PiggyBank,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="border-slate-800 bg-slate-900"
        >
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-slate-400">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {card.value}
              </h2>
            </div>

            <card.icon
              className={`h-10 w-10 ${card.color}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}