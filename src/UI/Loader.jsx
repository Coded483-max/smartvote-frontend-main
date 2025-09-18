import React from "react";

const Loader = () => {
  return (
    <div
      className="w-20 h-20 rounded-full border-8 border-blue-200 border-r-blue-500 animate-spin"
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
