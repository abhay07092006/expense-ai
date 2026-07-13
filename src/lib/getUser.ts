import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUser() {
  const { userId } = await auth();

  if (!userId) return null;

  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (user) return user;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0].emailAddress;

  try {
    return await prisma.user.create({
      data: {
        clerkId: userId,
        email,
      },
    });
  } catch {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}