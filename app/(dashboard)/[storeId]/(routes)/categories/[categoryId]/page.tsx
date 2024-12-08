import prisma from "@/lib/prismdb";
import CategoryForms from "./components/CategoryForms";

const BillboardPage = async ({
  params,
}: {
  params: { categoryId: string, storeId: string };
}) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryForms initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
