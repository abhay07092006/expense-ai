import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUser() {
  const { userId } = await auth();

  if (!userId) return null;

  // First check Clerk ID
  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (user) return user;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0].emailAddress;

  // Check if email already exists
  user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // Link existing account with Clerk ID
  if (user) {
    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        clerkId: userId,
      },
    });
  }

  // Create new user
  return await prisma.user.create({
    data: {
      clerkId: userId,
      email,
    },
  });
}