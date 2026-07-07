"use client";

import { useIncome } from "@/hooks/useIncome";
import { useState } from "react";
import AddIncomeDialog from "@/components/income/AddIncomeDialog";

export default function IncomePage() {
  const { incomes } = useIncome();

  const [editing, setEditing] = useState<string | null>(null);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Income
      </h1>

      <AddIncomeDialog />

      <div className="space-y-4">
        {incomes.length === 0 ? (
          <p className="text-slate-400">
            No income added yet.
          </p>
        ) : (
          incomes.map((income) => (
            <div
              key={income.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              {editing === income.id ? (
                <div className="space-y-4">
                  <input
                    className="w-full rounded-lg bg-slate-800 p-3 text-white"
                    value={source}
                    onChange={(e) =>
                      setSource(e.target.value)
                    }
                  />

                  <input
                    className="w-full rounded-lg bg-slate-800 p-3 text-white"
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />

                  <input
                    className="w-full rounded-lg bg-slate-800 p-3 text-white"
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />

                  <div className="flex gap-3">
                    <button
                      className="rounded-lg bg-green-600 px-4 py-2 text-white"
                      onClick={async () => {
                        const res = await fetch(
                          `/api/income/${income.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type":
                                "application/json",
                            },
                            body: JSON.stringify({
                              source,
                              amount: Number(amount),
                              date,
                            }),
                          }
                        );

                        if (res.ok) {
                          location.reload();
                        } else {
                          alert("Update failed");
                        }
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="rounded-lg bg-slate-700 px-4 py-2 text-white"
                      onClick={() =>
                        setEditing(null)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {income.source}
                    </h3>

                    <p className="text-slate-400">
                      {new Date(
                        income.date
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <h2 className="text-3xl font-bold text-green-500">
                      ₹
                      {income.amount.toLocaleString()}
                    </h2>

                    <div className="mt-4 flex gap-2">
                      <button
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        onClick={() => {
                          setEditing(income.id);
                          setSource(income.source);
                          setAmount(
                            income.amount.toString()
                          );
                          setDate(
                            new Date(income.date)
                              .toISOString()
                              .split("T")[0]
                          );
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        onClick={async () => {
                          if (
                            !confirm(
                              "Delete this income?"
                            )
                          )
                            return;

                          const res = await fetch(
                            `/api/income/${income.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                          if (res.ok) {
                            location.reload();
                          } else {
                            alert(
                              "Failed to delete income"
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}