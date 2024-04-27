
const Predictions = () => {
  // Define the number of skeleton cards you want to render
  const skeletonCount = 4; // Adjust this number as needed

  return (
    <div className="w-[60dvw] h-[80dvh] flex gap-10 p-5 flex-col items-start justify-start overflow-x-scroll">
      {/* Generate skeleton cards directly within the Reports component */}
      {Array.from({ length: skeletonCount }, (_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg w-[830px] animate-pulse">
          {/* Skeleton for chart title */}
          <div className="bg-gray-300 rounded text-black">Test</div>

          {/* Skeleton for chart */}
          <div className="h-[20vh]  bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Predictions
