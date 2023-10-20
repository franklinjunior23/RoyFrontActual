const LoadingSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-4">
      <div className="animate-pulse ">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="w-5/6 h-4 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
