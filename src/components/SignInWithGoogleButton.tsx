import { Button } from "./ui/button";
import type { ReactNode } from "react";
import { signIn } from "next-auth/react";

type SignInWithGoogleButtonProps = {
  children: ReactNode;
};

const SignInWithGoogleButton = ({ children }: SignInWithGoogleButtonProps) => {
  const handleClick = () => {
    signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <Button onClick={handleClick} className="w-full">
      {children}
    </Button>
  );
};

export { SignInWithGoogleButton };
