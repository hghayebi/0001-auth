"use server";

import { createUser, getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { User, VerificationToken } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationTokenByEmail } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

type RegisterResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<RegisterResponse> => {
  await new Promise((r) => setTimeout(r, 1000));

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, email, password } = validatedFields.data;

  let existingUser: User | null;
  try {
    existingUser = await getUserByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking email data!" };
  }

  if (existingUser) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(password, 12);

  let user: User | null;
  try {
    user = await createUser(name, email, hashedPassword);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error creating user!" };
  }
  if (!user) return { error: "Error creating user!" };

  // TODO: Send verification token
  let verificationToken: VerificationToken | null;
  try {
    verificationToken = await generateVerificationTokenByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error generating token!" };
  }
  if (!verificationToken) return { error: "Error generating token!" };

  // Send verification token
  try {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error sending verification email!" };
  }

  return { success: "Verification token sent successfully!" };
};
