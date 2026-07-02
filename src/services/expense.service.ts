import { prisma } from "@/lib/prisma";

export async function getExpensesByUser(userId: string) {
  return prisma.expense.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function createExpenseInDB(data: {
  title: string;
  amount: number;
  category: string;
  payment: string;
  date: Date;
  notes?: string;
  userId: string;
}) {
  return prisma.expense.create({
    data,
  });
}

export async function updateExpenseInDB(
  id: string,
  userId: string,
  data: {
    title: string;
    amount: number;
    category: string;
    payment: string;
    date: Date;
    notes?: string;
  }
) {
  const expense = await prisma.expense.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return prisma.expense.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteExpenseFromDB(
  id: string,
  userId: string
) {
  const expense = await prisma.expense.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return prisma.expense.delete({
    where: {
      id,
    },
  });
}