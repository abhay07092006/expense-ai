import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

import ExpenseStats from "@/components/expenses/ExpenseStats";
import ExpenseSearch from "@/components/expenses/ExpenseSearch";
import ExpenseFilters from "@/components/expenses/ExpenseFilters";
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog";
import ExpenseTable from "@/components/expenses/ExpenseTable";

export default function ExpensesPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <main className="space-y-8 p-8">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-bold text-white">
                Expenses
              </h1>

              <p className="mt-2 text-slate-400">
                Manage all your daily expenses.
              </p>
            </div>

            <AddExpenseDialog />

          </div>

          <ExpenseStats />

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <ExpenseSearch />

            <ExpenseFilters />

          </div>

          <ExpenseTable />

        </main>
      </div>
    </div>
  );
}