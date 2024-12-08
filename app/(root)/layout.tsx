import prisma from "@/lib/prismdb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      user_id: userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <div>{children}</div>;
};

export default RootLayout;

