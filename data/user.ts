import db from "@/db";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};
