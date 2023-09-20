import Link from "next/link";
import { HandMetal } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { SignOutButton } from "./SignOutButton";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>

        {session?.user ? (
          <SignOutButton />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export { Navbar };
