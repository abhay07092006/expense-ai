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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const expense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        amount: body.amount,
        category: body.category,
        payment: body.payment,
        date: new Date(body.date),
        notes: body.notes,
      },
    });

    return NextResponse.json(expense);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}