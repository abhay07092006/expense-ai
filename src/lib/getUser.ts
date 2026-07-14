import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getUser() {
  const { userId } = await auth();

  if (!userId) {
    console.log("No Clerk user");
    return null;
  }

  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (user) {
    console.log("Existing user:", user.email);
    return user;
  }

  console.log("Creating new user...");

  const clerkUser = await currentUser();

  if (!clerkUser) {
    console.log("currentUser() returned null");
    return null;
  }

  user = await prisma.user.upsert({
    where: {
      clerkId: userId,
    },
    update: {},
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });

  console.log("User created:", user.email);

  return user;
}