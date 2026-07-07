"use client";

import { useContext } from "react";
import { IncomeContext } from "@/context/IncomeContext";

export function useIncome() {
  return useContext(IncomeContext);
}