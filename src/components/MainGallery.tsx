import { useState } from "react";
import Masonry from "react-masonry-css";

import Toggle from "./common/Toggle";
import Spinner from "./common/Spinner";
import ItemGallery from "./ItemGallery";

import useNasaImages from "../hooks/api/useNasaImages";
import { useFavorites } from "../context/FavoritesContext";

const breakpointColumns = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MainGallery = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { imagesList, isLoading, error } = useNasaImages();
  const {
    state: { favorites: favoritesList },
  } = useFavorites();

  const handleToggleChange = () => setShowFavorites(!showFavorites);

  const displayedImages = showFavorites ? favoritesList : imagesList;

  if (isLoading || error)
    return (
      <Spinner
        message={error ? "Ups!... something went wrong" : "Loading..."}
      />
    );

  if ((showFavorites && !favoritesList.length) || !imagesList.length)
    return (
      <div className="p-4 flex flex-col justify-center text-center bg-black bg-opacity-30 shadow-md rounded-lg mt-24 h-80 sm:rounded-none sm:rounded-r-lg sm:px-20">
        <div className="flex justify-end mb-4">
          <Toggle
            textLeft="All"
            textRight="Favorites"
            isFavorite={showFavorites}
            onHandleChange={handleToggleChange}
          />
        </div>
        <p className="font-medium text-lg pb-3">
          {!favoritesList.length
            ? "You still don’t have favorites... select the best ones on the main page"
            : "No results found"}
        </p>
      </div>
    );

  return (
    <div className="mt-24">
      <div className="flex justify-end mb-4">
        <Toggle
          textLeft="All"
          textRight="Favorites"
          isFavorite={showFavorites}
          onHandleChange={handleToggleChange}
        />
      </div>
      <Masonry
        className="flex animate-slide-fwd"
        key={showFavorites ? "favorites-list" : "all-list"}
        breakpointCols={breakpointColumns}
      >
        {displayedImages.map((item) => (
          <ItemGallery
            key={item.nasa_id}
            imageUrl={item.imageUrl}
            title={item.title}
            nasa_id={item.nasa_id}
            description={item.description}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default MainGallery;
