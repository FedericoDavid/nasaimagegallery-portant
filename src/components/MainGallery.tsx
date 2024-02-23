import Masonry from "react-masonry-css";
import useNasaImages from "../hooks/api/useNasaImages";
import ItemGallery from "./ItemGallery";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading images</div>;

  console.log(imagesList);

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
            copyright={item.data[0].description} // Asumiendo que quieres usar description como copyright
          />
        ))}
      </Masonry>
    </div>
  );
};

export default MainGallery;
