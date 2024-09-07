"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

type RegisterResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<RegisterResponse> => {
  return { success: "User created successfully!" };
};
