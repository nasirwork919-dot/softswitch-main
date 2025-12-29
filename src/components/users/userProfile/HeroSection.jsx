import React from "react";
import bgImage from "../../../assets/hero-bg.png";

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
        flex items-center
        min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]
      "
    >
      {/* Text */}
      <div className="text-left text-white max-w-xl">
        <h1
          className="
            text-lg sm:text-xl lg:text-2xl 
            font-semibold
          "
        >
         User Profile
        </h1>

        <p
          className="
            text-[11px] sm:text-sm lg:text-base 
            opacity-80 mt-1
          "
        >
        Manage user information and verification status.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
