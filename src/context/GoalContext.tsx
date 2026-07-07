"use client";

import { createContext } from "react";
import { Goal } from "@/types/goal";

interface GoalContextType {
  goals: Goal[];
  fetchGoals: () => Promise<void>;
}

export const GoalContext =
  createContext<GoalContextType>({
    goals: [],
    fetchGoals: async () => {},
  });