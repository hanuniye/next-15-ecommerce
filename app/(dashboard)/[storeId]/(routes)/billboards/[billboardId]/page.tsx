import prisma from "@/lib/prismdb";
import BillboardForms from "./components/BillboardForms";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardForms initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
