import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useFavorites } from "../context/FavoritesContext";

interface ItemGalleryProps {
  imageUrl: string;
  title: string;
  nasa_id: string;
  description: string;
}

const ItemGallery: React.FC<ItemGalleryProps> = ({
  imageUrl,
  title,
  nasa_id,
  description,
}) => {
  const [postHovered, setPostHovered] = useState(false);

  const {
    state: { favorites },
    dispatch,
  } = useFavorites();

  const navigate = useNavigate();

  const isFavorite = favorites.some((item) => item.nasa_id === nasa_id);

  const handleImageClick = () => navigate(`/details/${nasa_id}`);

  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { nasa_id } });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: { imageUrl, title, nasa_id, description },
      });
    }
  };

  return (
    <div className="m-3" onClick={handleImageClick}>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {imageUrl && (
          <img className="rounded-lg w-full" alt={title} src={imageUrl} />
        )}
        {(isFavorite || postHovered) && (
          <div className="absolute top-0 right-0 p-2">
            <div
              onClick={toggleFavorite}
              className="absolute top-0 right-0 m-2 p-1"
            >
              {isFavorite ? (
                <IoMdHeart
                  className="text-xl text-red-500"
                  style={{ width: "26px", height: "26px" }}
                />
              ) : (
                <IoMdHeartEmpty
                  className="text-xl text-gray-400 hover:text-red-500"
                  style={{ width: "26px", height: "26px" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-1 mb-3 items-center">
        <p className="font-semibold capitalize">
          <span className="bg-white bg-opacity-15 p-0.5 ">{title}</span>
        </p>
      </div>
    </div>
  );
};

export default ItemGallery;
