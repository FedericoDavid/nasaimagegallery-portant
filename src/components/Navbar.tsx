import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent text-white px-3 pt-0 pb-6">
      <div className="container flex justify-start items-center">
        <a href="/" className="flex items-center">
          <img src="/nasa-logo.svg" alt="NASA Logo" width={102} height={102} />
          <p className="font-medium text-xl text-white">Daily Gallery</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
