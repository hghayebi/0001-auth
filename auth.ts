/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "./data/user";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./db";
import paths from "./paths";

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
  pages: {
    signIn: paths.login(),
  },

  events: {
    async linkAccount({ user }) {
      const existingUser = await getUserById(user.id || "");

      if (!existingUser?.emailVerified) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id || "");
      if (account?.provider !== "credentials") return true;

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },

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
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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

  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
