import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import { APOD } from "../../types/apod";

type ErrorState = AxiosError | Error | null;

const useAPOD = (date: string) => {
  const [apod, setApod] = useState<APOD | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/planetary/apod?api_key=${
      import.meta.env.VITE_API_KEY
    }&date=${date}`;

    const getAPOD = async () => {
      setIsLoading(true);

      try {
        const res = await axios.get<APOD>(url);

        setApod(res.data);
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

    getAPOD();
  }, [date]);

  return { apod, isLoading, error };
};

export default useAPOD;
