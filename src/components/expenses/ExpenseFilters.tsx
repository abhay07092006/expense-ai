"use client";

import { useExpense } from "@/hooks/useExpense";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExpenseFilters() {
  const {
    categoryFilter,
    setCategoryFilter,
    paymentFilter,
    setPaymentFilter,
  } = useExpense();

  return (
    <div className="flex gap-4">

      <Select
        value={categoryFilter}
        onValueChange={setCategoryFilter}
      >
        <SelectTrigger className="h-11 w-48 border-slate-700 bg-slate-900 text-white">
  <SelectValue placeholder="All Categories" />
</SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Travel">Travel</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Education">Education</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={paymentFilter}
        onValueChange={setPaymentFilter}
      >
        <SelectTrigger className="h-11 w-48 border-slate-700 bg-slate-900 text-white">
  <SelectValue placeholder="All Payments" />
</SelectTrigger>

        <SelectContent>
          <SelectItem value="All">All Payments</SelectItem>
          <SelectItem value="UPI">UPI</SelectItem>
          <SelectItem value="Cash">Cash</SelectItem>
          <SelectItem value="Credit Card">Credit Card</SelectItem>
          <SelectItem value="Debit Card">Debit Card</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}