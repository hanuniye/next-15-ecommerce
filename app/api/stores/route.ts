import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prismdb";

export const POST = async (req: Request) => {
  try {
    const { name } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthenticated" }), {
        status: 401,
      });
    }
    if (!name) {
      return new Response(JSON.stringify({ message: "Name is required" }), {
        status: 400,
      });
    }

    // Create a new store with the provided name
    const store = await prisma.store.create({
      data: {
        name,
        user_id: userId,
      },
    });
    return new Response(JSON.stringify(store), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating store:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
