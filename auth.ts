import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export type ExtendedUser = Omit<User, "password"> & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (token && user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (session && token.user) {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        let existingUser: User | null;
        try {
          existingUser = await getUserByEmail(email);
        } catch (err) {
          return null;
        }

        if (!existingUser || !existingUser.email || !existingUser.password)
          return null;

        const isPasswordsMach = await bcrypt.compare(
          password,
          existingUser.password,
        );

        if (!isPasswordsMach) return null;

        const { password: pass, ...userWithoutPass } = existingUser;

        return userWithoutPass;

        // TODO: Check if email verified in signIn
      },
    }),
  ],
});
