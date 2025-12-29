import React from "react";
import bgImage from "../../assets/hero-bg.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      className="
        rounded-xl mt-18
        bg-cover bg-center bg-no-repeat
        px-4 sm:px-8 lg:px-12
        py-6 sm:py-10
        flex items-center justify-between
        min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]
      "
    >
      {/* Left Text */}
      <div className="text-left text-white max-w-xl">
        <h1
          className="
            text-lg sm:text-xl lg:text-2xl 
            font-semibold
          "
        >
          Community Management
        </h1>

        <p
          className="
            text-[11px] sm:text-sm lg:text-base 
            opacity-80 mt-1
          "
        >
          Manage all neighborhoods, groups, and local communities across the platform.
        </p>
      </div>

      {/* Right Button */}
      <Link to='/communities/edit&create'>
      <button
        className="
          bg-[#03989E] text-white font-medium
          text-xs sm:text-sm lg:text-[15px]
          px-3 sm:px-4 lg:px-5
          py-2 sm:py-2.5
          rounded-lg shadow-md
          hover:bg-gray-200
          transition-all
        "
      >
       + Create Community
      </button>
      </Link>
    </div>
  );
};

export default HeroSection;
