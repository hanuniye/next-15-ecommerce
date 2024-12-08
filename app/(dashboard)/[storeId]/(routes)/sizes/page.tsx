import prisma from "@/lib/prismdb";
import { format } from "date-fns";

import SizesClient from "./components/Sizes-client";
import { SizesColumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedSizes: SizesColumn[] = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: format(size.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
