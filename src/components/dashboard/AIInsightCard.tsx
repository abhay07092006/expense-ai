"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useExpense } from "@/hooks/useExpense";
import { useIncome } from "@/hooks/useIncome";
import { useGoals } from "@/hooks/useGoals";

export default function AIInsightCard() {
  const { expenses } = useExpense();
  const { incomes } = useIncome();
  const { goals } = useGoals();

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(
    "Click Analyze to receive a complete AI financial report."
  );

  async function analyze() {
    try {
      setLoading(true);

      const totalBudget = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenses,
          incomes,
          goals,
          budget: {
            monthlyBudget: totalBudget,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "AI analysis failed."
        );
      }

      if (data.response) {
        setResponse(data.response);
        toast.success(
          "AI analysis completed ✨"
        );
      } else {
        setResponse("AI analysis failed.");
        toast.error("AI analysis failed.");
      }
    } catch (error) {
      console.error(error);

      setResponse(
        "Unable to analyze your financial data. Please try again."
      );

      toast.error("AI analysis failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-4 text-xl font-semibold text-white">
        🤖 AI Financial Advisor
      </h2>

      <div className="min-h-[260px] whitespace-pre-wrap rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 text-slate-300">
        {loading
          ? "Analyzing your complete financial profile..."
          : response}
      </div>

      <Button
        className="mt-4 w-full"
        onClick={analyze}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Analyzing...
          </div>
        ) : (
          "✨ Analyze My Finances"
        )}
      </Button>

    </div>
  );
}