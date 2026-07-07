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

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json([], { status: 401 });
  }

  const income = await prisma.income.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(income);
}

export async function POST(req: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const income = await prisma.income.create({
    data: {
  source: body.source,
  amount: body.amount,
  date: new Date(body.date),
  notes: body.notes ?? "",
  userId: user.id,
},
  });

  return NextResponse.json(income);
}