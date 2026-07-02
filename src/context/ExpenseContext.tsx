import { createContext } from "react";
import { Expense } from "@/types/expense";

export interface ExpenseContextType {
  expenses: Expense[];

  selectedExpense: Expense | null;
  setSelectedExpense: (expense: Expense | null) => void;

  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;

  search: string;
  setSearch: (value: string) => void;

  categoryFilter: string;
  setCategoryFilter: (value: string) => void;

  paymentFilter: string;
  setPaymentFilter: (value: string) => void;

  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
updateExpense: (expense: Expense) => Promise<void>;
deleteExpense: (id: string) => Promise<void>;
}

export const ExpenseContext =
  createContext<ExpenseContextType | null>(null);