import React from "react";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`services/tours/${pkg._id}`);
  };

  return (
    <div className="h-[380px] p-4 bg-white dark:bg-slate-500 rounded-2xl shadow hover:shadow-md transition duration-300 border flex flex-col justify-between">
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <div className="flex-1 overflow-hidden">
        <h3 className="text-lg font-semibold mb-1 dark:text-white line-clamp-2">
          {pkg.name}
        </h3>
        <div className="text-gray-700 text-sm dark:text-gray-300">
          ₹{pkg.price}
        </div>
      </div>
      <button
        onClick={handleViewDetails}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default PackageCard;
