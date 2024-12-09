import prisma from "@/lib/prismdb";
import ColorForms from "./components/ColorForms";

const ColorPage = async ({
  params,
}: {
  params: { colorId: string, storeId: string };
}) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

//   const billboards = await prisma.billboard.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//   });

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorForms initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
