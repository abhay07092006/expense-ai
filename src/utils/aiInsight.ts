import { Expense } from "@/types/expense";

export function generateInsight(expenses: Expense[]) {
  if (expenses.length === 0) {
    return {
      title: "No expenses yet",
      tip: "Start adding expenses to receive AI-powered insights.",
    };
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categories: Record<string, number> = {};

  expenses.forEach((e) => {
    categories[e.category] =
      (categories[e.category] || 0) + e.amount;
  });

  const topCategory = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const percentage = (
    (topCategory[1] / total) *
    100
  ).toFixed(1);

  return {
    title: `${percentage}% of your spending is on ${topCategory[0]}.`,
    tip: `Try reducing ${topCategory[0]} expenses by 10%. You could improve your monthly savings.`,
  };
}