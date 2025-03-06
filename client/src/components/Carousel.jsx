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
// import { sliderImages } from "../config/index";
import useCarousel from "../logic/features/createCarousel";

const Carousel = () => {
  const { carouselItems } = useCarousel();
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
        {carouselItems.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[0] pb-[56.25%] md:pb-[46.25%] md:h-[320px] lg:h-[480px] bg-cover bg-center">
              {/* Ensure the aspect ratio is maintained and images are responsive */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-opacity-50">
                <img
                  src={image.image}
                  alt={image.description}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{
                    objectFit: "fit",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <a
                  href="courses"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-primary text-background rounded-full p-2 shadow-lg hover:text-secondary transition"
                  aria-label={`Visit ${image.description}`}
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
