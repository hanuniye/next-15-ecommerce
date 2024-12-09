import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const GET = async (
  _req: Request,
  { params }: { params: { sizeId: string } }
) => {
  try {
    if (!params.sizeId) {
      return new Response("sizeId ID is required", {
        status: 400,
      });
    }

    const size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return new Response(JSON.stringify(size), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_GET_size:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { name, value } = await req.json();
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
    if (!value) {
      return new Response(
        JSON.stringify({ message: "value is required" }),
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

    if (!params.sizeId) {
      return new Response("size ID id is required", {
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

    const size = await prisma.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        value,
        name,
      },
    });

    return new Response(JSON.stringify(size), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_PATCH_size", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!params.sizeId) {
      return new Response("size ID is required", {
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

    const size = await prisma.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return new Response(JSON.stringify(size), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_DELETE_size:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
