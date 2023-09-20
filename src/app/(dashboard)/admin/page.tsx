import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(options);

  if (session?.user) {
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Welcome back - {session?.user.username}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Please login to view the admin page</p>
      </div>
    );
  }
};

export default AdminPage;
