"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })} variant="destructive">
      Sign Out
    </Button>
  );
};

export { SignOutButton };
