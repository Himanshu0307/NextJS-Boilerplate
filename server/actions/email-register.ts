"use server";

import { RegisterSchema } from "@/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server/";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import generateEmailVerificationToken from "@/server/actions/token-verification";
import sendVerificationCode from "@/server/actions/email";

export const emailRegister = createSafeActionClient()
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    //check if user exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    // create Password Hash
    var passwordhash = await bcrypt.hash(password, 10);
    // user exist
    if (existingUser) {
      // if user already exist but not verified
      if (!existingUser.emailVerified) {
        // get verification token
        const verificationToken = await generateEmailVerificationToken(email);
        // send verification mail
        const response = await sendVerificationCode(
          email,
          verificationToken.token
        );
        // if mail not send
        // if (!response)
        //   return { error: "Failed to send mail. Try again later." };
        // mail  send
        return { success: "Email Verification resent" };
      }
      return { error: "User already exist" };
    }
    await db.insert(users).values({ email, password: passwordhash, name });
    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationCode(email, verificationToken.token);
    return { success: "Email verification sent" };
  });
