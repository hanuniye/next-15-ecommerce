import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
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
      return new Response(JSON.stringify({ message: "Store ID is required" }), {
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

    // Create a new category
    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
    });

  } catch (error) {
    console.error("Error POST category:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new Response(JSON.stringify({ message: "Store ID is required" }), {
        status: 400,
      });
    }

    const billboards = await prisma.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return new Response(JSON.stringify(billboards), {
      status: 201,
    });
  } catch (error) {
    console.error("Error GET billboard:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
