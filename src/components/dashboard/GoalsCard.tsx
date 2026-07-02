import { Target } from "lucide-react";

const goals = [
  {
    title: "Emergency Fund",
    saved: "₹40,000",
    target: "₹1,00,000",
    progress: 40,
  },
  {
    title: "New Laptop",
    saved: "₹55,000",
    target: "₹80,000",
    progress: 69,
  },
];

export default function GoalsCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Target className="text-blue-500" />
        <h2 className="text-xl font-semibold text-white">
          Savings Goals
        </h2>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.title}>
            <div className="mb-2 flex justify-between">
              <p className="text-white">{goal.title}</p>
              <p className="text-slate-400">
                {goal.saved} / {goal.target}
              </p>
            </div>

            <div className="h-2 rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}