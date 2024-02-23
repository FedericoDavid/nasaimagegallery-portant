import React from "react";
import ReactToggle from "react-toggle";

interface ToggleProps {
  textLeft: string;
  textRight: string;
  isFavorite: boolean;
  onHandleChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({
  textLeft,
  textRight,
  isFavorite,
  onHandleChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className="text-white font-semibold">{textLeft}</span>
      <ReactToggle
        className="toggle"
        defaultChecked={isFavorite}
        icons={false}
        onChange={onHandleChange}
      />
      <span className="text-white font-semibold">{textRight}</span>
    </div>
  );
};

export default Toggle;
