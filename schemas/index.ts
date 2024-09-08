import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must have at least 3 characters!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(1, { message: "Password must have at least 3 character!" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password must have at least 3 character!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be equal!",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password can't be empty!" }),
});
