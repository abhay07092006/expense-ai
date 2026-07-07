"use client";

import { useState } from "react";

import {
  useExpenseStats,
  DateFilter,
} from "@/hooks/useExpenseStats";

import ExportPDF from "@/components/reports/ExportPDF";
import ExportExcel from "@/components/reports/ExportExcel";

import ExpenseChart from "@/components/dashboard/ExpenseChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";

export default function ReportsPage() {
  const [filter, setFilter] =
    useState<DateFilter>("all");

  const {
    totalIncome,
    totalExpenses,
    balance,
    totalTransactions,
    totalIncomeTransactions,
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
  } = useExpenseStats(filter);

  return (
    <div className="space-y-8 p-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <h1 className="text-3xl font-bold text-white">
          Reports
        </h1>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as DateFilter
            )
          }
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none"
        >
          <option value="all">
            All Time
          </option>

          <option value="today">
            Today
          </option>

          <option value="week">
            Last 7 Days
          </option>

          <option value="month">
            This Month
          </option>

          <option value="lastMonth">
            Last Month
          </option>

          <option value="year">
            This Year
          </option>
        </select>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Total Income
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-500">
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Total Expenses
          </p>

          <h2 className="mt-3 text-3xl font-bold text-red-500">
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Balance
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${
              balance >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹{balance.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">
            Transactions
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-500">
            {totalTransactions +
              totalIncomeTransactions}
          </h2>
        </div>

      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Monthly Summary
        </h2>

        <div className="space-y-4 text-lg">

          <div className="flex justify-between">
            <span className="text-slate-400">
              Income
            </span>

            <span className="font-semibold text-green-500">
              ₹{monthlyIncome.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Expenses
            </span>

            <span className="font-semibold text-red-500">
              ₹{monthlyExpenses.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between border-t border-slate-700 pt-4">

            <span className="font-semibold text-white">
              Savings
            </span>

            <span
              className={`font-bold ${
                monthlySavings >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ₹{monthlySavings.toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      <ExpenseChart />

      <CategoryBreakdown />

      <div className="grid gap-6 md:grid-cols-2">
        <ExportPDF />
        <ExportExcel />
      </div>

    </div>
  );
}