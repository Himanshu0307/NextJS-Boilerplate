"use server";
import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server/";
import { accounts, users } from "../schema";
import { eq } from "drizzle-orm";
export const emailSignIn = createSafeActionClient()
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    var existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser?.email!==email) {
      return { error: "User not found" };
    }
    return { success: email };
  });
