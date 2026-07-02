import { Progress } from "@/components/ui/progress";

export default function BudgetProgress() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Budget Progress
      </h2>

      <p className="mt-2 text-slate-400">
        ₹35,500 spent from ₹50,000
      </p>

      <Progress
        value={71}
        className="mt-6"
      />

      <div className="mt-6 flex justify-between">

        <div>
          <p className="text-slate-400">
            Remaining
          </p>

          <h3 className="text-2xl font-bold text-green-500">
            ₹14,500
          </h3>
        </div>

        <div>
          <p className="text-slate-400">
            Used
          </p>

          <h3 className="text-2xl font-bold text-red-500">
            71%
          </h3>
        </div>

      </div>

    </div>
  );
}