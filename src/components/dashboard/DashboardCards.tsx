"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useExpenseStats } from "@/hooks/useExpenseStats";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  PiggyBank,
} from "lucide-react";

export default function DashboardCards() {
  const {
    totalExpenses,
    totalTransactions,
    totalIncome,
    balance,
    totalIncomeTransactions,
  } = useExpenseStats();

  const cards = [
    {
      title: "Total Income",
      value: `₹${totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-500",
    },
    {
      title: "Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: Wallet,
      color:
        balance >= 0
          ? "text-blue-500"
          : "text-red-500",
    },
    {
      title: "Transactions",
      value: (
        totalTransactions +
        totalIncomeTransactions
      ).toString(),
      icon: PiggyBank,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
          }}
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
        >
          <Card className="border border-slate-800 bg-white/5 backdrop-blur-xl">
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
        </motion.div>
      ))}
    </div>
  );
}