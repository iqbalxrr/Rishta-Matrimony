import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] ">
      <div className="animate-bounce text-pink-500 text-6xl">💞</div>
      <p className="mt-4 text-pink-600 text-lg font-medium animate-pulse">Loading biodata...</p>
    </div>
  );
};

export default Loader;
