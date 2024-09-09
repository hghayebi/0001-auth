import db from "@/db";
import { VerificationToken } from "@prisma/client";

import { v4 as uuid } from "uuid";

export const generateVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationToken> => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 2 * 60 * 1000);

  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return verificationToken;
  } catch (err) {
    throw err;
  }
};
