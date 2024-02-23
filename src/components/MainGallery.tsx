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
