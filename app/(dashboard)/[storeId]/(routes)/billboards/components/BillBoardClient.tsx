"use client"

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";

const BillBoardClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex justify-between items-center">
      <Heading title="Billboards (0)" desc="Manage billboards for your store" />
      <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
        <Plus className="mr-2 w-4 h-4" />
        Add New
      </Button>
    </div>
  );
};

export default BillBoardClient;
