import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    if (!params.billboardId) {
      return new Response("Billboard ID is required", {
        status: 400,
      });
    }

    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return new Response(JSON.stringify(billboard), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_GET_billboard:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { label, imageUrl } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!label) {
      return new Response(JSON.stringify({ message: "Label is required" }), {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ message: "Image URL is required" }),
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

    if (!params.billboardId) {
      return new Response("Billbaord ID id is required", {
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

    const billboard = await prisma.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return new Response(JSON.stringify(billboard), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_PATCH_billboard", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    if (!params.billboardId) {
      return new Response("Billboard ID is required", {
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

    const billboard = await prisma.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return new Response(JSON.stringify(billboard), {
      status: 201,
    });
  } catch (error) {
    console.error("Error_DELETE_billboard:", error);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
