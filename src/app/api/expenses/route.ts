import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUser } from "@/lib/getUser";

// GET ALL EXPENSES
export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(expenses);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

// CREATE EXPENSE
export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const expense = await prisma.expense.create({
      data: {
        title: body.title,
        amount: body.amount,
        category: body.category,
        payment: body.payment,
        date: new Date(body.date),
        notes: body.notes,
        userId: user.id,
      },
    });

    return NextResponse.json(expense);
  } catch {
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}

