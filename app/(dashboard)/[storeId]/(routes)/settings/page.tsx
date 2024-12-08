import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismdb";
import SettingForms from "./components/SettingForms";

interface SettingsProps {
  params: { storeId: string };
}

const Settings = async ({ params }: SettingsProps) => {
  const { userId } = auth();
  const { storeId } = params;

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
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SettingForms store={store} />
      </div>
    </div>
  );
};

export default Settings;
