import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

const Carousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      <Swiper
        modules={[Navigation, Pagination, EffectCreative, Autoplay]} // Add Autoplay to enable automatic sliding
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000, // Low delay for quicker transitions
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        speed={3000} // Transition speed set to 1 second for smoothness
        effect="creative" // Use the creative effect for smooth animation
        creativeEffect={{
          prev: {
            translate: ["-120%", 0, -500], // Move the previous slide off-screen
            opacity: 0.6, // Make the previous slide slightly transparent
            scale: 0.8, // Shrink the previous slide for perspective effect
            rotate: [0, 0, -30], // Rotate the previous slide slightly
          },
          next: {
            translate: ["120%", 0, -500], // Move the next slide off-screen
            opacity: 0.6, // Make the next slide slightly transparent
            scale: 0.8, // Shrink the next slide for perspective effect
            rotate: [0, 0, 30], // Rotate the next slide slightly
          },
          current: {
            translate: [0, 0, 0], // Keep the current slide centered
            opacity: 1, // Full opacity for the current slide
            scale: 1, // Full scale for the current slide
            rotate: [0, 0, 0], // No rotation for the current slide
          },
        }}
        className=""
      >
        {/* Slide 1 - Using images as an example */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/800x400/3b82f6/ffffff?text=Slide+1)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 bg-opacity-50"></div>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/800x400/10b981/ffffff?text=Slide+2)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-green-400 to-teal-600 bg-opacity-50"></div>
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/800x400/f97316/ffffff?text=Slide+3)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-red-400 to-yellow-600 bg-opacity-50"></div>
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/800x400/f472b6/ffffff?text=Slide+4)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-pink-400 to-orange-600 bg-opacity-50"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
