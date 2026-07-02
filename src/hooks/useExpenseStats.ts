"use client";
import { useExpense } from "./useExpense";

export function useExpenseStats() {
  const { expenses } = useExpense();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalTransactions = expenses.length;

  const averagePerTransaction =
    totalTransactions === 0
      ? 0
      : totalExpenses / totalTransactions;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

  return {
    totalExpenses,
    monthlyExpenses,
    totalTransactions,
    averagePerTransaction,
  };
}