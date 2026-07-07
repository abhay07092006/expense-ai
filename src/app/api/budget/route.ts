import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getUser() {
  const { userId } = await auth();

  if (!userId) return null;

  return prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
}

// GET Current Month Budget
export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();

    const budget = await prisma.budget.findUnique({
      where: {
        userId_month_year: {
          userId: user.id,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
      },
    });

    return NextResponse.json(budget);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}

// Create or Update Current Month Budget
export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { amount } = await req.json();

    const now = new Date();

    const budget = await prisma.budget.upsert({
      where: {
        userId_month_year: {
          userId: user.id,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
      },
      update: {
        amount,
      },
      create: {
        amount,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        userId: user.id,
      },
    });

    return NextResponse.json(budget);
  } catch {
    return NextResponse.json(
      { error: "Failed to save budget" },
      { status: 500 }
    );
  }
}