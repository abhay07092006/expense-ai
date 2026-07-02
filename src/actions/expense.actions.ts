"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getExpenses() {
  const user = await getCurrentUser();

  return prisma.expense.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function createExpense(data: {
  title: string;
  amount: number;
  category: string;
  payment: string;
  date: string;
  notes?: string;
}) {
  const user = await getCurrentUser();

  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      payment: data.payment,
      date: new Date(data.date),
      notes: data.notes ?? "",
      userId: user.id,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");

  return expense;
}

export async function updateExpense(
  id: string,
  data: {
    title: string;
    amount: number;
    category: string;
    payment: string;
    date: string;
    notes?: string;
  }
) {
  const user = await getCurrentUser();

  const existing = await prisma.expense.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existing) {
    throw new Error("Expense not found");
  }

  await prisma.expense.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      payment: data.payment,
      date: new Date(data.date),
      notes: data.notes ?? "",
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
}

export async function deleteExpense(id: string) {
  const user = await getCurrentUser();

  const existing = await prisma.expense.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existing) {
    throw new Error("Expense not found");
  }

  await prisma.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");
}