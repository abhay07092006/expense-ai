"use client";

import { useExpense } from "@/hooks/useExpense";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Pencil,
  Trash2,
  CreditCard,
  Wallet,
} from "lucide-react";

export default function ExpenseTable() {
  const {
  expenses,
  search,
  categoryFilter,
  paymentFilter,
  deleteExpense,
  setSelectedExpense,
  setDialogOpen,
} = useExpense();
const filteredExpenses = expenses.filter((expense) => {
  const matchesSearch =
    expense.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    expense.category
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    expense.category === categoryFilter;

  const matchesPayment =
    paymentFilter === "All" ||
    expense.payment === paymentFilter;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesPayment
  );
});
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">
          Recent Expenses
        </h2>

        <Badge variant="secondary">
          {expenses.length} Records
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-slate-800">
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">
              Amount
            </TableHead>
            <TableHead className="text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {filteredExpenses.map((expense) => (

            <TableRow
              key={expense.id}
              className="border-slate-800 hover:bg-slate-800/40"
            >

              <TableCell className="font-medium text-white">
                {expense.title}
              </TableCell>

              <TableCell>
                <Badge>
                  {expense.category}
                </Badge>
              </TableCell>

              <TableCell>

                <div className="flex items-center gap-2">

                  {expense.payment === "Cash" ? (
                    <Wallet size={16} />
                  ) : (
                    <CreditCard size={16} />
                  )}

                  {expense.payment}

                </div>

              </TableCell>

              <TableCell>
                {expense.date}
              </TableCell>

              <TableCell className="text-right font-semibold text-red-500">
                ₹{expense.amount}
              </TableCell>

              <TableCell>

                <div className="flex justify-center gap-2">

                 <Button
  size="icon"
  variant="outline"
  onClick={() => {
    setSelectedExpense(expense);
    setDialogOpen(true);
  }}
>
  <Pencil size={16} />
</Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                  >
                    <Trash2 size={16} />
                  </Button>

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>
      </Table>
    </div>
  );
}