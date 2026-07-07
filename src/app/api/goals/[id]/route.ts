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

// UPDATE GOAL
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await req.json();

  const goal = await prisma.goal.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      targetAmount: Number(body.targetAmount),
      savedAmount: Number(body.savedAmount),
      targetDate: body.targetDate
        ? new Date(body.targetDate)
        : null,
    },
  });

  return NextResponse.json(goal);
}

// DELETE GOAL
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  await prisma.goal.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}