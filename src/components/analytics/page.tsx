"use client";

import IncomeExpenseChart from "@/components/analytics/IncomeExpenseChart";

export default function AnalyticsPage() {
  return (
    <div className="p-8">

      <h1 className="mb-8 text-3xl font-bold text-white">
        Analytics
      </h1>

      <IncomeExpenseChart />

    </div>
  );
}