import React from "react";
import bgImage from "../../assets/hero-bg.png";

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
         Reports Center
        </h1>

        <p
          className="
            text-[11px] sm:text-sm lg:text-base 
            opacity-80 mt-1
          "
        >
         Review and manage all user-generated reports related to violations, safety issues, or inappropriate content.
        </p>
      </div>

    
    </div>
  );
};

export default HeroSection;
