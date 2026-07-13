"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Expense } from "@/types/expense";
import { ExpenseContext } from "../ExpenseContext";
import { useAuth } from "@clerk/nextjs";

export default function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  // Load Expenses
  async function loadExpenses() {
  try {
    const res = await fetch("/api/expenses");

    if (!res.ok) {
      setExpenses([]);
      return;
    }

    const data = await res.json();
    setExpenses(data);
  } catch (error) {
    console.error(error);
    setExpenses([]);
  }
}

  useEffect(() => {
  if (!isLoaded || !isSignedIn) return;
  void loadExpenses();
}, [isLoaded, isSignedIn]);

  // Add Expense
  const addExpense = async (
    expense: Omit<Expense, "id">
  ) => {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    if (!res.ok) return;

    await loadExpenses();
  };

  // Update Expense
  const updateExpense = async (
    expense: Expense
  ) => {
    const res = await fetch(
      `/api/expenses/${expense.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      }
    );

    if (!res.ok) return;

    await loadExpenses();
  };

  // Delete Expense
  const deleteExpense = async (id: string) => {
    const res = await fetch(
      `/api/expenses/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) return;

    await loadExpenses();
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,

        selectedExpense,
        setSelectedExpense,

        dialogOpen,
        setDialogOpen,

        search,
        setSearch,

        categoryFilter,
        setCategoryFilter,

        paymentFilter,
        setPaymentFilter,

        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}