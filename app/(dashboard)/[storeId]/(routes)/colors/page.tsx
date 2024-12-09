import prisma from "@/lib/prismdb";
import { format } from "date-fns";

import { ColorsColumn } from "./components/columns";
import ColorsClient from "./components/Colors-Client";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedcolors: ColorsColumn[] = colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: format(color.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorsClient data={formattedcolors} />
      </div>
    </div>
  );
};

export default ColorsPage;
