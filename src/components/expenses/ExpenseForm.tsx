"use client";

import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ExpenseFormData = {
  title: string;
  amount: number;
  category: string;
  payment: string;
  date: string;
  notes: string;
};

interface ExpenseFormProps {
  defaultValues?: ExpenseFormData;
  submitText?: string;
  onSubmit: (data: ExpenseFormData) => void;
}

export default function ExpenseForm({
  defaultValues,
  submitText = "Save Expense",
  onSubmit,
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<ExpenseFormData>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="Expense Title"
        {...register("title")}
      />

      <Input
        type="number"
        placeholder="Amount"
        {...register("amount", {
          valueAsNumber: true,
        })}
      />

      <Select
        onValueChange={(value) =>
          setValue("category", value)
        }
      >
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Food">🍔 Food</SelectItem>
          <SelectItem value="Shopping">🛍 Shopping</SelectItem>
          <SelectItem value="Travel">✈ Travel</SelectItem>
          <SelectItem value="Bills">💡 Bills</SelectItem>
          <SelectItem value="Entertainment">
            🎬 Entertainment
          </SelectItem>
          <SelectItem value="Health">
            🏥 Health
          </SelectItem>
          <SelectItem value="Education">
            📚 Education
          </SelectItem>
          <SelectItem value="Other">
            📦 Other
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          setValue("payment", value)
        }
      >
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="UPI">UPI</SelectItem>
          <SelectItem value="Cash">Cash</SelectItem>
          <SelectItem value="Credit Card">
            Credit Card
          </SelectItem>
          <SelectItem value="Debit Card">
            Debit Card
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        {...register("date")}
      />

      <Input
        placeholder="Notes"
        {...register("notes")}
      />

      <Button
        type="submit"
        className="h-11 w-full gap-2"
      >
        <Save size={18} />
        {submitText}
      </Button>
    </form>
  );
}