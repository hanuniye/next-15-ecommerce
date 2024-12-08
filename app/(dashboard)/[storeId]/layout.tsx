import Navbar from "@/components/Navbar";
import prisma from "@/lib/prismdb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { storeId } = params;
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      user_id: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
