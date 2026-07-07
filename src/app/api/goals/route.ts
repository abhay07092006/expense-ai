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

// GET ALL GOALS
export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const goals = await prisma.goal.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(goals);
}

// CREATE GOAL
export async function POST(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const goal = await prisma.goal.create({
    data: {
      title: body.title,
      targetAmount: Number(body.targetAmount),
      savedAmount: Number(body.savedAmount),
      targetDate: body.targetDate
        ? new Date(body.targetDate)
        : null,
      userId: user.id,
    },
  });

  return NextResponse.json(goal);
}