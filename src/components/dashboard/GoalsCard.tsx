"use client";

import { Target } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";

export default function GoalsCard() {
  const { goals } = useGoals();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <Target className="text-blue-500" />

        <h2 className="text-xl font-semibold text-white">
          Savings Goals
        </h2>
      </div>

      {goals.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-700">
          <div className="text-center">
            <Target
              className="mx-auto mb-3 text-slate-500"
              size={40}
            />

            <p className="text-lg font-medium text-white">
              No Goals Yet
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Create your first savings goal.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = Math.min(
              100,
              Math.round(
                (goal.savedAmount /
                  goal.targetAmount) *
                  100
              )
            );

            return (
              <div key={goal.id}>
                <div className="mb-2 flex justify-between">
                  <p className="text-white">
                    {goal.title}
                  </p>

                  <p className="text-slate-400">
                    ₹{goal.savedAmount.toLocaleString()} / ₹
                    {goal.targetAmount.toLocaleString()}
                  </p>
                </div>

                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-right text-xs text-slate-400">
                  {progress}% Complete
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}