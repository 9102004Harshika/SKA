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
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/800x400/3b82f6/ffffff?text=Slide+1)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 bg-opacity-50">
              <img
                src="https://cdn.vectorstock.com/i/preview-1x/63/57/mathematics-word-concepts-banner-presentation-vector-29126357.jpg"
                alt=""
                className="w-full"
              />
            </div>
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
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-green-400 to-teal-600 bg-opacity-50">
              <img
                src="https://static.vecteezy.com/system/resources/previews/045/761/280/original/mathematics-light-orange-word-concept-science-calculations-academic-discipline-algebra-visual-communication-artwith-lettering-text-editable-glyph-icons-vector.jpg"
                alt=""
                className="w-full"
              />
            </div>
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
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-red-400 to-yellow-600 bg-opacity-50">
              <img
                src="https://img.cdn.schooljotter2.com/sampled/12293546/900/0/nocrop/"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="h-64 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/OIP.rRQ48I-uXUJQP6QLRHwkKgHaCq?rs=1&pid=ImgDetMain)",
            }}
          >
            <div className="h-full flex items-center justify-center text-white text-2xl font-bold rounded-lg bg-gradient-to-r from-pink-400 to-orange-600 bg-opacity-50">
              <img
                src="https://t4.ftcdn.net/jpg/02/38/56/47/360_F_238564753_anEHnK7TS2OjweqAE8LFUqVn7zk4TIlt.jpg"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
