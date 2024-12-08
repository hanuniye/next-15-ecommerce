import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { name } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }
    if (!name) {
      return new Response("Name is required", {
        status: 400,
      });
    }
    if (!params.storeId) {
      return new Response("Store id is required", {
        status: 400,
      });
    }

    const store = await prisma.store.update({
      where: {
        id: params.storeId,
        user_id: userId,
      },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(store), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_PATCH_store:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }
    if (!params.storeId) {
      return new Response("Store id is required", {
        status: 400,
      });
    }

    const store = await prisma.store.delete({
      where: {
        id: params.storeId,
        user_id: userId,
      },
    });

    return new Response(JSON.stringify(store), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_DELETE_store", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
