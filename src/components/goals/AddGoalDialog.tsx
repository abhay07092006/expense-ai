"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useGoals } from "@/hooks/useGoals";

export default function AddGoalDialog() {
  const { fetchGoals } = useGoals();

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        targetAmount: Number(targetAmount),
        savedAmount: 0,
        targetDate,
      }),
    });

    if (res.ok) {
      toast.success("Goal created");

      setTitle("");
      setTargetAmount("");
      setTargetDate("");

      await fetchGoals();
    } else {
      toast.error("Failed to create goal");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="mb-5 text-xl font-bold text-white">
        Create Goal
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Goal Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <input
          type="number"
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(e.target.value)
          }
          required
        />

        <input
          type="date"
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          value={targetDate}
          onChange={(e) =>
            setTargetDate(e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Create Goal
      </button>
    </form>
  );
}