import { Gallery, Item } from "react-photoswipe-gallery";

import useAPOD from "../hooks/api/useAPOD";
import { formatDate } from "../utils/formatDate";

const APODBanner: React.FC = () => {
  const today = formatDate(new Date());
  const { apod } = useAPOD(today);

  if (!apod) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row rounded-lg shadow-lg overflow-hidden m-4">
        <Gallery>
          <Item
            original={apod?.hdurl}
            thumbnail={apod?.url}
            width="1024"
            height="768"
            caption={apod?.copyright}
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={apod.url}
                alt={apod.title}
                className="w-full pb-6 sm:pb-0 rounded-t-lg sm:w-5/12 sm:rounded-l-lg sm:rounded-t-none cursor-pointer"
              />
            )}
          </Item>
        </Gallery>
        <div className="p-4 flex flex-col justify-center text-left bg-black bg-opacity-30 shadow-md rounded-lg sm:rounded-none sm:rounded-r-lg sm:px-20 sm:ml-10">
          <h1 className="font-bold pb-2">{apod.title}</h1>
          <p className="font-medium leading-none">{apod.date}</p>
          <p className="font-medium pb-3">{apod?.copyright}</p>
          <p className="hidden sm:block">
            {apod.explanation.substring(0, 320)}...
          </p>
          <p className="block sm:hidden">
            {apod.explanation.substring(0, 200)}...
          </p>
        </div>
      </div>
    </>
  );
};

export default APODBanner;
