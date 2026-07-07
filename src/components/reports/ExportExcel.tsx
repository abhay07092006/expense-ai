"use client";

import { utils, writeFile } from "xlsx";
import { Button } from "@/components/ui/button";
import { useExpense } from "@/hooks/useExpense";
import { toast } from "sonner";

export default function ExportExcel() {
  const { expenses } = useExpense();

  function downloadExcel() {
    const data = expenses.map((e) => ({
      Title: e.title,
      Category: e.category,
      Payment: e.payment,
      Amount: e.amount,
      Date: new Date(e.date).toLocaleDateString(),
      Notes: e.notes,
    }));

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();

    utils.book_append_sheet(
      workbook,
      worksheet,
      "Expenses"
    );

    writeFile(workbook, "ExpenseAI_Report.xlsx");
    toast.success("Excel downloaded successfully 📊");
  }

  return (
    <Button onClick={downloadExcel}>
      📊 Export Excel Report
    </Button>
  );
}