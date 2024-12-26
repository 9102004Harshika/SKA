import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaExternalLinkAlt } from "react-icons/fa";
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
import { sliderImages } from "../config/index";

const Carousel = () => {
  return (
    <div className="w-full max-w-full mt-2 md:mt-2">
      <Swiper
        modules={[Navigation, Pagination, EffectCreative, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true} // Keep navigation
        pagination={{ clickable: true }} // Pagination enabled
        loop={true} // Enable loop for continuous autoplay
        autoplay={{
          delay: 2500, // Low delay for quicker transitions
          disableOnInteraction: false, // Continue autoplay even after user interaction
          pauseOnMouseEnter: false, // Do not pause autoplay on hover
        }}
        speed={3000} // Transition speed set to 3 seconds for smoothness
        effect="creative" // Use the creative effect for smooth animation
        creativeEffect={{
          prev: {
            translate: ["-120%", 0, -500],
            opacity: 0.6,
            scale: 0.8,
            rotate: [0, 0, -30],
          },
          next: {
            translate: ["120%", 0, -500],
            opacity: 0.6,
            scale: 0.8,
            rotate: [0, 0, 30],
          },
          current: {
            translate: [0, 0, 0],
            opacity: 1,
            scale: 1,
            rotate: [0, 0, 0],
          },
        }}
        className=""
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full md:w-10/12 mx-auto h-[0] pb-[56.25%] md:pb-[46.25%] md:h-[480px] lg:h-[560px] bg-cover bg-center">
              {/* The 56.25% padding-bottom ensures the aspect ratio of 1280x720 (16:9) */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-opacity-50">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center" // Ensures the image fills the container
                />
                <a
                  href={image.link}
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-primary text-background rounded-full p-2 shadow-lg hover:text-secondary transition"
                  aria-label={`Visit ${image.alt}`}
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
