import Masonry from "react-masonry-css";
import useNasaImages from "../hooks/api/useNasaImages";
import ItemGallery from "./ItemGallery";
import Spinner from "./common/Spinner";

const breakpointColumns = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MainGallery = () => {
  const { imagesList, isLoading, error } = useNasaImages();

  console.log(imagesList);

  if (isLoading || error)
    return (
      <Spinner
        message={error ? "Ups!... something went wrong" : "Loading..."}
      />
    );

  return (
    <div className="mt-24">
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumns}
      >
        {imagesList.map((item) => (
          <ItemGallery
            key={item.data[0].nasa_id}
            image={item.links[0].href}
            title={item.data[0].title}
            nasa_id={item.data[0].nasa_id}
            description={item.data[0].description}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default MainGallery;
