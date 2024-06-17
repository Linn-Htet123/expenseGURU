const EmptyData = ({ dataName }: { dataName: string }) => {
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center w-full mt-6 text-center border rounded-lg h-96">
        <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
          <div className="p-3 mx-auto text-white bg-[#40dbd081] rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
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
