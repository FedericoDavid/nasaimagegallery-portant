import { useState, useEffect } from "react";

interface FavoriteItem {
  image: string;
  title: string;
  nasa_id: string;
  description: string;
}

const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const loadedFavorites = localStorage.getItem("favorites");

    if (loadedFavorites) {
      setFavorites(JSON.parse(loadedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    if (!favorites.some((favorite) => favorite.nasa_id === item.nasa_id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (nasa_id: string) => {
    setFavorites(favorites.filter((favorite) => favorite.nasa_id !== nasa_id));
  };

  const isFavorite = (nasa_id: string) => {
    return favorites.some((favorite) => favorite.nasa_id === nasa_id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
