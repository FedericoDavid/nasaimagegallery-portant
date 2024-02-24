import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

import Spinner from "./common/Spinner";
import BackButton from "./common/IconButton";

import useImageDetailsById from "../hooks/api/useImageDetailsById";
import { formatDate } from "../utils/formatDate";

interface DetailsProps {
  nasaId: string;
}

const Details: React.FC<DetailsProps> = ({ nasaId }) => {
  const { imageDetails, isLoading, error } = useImageDetailsById(nasaId);

  const navigate = useNavigate();

  if (!imageDetails) return;

  if (isLoading || error)
    return (
      <Spinner
        message={error ? "Ups!... something went wrong" : "Loading..."}
      />
    );

  return (
    <div className="flex flex-col lg:flex-row items-start rounded-lg shadow-lg overflow-hidden m-4  ">
      <Gallery>
        <Item
          original={imageDetails?.imageUrl}
          thumbnail={imageDetails?.imageUrl}
          width="1024"
          height="768"
          caption={imageDetails?.title}
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={imageDetails?.imageUrl}
              alt={imageDetails?.title}
              className="w-full pb-6 sm:pb-0 rounded-t-lg sm:w-6/12 sm:rounded-l-lg sm:rounded-t-none cursor-pointer"
            />
          )}
        </Item>
      </Gallery>

      <div className="p-4 flex flex-col justify-center text-left bg-black bg-opacity-30 shadow-md rounded-lg sm:rounded-none sm:rounded-r-lg sm:px-10 sm:ml-10">
        <h1 className="font-bold pb-1">{imageDetails?.title}</h1>
        <p className="font-medium pb-3">
          {formatDate(new Date(imageDetails?.createdAt))}
        </p>
        <p className="">{imageDetails?.description}</p>
        <div className="flex justify-start">
          <BackButton
            onClick={() => navigate(-1)}
            icon={FaArrowLeftLong}
            text="Go back"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
