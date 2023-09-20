import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AuthOptions } from "next-auth";

import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt token: ", token);
      // console.log("jwt user: ", user);

      if (user) {
        return {
          ...token, // default value
          user: {
            username: user.username
          }
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      // console.log("session session: ", session);
      // console.log("session token: ", token);
      // console.log("session user: ", user);

      return {
        ...session, // default value
        user: {
          ...session.user, // default value
          username: token.username
        }
      };
    }
  },
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
        if (existingUser.password) {
          const passwordMatch = await compare(credentials?.password, existingUser.password);

          if (!passwordMatch) {
            return null;
          }
        }

        return {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
};
