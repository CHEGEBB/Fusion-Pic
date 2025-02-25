import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex-1  flex-col items-center space-y-4">
      {/* Skeleton Image */}
      <div className="w-[400px] h-[300px] bg-gray-700 rounded-lg"></div>
      {/* Skeleton Button */}
      <div className="w-[150px] h-10 bg-gray-700 rounded-md"></div>
    </div>
  );
};

export default Skeleton;
