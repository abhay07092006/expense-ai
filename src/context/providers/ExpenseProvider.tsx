"use client";

import { ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

import { Expense } from "@/types/expense";
import { ExpenseContext } from "../ExpenseContext";

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
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

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

  const addExpense = (
    expense: Omit<Expense, "id">
  ) => {
    setExpenses((prev) => [
      {
        ...expense,
        id: uuid(),
      },
      ...prev,
    ]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) =>
      prev.filter((e) => e.id !== id)
    );
  };

  const updateExpense = (
    updated: Expense
  ) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === updated.id ? updated : e
      )
    );
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