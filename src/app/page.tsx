import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "@/components/ui/button";
import { options } from "./api/auth/[...nextauth]/options";

const HomePage = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <h1 className="text-4xl">Home</h1>

      {session ? (
        <Link className={buttonVariants()} href="/admin">
          Go to Admin
        </Link>
      ) : null}
    </div>
  );
};

export default HomePage;
