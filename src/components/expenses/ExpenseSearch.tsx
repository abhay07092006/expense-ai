"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useExpense } from "@/hooks/useExpense";

export default function ExpenseSearch() {
  const { search, setSearch } = useExpense();

  return (
    <div className="relative flex-1">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        size={18}
      />

      <Input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search expenses..."
        className="h-11 pl-11"
      />
    </div>
  );
}