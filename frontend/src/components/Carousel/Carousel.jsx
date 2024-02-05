import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import carousel_image_01 from "../../assets/carousel-image-01.jpg";
import carousel_image_02 from "../../assets/carousel-image-02.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

export default function Carousel() {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: true,
        }}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-40 sm:h-72 mySwiper md:h-96"
      >
        <SwiperSlide>
          <img src={carousel_image_01} className="object-cover w-full h-full" />
          <h1 className="absolute text-xl font-semibold text-center text-white transform -translate-x-1/2 -translate-y-1/2 sm:text-2xl md:text-4xl top-1/2 left-1/2">
            Estamos cuando nos necesitas...
          </h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel_image_02} className="object-cover w-full h-full" />
          <h1 className="absolute text-xl font-semibold text-center text-white transform -translate-x-1/2 -translate-y-1/2 sm:text-2xl md:text-4xl top-1/2 left-1/2">
            Estamos cuando nos necesitas...
          </h1>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
