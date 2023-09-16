import Link from "next/link";
import { HandMetal } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <ul className="container flex items-center justify-between">
        <li>
          <Link href="/">
            <HandMetal />
          </Link>
        </li>

        <li>
          <Link href="/sign-in">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
