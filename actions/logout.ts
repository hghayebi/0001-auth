"use server";

import { signOut } from "@/auth";
import paths from "@/paths";

export const logout = async () => {
  await signOut({ redirectTo: paths.login() });
};
