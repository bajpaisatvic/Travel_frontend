import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const categories = [
  {
    name: "Adventure",
    about:
      "Thrilling adventures in the heart of nature, mountains, and beyond.",
  },
  {
    name: "Relaxation",
    about: "Relax under the sun with golden sands and crystal-clear waters.",
  },
  {
    name: "Budget",
    about: "Affordable and value-for-money travel experiences.",
  },
  {
    name: "Wildlife",
    about: "Get close to nature with safaris and wildlife expeditions.",
  },
  {
    name: "Cultural",
    about: "Immerse yourself in local traditions, festivals, and food.",
  },
  {
    name: "Luxury",
    about: "Travel in style with our premium and luxurious experiences.",
  },
];

// Dummy data with categories assigned to each package

export default function Tours() {
  const [packages, setPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Fetch all packages on load
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "https://travel-backend-wmxj.onrender.com/api/v1/packages/all"
        );
        setPackages(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(
    (pkg) => pkg.category?.name === selectedCategory.name
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-1/4 p-6 bg-white shadow-lg border-r">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Categories</h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                  selectedCategory.name === cat.name
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-3/4 p-8">
        <h1 className="text-5xl text-center font-bold text-gray-800 mb-4">
          {selectedCategory.name} Tours
        </h1>
        <p className="text-gray-600 mb-6">{selectedCategory.about}</p>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {pkg.description.substring(0, 80)}...
                  </p>
                  <Link to={`/services/tours/${pkg._id}`}>
                    <button className="mt-3 text-blue-600 hover:underline font-medium">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg italic mt-8">
            No packages available for {selectedCategory.name}.
          </p>
        )}
      </div>
    </div>
  );
}
