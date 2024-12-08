import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const GET = async (
  _req: Request,
  { params }: { params: { categoryId: string } }
) => {
  try {
    if (!params.categoryId) {
      return new Response("categoryId ID is required", {
        status: 400,
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_GET_category:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { name, billboardId } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }
    
    if (!name) {
      return new Response(JSON.stringify({ message: "name is required" }), {
        status: 400,
      });
    }
    if (!billboardId) {
      return new Response(
        JSON.stringify({ message: "billboardId URL is required" }),
        {
          status: 400,
        }
      );
    }

    if (!params.storeId) {
      return new Response("Store id is required", {
        status: 400,
      });
    }

    if (!params.categoryId) {
      return new Response("category ID id is required", {
        status: 400,
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId,
      },
    });
    if (!storeByUserId) {
      return new Response(
        JSON.stringify({ message: "Store not found or UnAuthorized" }),
        {
          status: 403,
        }
      );
    }

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        billboardId,
        name,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_PATCH_category", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!params.categoryId) {
      return new Response("category ID is required", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new Response("Store ID is required", {
        status: 400,
      });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        user_id: userId,
      },
    });
    if (!storeByUserId) {
      return new Response(
        JSON.stringify({ message: "Store not found or UnAuthorized" }),
        {
          status: 403,
        }
      );
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_DELETE_category:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
