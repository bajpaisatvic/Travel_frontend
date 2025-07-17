import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = [
  {
    name: "Adventure",
    about:
      "Adventure travel is all about pushing boundaries, embracing the thrill of the unknown, and connecting with the great outdoors. Whether you're trekking through the snow-capped Himalayas, white-water rafting down gushing rivers, ziplining over lush forests, or bungee jumping off towering cliffs, this category is for the brave-hearted. It's perfect for those who crave adrenaline-pumping activities and off-the-beaten-path experiences. Adventure tours offer not just excitement, but also stories, memories, and self-discovery through nature’s raw beauty.",
  },
  {
    name: "Relaxation",
    about:
      "Relaxation travel is the ultimate escape from stress and hustle. Picture yourself on a sun-kissed beach, sipping coconut water with waves crashing gently nearby, or soaking in a natural hot spring surrounded by mountains. This category offers slow-paced itineraries, peaceful environments, wellness retreats, and luxurious spa treatments. Ideal for those looking to disconnect, recharge, and restore mental and physical well-being, relaxation tours help you rediscover tranquility, balance, and inner peace in some of the world's most serene destinations.",
  },
  {
    name: "Budget",
    about:
      "Traveling on a budget doesn't mean compromising on experience — it means being smart about your choices. Budget tours are tailored for students, solo travelers, and families seeking affordable yet fulfilling journeys. From backpacker hostels to local food joints, this category ensures you explore more while spending less. You’ll discover hidden gems, travel in groups for shared expenses, and enjoy authentic experiences with thoughtful planning. It’s about maximizing adventure and culture, while keeping your wallet happy and stress levels low.",
  },
  {
    name: "Wildlife",
    about:
      "Wildlife travel is a dream for nature lovers and conservation enthusiasts. Whether you’re on a safari in the Serengeti, watching whales breach the ocean surface, or exploring dense rainforests in search of exotic species, every moment is awe-inspiring. This category offers immersive experiences in national parks, sanctuaries, and biosphere reserves, guided by experts who prioritize sustainability and respect for nature. Perfect for photographers, bird watchers, or families, wildlife tours promise unforgettable encounters with the animal kingdom in their natural habitat.",
  },
  {
    name: "Cultural",
    about:
      "Cultural tours allow you to dive deep into the history, traditions, and soul of a place. From exploring ancient forts and temples to participating in colorful festivals and local rituals, every destination tells a story. You'll taste traditional cuisines, meet artisans, and walk through vibrant markets, gaining authentic insight into diverse ways of life. This category is perfect for curious minds and history buffs who want more than sightseeing — it’s about connecting with people, understanding heritage, and celebrating global diversity.",
  },
  {
    name: "Luxury",
    about:
      "Luxury travel is all about indulgence, elegance, and seamless comfort. Think private villas overlooking turquoise waters, first-class flights, gourmet dining, personal butlers, and curated experiences just for you. Whether it's a romantic escape, a milestone celebration, or a VIP-style getaway, this category caters to those who expect nothing but the finest. Every detail is meticulously planned to provide unmatched service, exclusivity, and relaxation. Luxury tours turn dreams into reality, where your only task is to enjoy the experience to the fullest.",
  },
];

export default function Tours() {
  const [packages, setPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const backendURL = import.meta.env.VITE_PRODUCTION_URL_URL;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${backendURL}/packages/all`);
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
    <div className="min-h-screen dark:bg-gray-800 bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 p-4 md:p-6 bg-white dark:bg-gray-700 shadow-md md:shadow-lg border-b md:border-b-0 md:border-r dark:border-gray-600">
        <h2 className="text-2xl font-bold mb-4 md:mb-6 dark:text-gray-200 text-blue-700">
          Categories
        </h2>
        <ul className="space-y-2 md:space-y-3">
          {categories.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
                  selectedCategory.name === cat.name
                    ? "bg-blue-100 text-blue-700 dark:bg-gray-600 dark:text-gray-100"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
          {selectedCategory.name} Tours
        </h1>
        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
          {selectedCategory.about}
        </p>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white dark:bg-gray-600 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-white text-gray-800">
                    {pkg.name}
                  </h3>
                  {/* <p className="text-gray-600 dark:text-gray-200 text-sm mt-1">
                    {pkg.description.substring(0, 80)}...
                  </p> */}
                  <Link to={`/services/tours/${pkg._id}`}>
                    <button className="mt-3 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center text-lg italic mt-8">
            No packages available for {selectedCategory.name}.
          </p>
        )}
      </div>
    </div>
  );
}
