import { SearchIcon } from "./icon";

const EmptyData = ({ dataName }: { dataName: string }) => {
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center w-full mt-6 text-center h-96">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          <div className="p-3 mx-auto text-white bg-[#40dbd081] rounded-full">
            <SearchIcon />
          </div>
          <h1 className="mt-3 text-lg text-gray-800">No {dataName} found.</h1>
          <p className="mt-2 text-gray-500">
            There is no data yet. Please add more {dataName}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmptyData;
