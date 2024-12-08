import prisma from "@/lib/prismdb";
import { format } from "date-fns";

import BillBoardClient from "./components/BillBoardClient";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
