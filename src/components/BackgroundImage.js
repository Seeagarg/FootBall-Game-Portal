import React from "react";

const BackgroundImage = ({children}) => {
  return (
    <div
      className="
      bg-[url('./imagessrc/bg.avif')]
      w-full
      bg-no-repeat
      bg-cover
      min-h-screen
       text-stone-200
       bg-fixed
       "
    >
      <div
        className="
      min-h-screen
      w-full
       bg-gradient-to-r from-stone-800/60 to-stone-800/60
      "
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;