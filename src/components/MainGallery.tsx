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

const MainGallery: React.FC = () => {
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const { imagesList, searchTerm, isLoading, error } = useNasaImages();
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
      <div className="p-4 flex flex-col justify-center text-center bg-black bg-opacity-30 shadow-md rounded-lg mt-18 h-80 sm:rounded-none sm:rounded-r-lg sm:px-20">
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
    <div className="mt-16">
      <div
        className={`
          flex
          flex-col
          sm:flex-row
          ${showFavorites ? "justify-end" : "justify-between"} 
          mb-4
        `}
      >
        {!showFavorites && searchTerm && (
          <h2 className="font-medium text-3xl leading-none ml-3 pb-3 sm:pb-0">
            <span className="bg-black bg-opacity-50 p-1">
              {searchTerm} is today's planet
            </span>
          </h2>
        )}
        <Toggle
          textLeft="Newest"
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
