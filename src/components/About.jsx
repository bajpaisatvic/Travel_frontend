import React from "react";

export default function About() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-16 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-blue-600 dark:text-blue-300 font-semibold uppercase tracking-wider mb-2">
            So glad you are here
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            About Us
          </h2>
          <div className="w-full h-1 bg-blue-600 mb-4"></div>
          <p class="text-lg text-gray-700 dark:text-gray-200 mb-4">
            Welcome to <strong>Bumped Travels</strong>, where your journey
            begins with comfort, adventure, and unforgettable memories. We’re
            not just a travel agency — we’re your partners in discovering the
            world.
          </p>

          <p class="text-lg text-gray-700 dark:text-gray-200 mb-4">
            At Bumped Travels, we believe that travel is more than just reaching
            a destination — it’s about the experiences you gather along the way.
          </p>

          <ul class="list-disc list-inside text-lg text-gray-700 dark:text-gray-200 mb-4 space-y-2">
            <li>
              🧳 <strong>Curated tour packages</strong> across categories like
              Adventure, Relaxation, Budget, Luxury, Cultural, and Wildlife.
            </li>
            <li>
              ✈️ <strong>Flight and hotel booking assistance</strong> to make
              your planning stress-free.
            </li>
            <li>
              🌍 <strong>End-to-end travel support</strong> — from inspiration
              to return.
            </li>
          </ul>

          <p class="text-lg font-medium text-gray-800 dark:text-white">
            Come, explore with <strong>Bumped Travels</strong> — where every
            trip feels like a celebration.
          </p>
        </div>

        {/* Main Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg"
            alt="Travel 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Additional Images (Stacked on small, side-by-side on md+) */}
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/21014/pexels-photo.jpg"
            alt="Travel 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg"
            alt="Travel 4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
