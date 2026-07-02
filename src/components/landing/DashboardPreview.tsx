import { Card } from "@/components/ui/card";

export default function DashboardPreview() {
  return (
    <Card className="mt-16 w-full max-w-5xl rounded-3xl border-slate-700 bg-slate-900 p-8">

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Budget
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            ₹15,000
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Spent
          </p>

          <h2 className="mt-3 text-3xl font-bold text-red-400">
            ₹8,600
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <p className="text-slate-400">
            Remaining
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-400">
            ₹6,400
          </h2>
        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-800 p-6">

        <h3 className="mb-6 text-xl font-bold">
          Recent Transactions
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>🍔 Food</span>
            <span>₹450</span>
          </div>

          <div className="flex justify-between">
            <span>⛽ Petrol</span>
            <span>₹900</span>
          </div>

          <div className="flex justify-between">
            <span>📚 Books</span>
            <span>₹1200</span>
          </div>

        </div>

      </div>

    </Card>
  );
}