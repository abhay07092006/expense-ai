import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

import MonthlyTrendChart from "@/components/analytics/MonthlyTrendChart";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";
import PaymentBreakdown from "@/components/analytics/PaymentBreakdown";
import TopExpenses from "@/components/analytics/TopExpenses";
import AIInsights from "@/components/analytics/AIInsights";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <main className="space-y-6 p-8">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Analytics
            </h1>

            <p className="mt-2 text-slate-400">
              Track your spending with powerful insights.
            </p>
          </div>

          <MonthlyTrendChart />

          <div className="grid gap-6 xl:grid-cols-2">

            <CategoryBreakdown />

            <PaymentBreakdown />

          </div>

          <TopExpenses />

          <AIInsights />

        </main>
      </div>
    </div>
  );
}