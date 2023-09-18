import { Button } from "./ui/button";
import type { ReactNode } from "react";

type SignInWithGoogleButtonProps = {
  children: ReactNode;
};

const SignInWithGoogleButton = ({ children }: SignInWithGoogleButtonProps) => {
  const handleClick = () => {
    console.log("login with google");
  };

  return (
    <Button onClick={handleClick} className="w-full">
      {children}
    </Button>
  );
};

export { SignInWithGoogleButton };
