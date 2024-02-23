import { AxiosError } from "axios";

export type ErrorState = AxiosError | Error | null;

export type APOD = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export type ImageItem = {
  imageUrl: string;
  title: string;
  nasa_id: string;
  description: string;
};

export type NasaImageData = {
  center: string;
  title: string;
  nasa_id: string;
  date_created: string;
  description: string;
  keywords?: string[];
  media_type: string;
};

export type NasaImageLink = {
  href: string;
  rel: string;
  render?: string;
};

export type NasaImageItem = {
  data: NasaImageData[];
  href: string;
  links: NasaImageLink[];
};

export type NasaImageCollection = {
  collection: {
    items: NasaImageItem[];
    metadata: {
      total_hits: number;
    };
    version: string;
    href: string;
    links?: {
      rel: string;
      prompt: string;
      href: string;
    }[];
  };
};
