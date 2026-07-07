"use client";

import { useState } from "react";
import { useGoals } from "@/hooks/useGoals";
import AddGoalDialog from "@/components/goals/AddGoalDialog";
import { Target, Pencil, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import AddSavingsDialog from "@/components/goals/AddSavingsDialog";

export default function GoalsPage() {
  const { goals, fetchGoals } = useGoals();

  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  async function deleteGoal(id: string) {
    if (!confirm("Delete this goal?")) return;

    const res = await fetch(`/api/goals/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Goal deleted");
      await fetchGoals();
    } else {
      toast.error("Failed to delete goal");
    }
  }

  async function updateGoal(id: string) {
    const res = await fetch(`/api/goals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        targetAmount: Number(targetAmount),
        savedAmount: Number(savedAmount),
        targetDate,
      }),
    });

    if (res.ok) {
      toast.success("Goal updated");
      setEditing(null);
      await fetchGoals();
    } else {
      toast.error("Failed to update goal");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Savings Goals
      </h1>

      <AddGoalDialog />

      {goals.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
          <Target
            className="mx-auto mb-4 text-slate-500"
            size={50}
          />

          <h2 className="text-2xl font-semibold text-white">
            No Goals Yet
          </h2>

          <p className="mt-2 text-slate-400">
            Create your first savings goal.
          </p>
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

            const isEditing = editing === goal.id;

            return (
              <div
                key={goal.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      className="w-full rounded-lg bg-slate-800 p-3 text-white"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                    />

                    <input
                      className="w-full rounded-lg bg-slate-800 p-3 text-white"
                      type="number"
                      value={targetAmount}
                      onChange={(e) =>
                        setTargetAmount(e.target.value)
                      }
                    />

                    <input
                      className="w-full rounded-lg bg-slate-800 p-3 text-white"
                      type="number"
                      value={savedAmount}
                      onChange={(e) =>
                        setSavedAmount(e.target.value)
                      }
                    />

                    <input
                      className="w-full rounded-lg bg-slate-800 p-3 text-white"
                      type="date"
                      value={targetDate}
                      onChange={(e) =>
                        setTargetDate(e.target.value)
                      }
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          updateGoal(goal.id)
                        }
                        className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditing(null)
                        }
                        className="rounded-lg bg-slate-700 px-5 py-2 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Target className="text-blue-500" />

                        <div>
                          <h2 className="text-xl font-semibold text-white">
                            {goal.title}
                          </h2>

                          <p className="text-slate-400">
                            ₹{goal.savedAmount.toLocaleString()} /
                            ₹{goal.targetAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditing(goal.id);
                            setTitle(goal.title);
                            setTargetAmount(
                              goal.targetAmount.toString()
                            );
                            setSavedAmount(
                              goal.savedAmount.toString()
                            );
                            setTargetDate(
                              goal.targetDate
                                ? new Date(goal.targetDate)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            );
                          }}
                          className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
                        >
                          <Pencil
                            className="text-white"
                            size={18}
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteGoal(goal.id)
                          }
                          className="rounded-lg bg-red-600 p-2 hover:bg-red-700"
                        >
                          <Trash2
                            className="text-white"
                            size={18}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="h-3 rounded-full bg-slate-800">
                      <div
                        className="h-3 rounded-full bg-blue-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                        <AddSavingsDialog goal={goal} />
                      <span className="text-slate-400">
                        {progress}% Completed
                      </span>

                      {progress === 100 && (
                        <span className="flex items-center gap-1 text-green-500">
                          <Check size={16} />
                          Goal Achieved
                        </span>
                      )}

                      {goal.targetDate && progress < 100 && (
                        <span className="text-slate-400">
                          Target:{" "}
                          {new Date(
                            goal.targetDate
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}