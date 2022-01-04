export default function LoaderHq() {
  const array = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];
  return (
    <div className="flex flex-wrap items-center lg:justify-between justify-center">
      {array.map((item) => (
        <div className="animate-pulse bg-gray-300 cursor-pointer transform  hover:scale-105 transition duration-300 mx-2 w-72 lg:mb-5 mb-8 shadow-md">
          <div>
            <img className="w-full h-96 object-cover" />
          </div>
          <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-4">
              <p className=" px-2 bg-gray-400 w-2 h-4 py-1"></p>
              <div className="animate-pulse bg-gray-400 py-1.5 w-24 h-6 px-6 rounded-full">
                <p className="animate-pulse bg-gray-400"></p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="bg-gray-400 w-1/2 h-6 rounded-full"></h2>
              </div>
              <p className=" mt-2 truncate w-full h-2 rounded-full bg-gray-400"></p>
              <div className="flex mt-4">
                <div>
                  <p className=" px-2 bg-gray-400 rounded-full w-24 h-6 py-1"></p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <h2 className="bg-gray-400 rounded-full w-1/2 h-4"></h2>

                <h3 className="bg-gray-400 rounded-full	w-10 h-6"></h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
