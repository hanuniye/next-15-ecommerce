import prisma from "@/lib/prismdb";
import { format } from "date-fns";

import CategoryClient from "./components/CategoryClient";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: CategoryColumn[] = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      billBoardLabel: category.billboard.label,
      createdAt: format(category.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
