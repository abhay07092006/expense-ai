import DashboardCards from "@/components/dashboard/DashboardCards";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import GoalsCard from "@/components/dashboard/GoalsCard";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <main className="space-y-8 p-8">
          

          {/* Summary Cards */}
          <DashboardCards />

          {/* Chart + Transactions */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ExpenseChart />
            </div>

            <RecentTransactions />
          </div>

          {/* Budget Progress + AI Insight */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BudgetProgress />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">
                AI Insight
              </h2>

              <p className="text-slate-400">
                You spent 18% more on food this month.
              </p>

              <div className="mt-6 rounded-xl bg-blue-500/10 p-4 text-blue-400">
                💡 Tip: Reducing food delivery by ₹200/day can save around
                ₹6,000 each month.
              </div>
            </div>
          </div>

          {/* Goals + Category Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <GoalsCard />
            <CategoryBreakdown />
          </div>
        </main>
      </div>
    </div>
  );
}