"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useIncome } from "@/hooks/useIncome";

export default function AddIncomeDialog() {
  const { fetchIncome } = useIncome();

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source,
        amount: Number(amount),
        date,
      }),
    });

    if (res.ok) {
      toast.success("Income added successfully");

      setSource("");
      setAmount("");
      setDate("");

      // Refresh income context
      await fetchIncome();
    } else {
      toast.error("Failed to add income");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="mb-4 text-xl font-bold text-white">
        Add Income
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Source (e.g. Salary, Freelancing)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />

        <input
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          className="rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        Add Income
      </button>
    </form>
  );
}