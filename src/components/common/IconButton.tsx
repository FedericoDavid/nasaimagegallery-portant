import React from "react";
import { IconType } from "react-icons";

interface BackButtonProps {
  onClick: () => void;
  icon: IconType;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  icon: Icon,
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-transparent border-none outline-none focus:outline-none hover:outline-none text-md mt-4"
      style={{ transition: "transform 0.2s" }}
    >
      <Icon className="mr-2 transform hover:translate-x-[-10px]" />
      <span>{text}</span>
    </button>
  );
};

export default BackButton;
