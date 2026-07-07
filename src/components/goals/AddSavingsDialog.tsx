"use client";

import { useState } from "react";
import { Goal } from "@/types/goal";
import { useGoals } from "@/hooks/useGoals";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  goal: Goal;
}

export default function AddSavingsDialog({
  goal,
}: Props) {
  const { fetchGoals } = useGoals();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  async function addSavings() {
    if (goal.savedAmount >= goal.targetAmount) {
      toast.info("Goal already completed");
      return;
    }

    const value = Number(amount);

    if (!value || value <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    const res = await fetch(`/api/goals/${goal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: goal.title,
        targetAmount: goal.targetAmount,
        savedAmount: Math.min(
          goal.savedAmount + value,
          goal.targetAmount
        ),
        targetDate: goal.targetDate,
      }),
    });

    if (res.ok) {
      toast.success("Savings added");

      setAmount("");
      setOpen(false);

      await fetchGoals();
    } else {
      toast.error("Failed to add savings");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button
          disabled={
            goal.savedAmount >= goal.targetAmount
          }
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {goal.savedAmount >= goal.targetAmount
            ? "Completed"
            : "+ Add Savings"}
        </button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle>
            Add Savings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded-lg bg-slate-800 p-3 outline-none"
          />

          <button
            onClick={addSavings}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}