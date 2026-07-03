"use client";

import { ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

import { Expense } from "@/types/expense";
import { ExpenseContext } from "../ExpenseContext";
import { useEffect } from "react";

const initialExpenses: Expense[] = [
  {
    id: uuid(),
    title: "Netflix",
    amount: 649,
    category: "Entertainment",
    payment: "UPI",
    date: "2026-06-20",
    notes: "",
  },
  {
    id: uuid(),
    title: "Swiggy",
    amount: 430,
    category: "Food",
    payment: "UPI",
    date: "2026-06-19",
    notes: "",
  },
];

export default function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  const deleteExpense = async (id: string) => {
  const res = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) return;

  await loadExpenses();
};

  const updateExpense = async (
  expense: Expense
) => {
  const res = await fetch(`/api/expenses/${expense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) return;

  await loadExpenses();
};
useEffect(() => {
  loadExpenses();
}, []);

async function loadExpenses() {
  const res = await fetch("/api/expenses");

  if (!res.ok) return;

  const data = await res.json();

  setExpenses(data);
}
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