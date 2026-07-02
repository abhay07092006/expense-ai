"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import {
  getUserByClerkId,
  createUser,
} from "@/services/user.service";

export async function ensureUserExists() {
  const { userId } = await auth();

  if (!userId) return null;

  const existing = await getUserByClerkId(userId);

  if (existing) return existing;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  return createUser(
    userId,
    clerkUser.emailAddresses[0].emailAddress
  );
}