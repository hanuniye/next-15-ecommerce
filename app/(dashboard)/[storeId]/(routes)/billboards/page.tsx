import BillBoardClient from "./components/BillBoardClient";

const BillboardsPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillBoardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
