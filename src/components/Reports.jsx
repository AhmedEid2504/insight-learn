
const Reports = () => {
  // Define the number of skeleton cards you want to render
  const skeletonCount = 1; // Adjust this number as needed

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Generate skeleton cards directly within the Reports component */}
      {Array.from({ length: skeletonCount }, (_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg w-auto animate-pulse">
          {/* Skeleton for chart title */}
          <div className="h-6 bg-gray-300 rounded mb-2"></div>

          {/* Skeleton for chart */}
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Reports;
