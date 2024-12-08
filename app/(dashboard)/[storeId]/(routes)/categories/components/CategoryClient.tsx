"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { CategoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CategoryClientData {
  data: CategoryColumn[];
}

const CategoryClient = ({ data }: CategoryClientData) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Categories (${data.length})`}
          desc="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading desc="API calls for categories." title="API" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
