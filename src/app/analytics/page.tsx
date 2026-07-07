"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

import MonthlyTrendChart from "@/components/analytics/MonthlyTrendChart";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";
import PaymentBreakdown from "@/components/analytics/PaymentBreakdown";
import TopExpenses from "@/components/analytics/TopExpenses";
import AIInsights from "@/components/analytics/AIInsights";

import { DateFilter } from "@/hooks/useExpenseStats";

export default function AnalyticsPage() {
  const [filter, setFilter] =
    useState<DateFilter>("all");

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <main className="space-y-6 p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-4xl font-bold text-white">
                Analytics
              </h1>

              <p className="mt-2 text-slate-400">
                Track your spending with powerful insights.
              </p>
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as DateFilter
                )
              }
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
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

          <MonthlyTrendChart filter={filter} />

          <div className="grid gap-6 xl:grid-cols-2">

            <CategoryBreakdown filter={filter} />

            <PaymentBreakdown filter={filter} />

          </div>

          <TopExpenses filter={filter} />

          <AIInsights filter={filter} />

        </main>
      </div>
    </div>
  );
}