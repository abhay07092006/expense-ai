import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    title: "Netflix",
    date: "Today",
    amount: "-₹649",
    expense: true,
  },
  {
    title: "Salary",
    date: "Yesterday",
    amount: "+₹80,000",
    expense: false,
  },
  {
    title: "Amazon",
    date: "2 days ago",
    amount: "-₹2,450",
    expense: true,
  },
  {
    title: "Swiggy",
    date: "3 days ago",
    amount: "-₹430",
    expense: true,
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Transactions
      </h2>

      <div className="space-y-5">
        {transactions.map((item) => (
          <div
            key={item.title + item.date}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {item.expense ? (
                <ArrowDownRight className="text-red-500" />
              ) : (
                <ArrowUpRight className="text-green-500" />
              )}

              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-sm text-slate-400">{item.date}</p>
              </div>
            </div>

            <p
              className={
                item.expense ? "text-red-500" : "text-green-500"
              }
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}