import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorState, NasaImageCollection, NasaImageItem } from "../../types";

export const searchTerms = [
  "mars",
  "earth",
  "jupiter",
  "saturn",
  "orion",
  "mercury",
  "neptune",
  "uranus",
  "venus",
];

const useNasaImages = () => {
  const [imagesList, setImagesList] = useState<NasaImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState>(null);

  const getUrl = () => {
    const pageSize = 24;
    const randomPlanet =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const searchTerm = `${randomPlanet} planet`;

    return `${
      import.meta.env.VITE_API_URL_IMAGES
    }/search?q=${searchTerm}&media_type=image&page_size=${pageSize}`;
  };

  useEffect(() => {
    const getListImages = async () => {
      try {
        const { data } = await axios.get<NasaImageCollection>(getUrl());
        const items = data.collection.items;

        setImagesList(items);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    getListImages();
  }, []);

  return { imagesList, isLoading, error };
};

export default useNasaImages;
