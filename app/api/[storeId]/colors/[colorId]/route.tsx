import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const GET = async (
  _req: Request,
  { params }: { params: { colorId: string } }
) => {
  try {
    if (!params.colorId) {
      return new Response("colorId ID is required", {
        status: 400,
      });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return new Response(JSON.stringify(color), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_GET_color:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
      return new Response(JSON.stringify({ message: "value is required" }), {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new Response("Store id is required", {
        status: 400,
      });
    }

    if (!params.colorId) {
      return new Response("color ID id is required", {
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

    const color = await prisma.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        value,
        name,
      },
    });

    return new Response(JSON.stringify(color), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_PATCH_color", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!params.colorId) {
      return new Response("Color ID is required", {
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

    const color = await prisma.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return new Response(JSON.stringify(color), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_DELETE_color:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
