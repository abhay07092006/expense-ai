"use client";

import { useExpense } from "./useExpense";
import { useIncome } from "./useIncome";

export type DateFilter =
  | "today"
  | "week"
  | "month"
  | "lastMonth"
  | "year"
  | "all";

export function useExpenseStats(
  filter: DateFilter = "all"
) {
  const { expenses } = useExpense();
  const { incomes } = useIncome();

  const now = new Date();

  function isInRange(dateString: string) {
    const date = new Date(dateString);

    switch (filter) {
      case "today":
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      case "week": {
        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(
          now.getDate() - 6
        );

        return (
          date >= sevenDaysAgo &&
          date <= now
        );
      }

      case "month":
        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );

      case "lastMonth": {
        const lastMonth =
          now.getMonth() === 0
            ? 11
            : now.getMonth() - 1;

        const year =
          now.getMonth() === 0
            ? now.getFullYear() - 1
            : now.getFullYear();

        return (
          date.getMonth() === lastMonth &&
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

  const filteredIncome =
    incomes.filter((income) =>
      isInRange(income.date)
    );

  const totalExpenses =
    filteredExpenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const totalIncome =
    filteredIncome.reduce(
      (sum, income) =>
        sum + income.amount,
      0
    );

  const balance =
    totalIncome - totalExpenses;

  const totalTransactions =
    filteredExpenses.length;

  const totalIncomeTransactions =
    filteredIncome.length;

  const averagePerTransaction =
    totalTransactions === 0
      ? 0
      : totalExpenses /
        totalTransactions;

  const monthlyExpenses =
    expenses
      .filter((expense) => {
        const date = new Date(
          expense.date
        );

        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );
      })
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

  const monthlyIncome =
    incomes
      .filter((income) => {
        const date = new Date(
          income.date
        );

        return (
          date.getMonth() ===
            now.getMonth() &&
          date.getFullYear() ===
            now.getFullYear()
        );
      })
      .reduce(
        (sum, income) =>
          sum + income.amount,
        0
      );

  const monthlySavings =
    monthlyIncome -
    monthlyExpenses;

  return {
    totalExpenses,
    totalIncome,
    balance,

    totalTransactions,
    totalIncomeTransactions,

    averagePerTransaction,

    monthlyExpenses,
    monthlyIncome,
    monthlySavings,

    filteredExpenses,
    filteredIncome,
  };
}