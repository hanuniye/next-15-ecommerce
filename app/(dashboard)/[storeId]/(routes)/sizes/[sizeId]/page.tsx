import prisma from "@/lib/prismdb";
import SizesForms from "./components/SizesClientForms";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string, storeId: string };
}) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  // const billboards = await prisma.billboard.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizesForms initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
