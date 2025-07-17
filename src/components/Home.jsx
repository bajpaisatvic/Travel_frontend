import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import PackageCard from "./PackageCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
function Home() {
  const slideshowImages = [
    "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
    "https://images.pexels.com/photos/3276841/pexels-photo-3276841.jpeg",
    "https://images.pexels.com/photos/11622977/pexels-photo-11622977.jpeg",
    "https://images.pexels.com/photos/16542333/pexels-photo-16542333.jpeg",
  ];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8; // scroll by ~80% of container width
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  const backendURL = import.meta.env.VITE_PRODUCTION_URL_URL;
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${backendURL}/packages/all`);
        setPackages(res.data.data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="w-full h-full"
      >
        {slideshowImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Background image */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-screen object-cover"
              />

              {/* Overlay with opacity */}
              <div className="absolute inset-0 bg-black bg-opacity-20" />

              {/* Optional overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="text-xl md:text-3xl font-extrabold font-serif mb-2">
                  Welcome to
                </h3>
                <h1 className="text-4xl md:text-6xl font-extrabold font-sans">
                  Bumped Travels
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Available Packages
        </h2>

        {Array.isArray(packages) && packages.length > 0 ? (
          <div className="relative">
            {/* Left Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-600 shadow-md p-2 rounded-full z-10"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-10 py-4 hide-scrollbar"
            >
              {packages.map((pkg) => (
                <div key={pkg._id} className="snap-center shrink-0 w-[300px]">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-600 shadow-md p-2 rounded-full z-10"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No packages found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
