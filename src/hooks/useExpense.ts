"use client";

import { useContext } from "react";
import {
  ExpenseContext,
} from "@/context/ExpenseContext";

export function useExpense() {
  const context =
    useContext(ExpenseContext);

  if (!context)
    throw new Error(
      "Expense Provider Missing"
    );

  return context;
}