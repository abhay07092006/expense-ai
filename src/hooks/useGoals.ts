"use client";

import { useContext } from "react";
import { GoalContext } from "@/context/GoalContext";

export function useGoals() {
  return useContext(GoalContext);
}