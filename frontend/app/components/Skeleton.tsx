import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex-1  flex-col items-center space-y-4">
      {/* Skeleton Image */}
      <div className="lg:w-[600px] lg:h-[500px] bg-gray-600 rounded-lg border-4 border-gray-800"></div>
    </div>
  );
};

export default Skeleton;
