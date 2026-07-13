"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";

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
  const { isLoaded, isSignedIn } = useAuth();

  const [incomes, setIncomes] = useState<Income[]>([]);

  async function fetchIncome() {
    try {
      const res = await fetch("/api/income");

      if (res.status === 401) {
        setIncomes([]);
        return;
      }

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
    if (!isLoaded) return;

    if (!isSignedIn) {
      setIncomes([]);
      return;
    }

    void fetchIncome();
  }, [isLoaded, isSignedIn]);

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