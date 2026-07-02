"use client";

import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ExpenseForm, {
  ExpenseFormData,
} from "./ExpenseForm";

import { useExpense } from "@/hooks/useExpense";

export default function AddExpenseDialog() {
  const {
    addExpense,
    updateExpense,

    dialogOpen,
    setDialogOpen,

    selectedExpense,
    setSelectedExpense,
  } = useExpense();

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedExpense(null);
    }
  }, [dialogOpen, setSelectedExpense]);

  const handleSubmit = (data: ExpenseFormData) => {
    if (selectedExpense) {
      updateExpense({
        ...selectedExpense,
        ...data,
        amount: Number(data.amount),
      });
    } else {
      addExpense({
        ...data,
        amount: Number(data.amount),
      });
    }

    setDialogOpen(false);
    setSelectedExpense(null);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} />
          Add Expense
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl border-slate-800 bg-slate-950">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {selectedExpense
              ? "Edit Expense"
              : "Add Expense"}
          </DialogTitle>
        </DialogHeader>

        <ExpenseForm
          defaultValues={
            selectedExpense
              ? {
                  title: selectedExpense.title,
                  amount: selectedExpense.amount,
                  category: selectedExpense.category,
                  payment: selectedExpense.payment,
                  date: selectedExpense.date,
                  notes: selectedExpense.notes,
                }
              : undefined
          }
          submitText={
            selectedExpense
              ? "Update Expense"
              : "Save Expense"
          }
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}