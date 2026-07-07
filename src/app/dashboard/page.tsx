import DashboardCards from "@/components/dashboard/DashboardCards";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import GoalsCard from "@/components/dashboard/GoalsCard";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import SetBudgetDialog from "@/components/dashboard/SetBudgetDialog";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import ExportPDF from "@/components/reports/ExportPDF";
import ExportExcel from "@/components/reports/ExportExcel";

export default function DashboardPage() {
  return (
   <div className=" flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Sidebar />

    <div className="flex flex-1 flex-col">
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
          {/* Budget + Set Budget + AI Insight */}
<div className="grid gap-6 lg:grid-cols-3">
  <BudgetProgress />

  <SetBudgetDialog />
  

  <AIInsightCard />
  <ExportPDF />
  
<ExportExcel />
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