import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AuthOptions } from "next-auth";

import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // check if the email or password is empty
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // check if email exists in db
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        });

        if (!existingUser) {
          return null;
        }

        // check if the password doesn't match
        // remember we use bcrypt to encrypt the password
        const passwordMatch = await compare(credentials?.password, existingUser.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`, // string expected, but id is a number
          username: existingUser.username,
          email: existingUser.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
};
