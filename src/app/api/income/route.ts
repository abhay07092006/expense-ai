import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";


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