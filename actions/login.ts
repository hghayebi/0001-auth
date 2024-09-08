"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

type LoginResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<LoginResponse> => {
  await new Promise((r) => setTimeout(r, 1000));

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  let existingUser: User | null;
  try {
    existingUser = await getUserByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking email data!" };
  }

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Invalid credentials!" };

  const isPasswordsMach = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordsMach) return { error: "Invalid credentials!" };

  // TODO: Check if email verified

  // Login here
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) return { error: err.message };
    throw err;
  }

  return { success: "User created successfully!" };
};
