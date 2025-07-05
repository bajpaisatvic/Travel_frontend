import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

function Home() {
  const slideshowImages = [
    "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
    "https://images.pexels.com/photos/3276841/pexels-photo-3276841.jpeg",
    "https://images.pexels.com/photos/11622977/pexels-photo-11622977.jpeg",
    "https://images.pexels.com/photos/16542333/pexels-photo-16542333.jpeg",
  ];

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
    </div>
  );
}

export default Home;
