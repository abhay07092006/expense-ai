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

  await prisma.income.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}

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

  const body = await req.json();
  const { id } = await params;

  const income = await prisma.income.update({
    where: { id },
    data: {
      source: body.source,
      amount: body.amount,
      date: new Date(body.date),
      notes: body.notes ?? "",
    },
  });

  return NextResponse.json(income);
}