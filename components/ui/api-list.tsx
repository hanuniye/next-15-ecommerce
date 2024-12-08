"use client";

import UseOrigin from "@/hooks/UseOrigin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityIdName, entityName }: ApiListProps) => {
  const params = useParams();
  const origin = UseOrigin();
  const BaseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        descreption={`${BaseUrl}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        descreption={`${BaseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        descreption={`${BaseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        descreption={`${BaseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        descreption={`${BaseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  );
};

export default ApiList;
