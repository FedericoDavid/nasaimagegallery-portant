import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorState, ImageItem, NasaImageCollection } from "../../types";

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
  const [imagesList, setImagesList] = useState<ImageItem[]>([]);
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

        const items = data.collection.items.map((item) => ({
          nasa_id: item.data[0].nasa_id,
          title: item.data[0].title,
          description: item.data[0].description,
          imageUrl:
            item.links.find((link) => link.rel === "preview")?.href ||
            "/public/images/notfound.png",
        }));

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
