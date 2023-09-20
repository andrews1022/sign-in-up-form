import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | undefined | null;
  }

  interface Session {
    user: User & {
      username: string | undefined | null;
    };
    token: {
      username: string | undefined | null;
    };
  }
}
