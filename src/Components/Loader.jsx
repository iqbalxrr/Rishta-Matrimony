import React from 'react';

const Loader = () => {
  return (
   <div>
     <div className="flex flex-col items-center justify-center h-[400px] ">
      <p className="animate-bounce text-pink-500 text-6xl">💞</p>
      <p className="mt-4 text-pink-600 text-lg font-medium animate-pulse">Loading...</p>
    </div>
   </div>
  );
};

export default Loader;
