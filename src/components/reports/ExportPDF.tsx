"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useExpense } from "@/hooks/useExpense";

export default function ExportPDF() {
  const { expenses } = useExpense();

  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ExpenseAI Report", 14, 20);

    autoTable(doc, {
      head: [["Title", "Category", "Payment", "Amount", "Date"]],
      body: expenses.map((e) => [
        e.title,
        e.category,
        e.payment,
        `₹${e.amount}`,
        new Date(e.date).toLocaleDateString(),
      ]),
      startY: 30,
    });

    doc.save("ExpenseAI_Report.pdf");
    toast.success("PDF downloaded successfully 📄");
  }

  return (
    <Button onClick={downloadPDF}>
     📄 Export PDF Report
    </Button>
  );
}