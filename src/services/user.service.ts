import { prisma } from "@/lib/prisma";

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function createUser(
  clerkId: string,
  email: string
) {
  return prisma.user.create({
    data: {
      clerkId,
      email,
    },
  });
}