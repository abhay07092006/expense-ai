"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Income {
  id: string;
  title: string;
  source: string;
  amount: number;
  date: string;
}

interface IncomeContextType {
  incomes: Income[];
  fetchIncome: () => Promise<void>;
}

export const IncomeContext =
  createContext<IncomeContextType>({
    incomes: [],
    fetchIncome: async () => {},
  });

export default function IncomeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [incomes, setIncomes] = useState<
    Income[]
  >([]);

  async function fetchIncome() {
    try {
      const res = await fetch("/api/income");

      if (!res.ok) {
        console.error(
          "Failed to fetch income:",
          res.status
        );
        setIncomes([]);
        return;
      }

      const data = await res.json();

      setIncomes(data);
    } catch (error) {
      console.error(
        "Error fetching income:",
        error
      );
      setIncomes([]);
    }
  }

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        fetchIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}