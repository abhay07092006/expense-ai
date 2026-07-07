"use client";

import { ReactNode, useEffect, useState } from "react";
import { GoalContext } from "../GoalContext";
import { Goal } from "@/types/goal";

export default function GoalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [goals, setGoals] = useState<Goal[]>([]);

  async function fetchGoals() {
    const res = await fetch("/api/goals");

    if (!res.ok) return;

    const data = await res.json();

    setGoals(data);
  }

  useEffect(() => {
    void fetchGoals();
  }, []);

  return (
    <GoalContext.Provider
      value={{
        goals,
        fetchGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}