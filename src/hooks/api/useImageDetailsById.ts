import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorState, ImageItem, NasaImageCollection } from "../../types";

interface ImageItemDetails extends ImageItem {
  createdAt: string;
}

const useImageDetailsById = (nasaId: string) => {
  const [imageDetails, setImagesDetails] = useState<ImageItemDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    setIsLoading(true);

    const getImageDetails = async () => {
      try {
        const { data } = await axios.get<NasaImageCollection>(
          `${import.meta.env.VITE_API_URL_IMAGES}/search?nasa_id=${nasaId}`
        );

        const res = data.collection.items[0];

        const item = {
          nasa_id: res.data[0].nasa_id,
          title: res.data[0].title,
          description: res.data[0].description,
          createdAt: res.data[0].date_created,
          imageUrl:
            res.links.find((link) => link.rel === "preview")?.href ||
            "/public/images/notfound.png",
        };

        setImagesDetails(item);
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

    getImageDetails();
  }, []);

  return { imageDetails, isLoading, error };
};

export default useImageDetailsById;
