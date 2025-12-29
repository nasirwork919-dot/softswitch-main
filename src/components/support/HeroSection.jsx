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
        px-8
        py-6 sm:py-10
        flex items-center justify-between
        min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]
      "
    >
      {/* Left Text */}
      <div className="text-left text-white">
        <h1
          className="
            text-lg sm:text-xl lg:text-2xl 
            font-semibold
          "
        >
            Support Services
        </h1>

        <p
          className="
            text-[11px] sm:text-sm lg:text-base 
            opacity-80 mt-1
          "
        >
            Helping you navigate challenges with expert assistance.
        </p>
      </div>

    
    </div>
  );
};

export default HeroSection;
