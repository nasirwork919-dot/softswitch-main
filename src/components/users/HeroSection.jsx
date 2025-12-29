import React from "react";

const HeroSection = () => {
  return (
    <div
      className="
        rounded-[2rem] mt-8
        bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800
        px-6 sm:px-10 lg:px-12
        py-8 sm:py-12
        flex items-center
        min-h-[160px] sm:min-h-[200px]
        shadow-2xl shadow-blue-200/50
        relative overflow-hidden group
      "
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl" />

      {/* Text */}
      <div className="text-left text-white max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-blue-200 animate-pulse" />
          Management Console
        </div>
        <h1
          className="
            text-2xl sm:text-3xl lg:text-4xl 
            font-extrabold tracking-tight mb-2
          "
        >
          User Management
        </h1>

        <p
          className="
            text-sm sm:text-base 
            text-blue-100/90 font-medium
            max-w-lg leading-relaxed
          "
        >
          Manage all registered users, their profiles, verification status, and
          account actions effectively.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
