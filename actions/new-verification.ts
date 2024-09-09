"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/db";
import { User, VerificationToken } from "@prisma/client";

type NewVerificationResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const newVerification = async (
  token: string | null,
): Promise<NewVerificationResponse> => {
  await new Promise((r) => setTimeout(r, 2000));

  if (!token) return { error: "Invalid token!" };

  let existingToken: VerificationToken | null;
  try {
    existingToken = await getVerificationTokenByToken(token);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking token!" };
  }

  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) return { error: "Token has expired!" };

  let existingUser: User | null;
  try {
    existingUser = await getUserByEmail(existingToken.email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking user data!" };
  }

  if (!existingUser || !existingUser.email) return { error: "user not found!" };

  try {
    await db.user.update({
      where: { email: existingUser.email },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error verifying user!" };
  }

  return {
    success: "Successfully verified!",
  };
};
