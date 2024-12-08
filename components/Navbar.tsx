import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismdb";
import MainNav from "./MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      user_id: userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <div className="">
          <StoreSwitcher items={stores} />
        </div>
        <div className="">
          <MainNav className="mx-6" />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
