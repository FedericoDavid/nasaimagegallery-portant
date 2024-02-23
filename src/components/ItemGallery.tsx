import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

interface ItemGalleryProps {
  image: string;
  title: string;
  nasa_id: string;
  copyright?: string; // Hacerlo opcional si no siempre se proporciona
}

const ItemGallery: React.FC<ItemGalleryProps> = ({
  image,
  title,
  nasa_id,
  copyright,
}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);

  const onSavePin = () => {
    setIsSavingPost(true);
    // Lógica para guardar el ítem como favorito
    setIsSavingPost(false);
  };

  // Omitido por brevedad el resto del componente...

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className="relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && <img className="rounded-lg w-full" alt={title} src={image} />}
        {postHovered && (
          <div className="absolute top-0 right-0 p-2">
            <button
              type="button"
              onClick={onSavePin}
              className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
            >
              {isSavingPost ? (
                <TailSpin color="#fff" height={20} width={20} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <p className="font-semibold capitalize">{title}</p>
      </div>
    </div>
  );
};

export default ItemGallery;
