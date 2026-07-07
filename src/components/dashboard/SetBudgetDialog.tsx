"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SetBudgetDialog() {
  const [amount, setAmount] = useState("");

  async function saveBudget() {
    const res = await fetch("/api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
      }),
    });

    if (res.ok) {
     toast.success("Budget saved successfully 💰");
      window.location.reload();
    } else {
      toast.error("Failed to save budget");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Set Monthly Budget
      </h2>

      <Input
        type="number"
        placeholder="Enter Budget"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button
        onClick={saveBudget}
        className="mt-4 w-full"
      >
        Save Budget
      </Button>
    </div>
  );
}