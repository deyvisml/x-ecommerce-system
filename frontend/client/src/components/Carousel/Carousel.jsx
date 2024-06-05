import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import carousel_image_01 from "../../../public/images/carousel/image-01.png";
import carousel_image_02 from "../../../public/images/carousel/image-02.png";
import carousel_image_03 from "../../../public/images/carousel/image-03.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { useTranslation } from "react-i18next";

export default function Carousel() {
  const { t } = useTranslation();

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
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-40 sm:h-72 md:h-96"
      >
        <SwiperSlide>
          <img src={carousel_image_01} className="w-full h-full object-cover" />
          <div className="top-1/2 left-3 md:left-16 absolute text-white -translate-y-1/2">
            <h2 className="font-bold text-base md:text-3xl">
              {t("home.carousel.title.part1")}
              <br />
              {t("home.carousel.title.part2")}
            </h2>
            <p className="mt-2">{t("home.carousel.subtitle")}</p>
            <button
              onClick={() => {
                const targetElement = document.querySelector(
                  "#categories_container"
                );
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="sm:inline-block border-2 hidden hover:bg-white mt-2 px-8 py-0 md:py-2 rounded-full text-white hover:text-rose-700 transition-all duration-300 ease-in-out"
            >
              {t("home.carousel.show_button")}
            </button>
          </div>
        </SwiperSlide>
        {/*<SwiperSlide>
          <img src={carousel_image_02} className="w-full h-full object-cover" />
          <h4 className="top-1/2 left-1/2 absolute hidden font-semibold text-center text-white text-xl sm:text-2xl md:text-4xl transform -translate-x-1/2 -translate-y-1/2">
            Estamos cuando nos necesitas...
          </h4>
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel_image_03} className="w-full h-full object-cover" />
          <h4 className="top-1/2 left-1/2 absolute hidden font-semibold text-center text-white text-xl sm:text-2xl md:text-4xl transform -translate-x-1/2 -translate-y-1/2">
            Estamos cuando nos necesitas...
          </h4>
      </SwiperSlide>*/}
      </Swiper>
    </>
  );
}
