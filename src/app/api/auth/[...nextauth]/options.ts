import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
};
