import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <h1>AdminPage</h1>
    </div>
  );
};

export default AdminPage;
