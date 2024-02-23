import React, { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";

interface ItemGalleryProps {
  image: string;
  title: string;
  nasa_id: string;
  description: string;
}

const ItemGallery: React.FC<ItemGalleryProps> = ({
  image,
  title,
  nasa_id,
  description,
}) => {
  const [postHovered, setPostHovered] = useState(true);
  const [isSavingPost, setIsSavingPost] = useState(false);

  const onSavePin = () => {
    setIsSavingPost(true);
    setIsSavingPost(false);
  };

  return (
    <div className="m-3">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && <img className="rounded-lg w-full" alt={title} src={image} />}
        {postHovered && (
          <div className="absolute top-0 right-0 p-2">
            <div
              onClick={onSavePin}
              className="absolute top-0 right-0 m-2 text-gray-400 hover:text-red-500 p-1"
            >
              {isSavingPost ? (
                <TailSpin color="#fff" height={26} width={26} />
              ) : postHovered ? (
                <IoMdHeart
                  className="text-xl"
                  style={{ width: "26px", height: "26px" }}
                />
              ) : (
                <IoMdHeartEmpty
                  className="text-xl"
                  style={{ width: "26px", height: "26px" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-1 mb-3 items-center">
        <p className="font-semibold capitalize">{title}</p>
      </div>
    </div>
  );
};

export default ItemGallery;
