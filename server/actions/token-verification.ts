"use server";

import { eq } from "drizzle-orm";
import { db } from "@/server/";
import { emailTokens, users } from "@/server/schema";

export default async function generateEmailVerificationToken(email: string) {
  const token = crypto.randomUUID();
  const tokenExpirationTime = new Date(Date.now() + 15 * 60 * 1000);
  const existingToken = await getVerificationToken(email);
  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationtoken = await db
    .insert(emailTokens)
    .values({
      email,
      expires: tokenExpirationTime,
      token,
    })
    .returning();
  return verificationtoken[0];
}

export async function getVerificationToken(email: string) {
  try {
    const existingToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.email, email),
    });
    return existingToken;
  } catch (e) {
    return null;
  }
}

export async function handlenNewTokenVerification(token: string) {
  const email = await db.query.emailTokens.findFirst({
    where: eq(emailTokens.token, token),
  });
  if (!email) return { error: "No token found" };
  //if token expired
  if (email.expires < new Date()) return { error: "Token expired" };
  const user = await db.query.users.findFirst({
    where: eq(users.email, email.email),
  });

  if (!user) return { error: "No user found" };
  // update the customer information
  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, user.email!));
  // delete entry from token
  await db.delete(emailTokens).where(eq(emailTokens.token, token));
  return { success: "Successfully  verified" };
}
