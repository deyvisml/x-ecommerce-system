import React, { useState, useEffect } from "react";
import axios_client from "../../helpers/axios";
import ProductItem from "../Products/ProductItem";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

const HomeProducts = () => {
  const [home_products, setHomeProducts] = useState([]);

  const fetch_categories = async () => {
    const { data } = await axios_client("/api/products", {
      method: "get",
      params: {
        filtering: [
          {
            column: "products.state_id",
            values: [1],
          },
        ],
        options: {
          only_published: true,
        },
        limit: 15,
      },
    });

    setHomeProducts(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    fetch_categories();
  }, []);

  return (
    <div>
      <div className="text-center">
        <p className="text-2xl">Algunos de nuestros regalos recomendados</p>

        <div className="mt-5">
          <Swiper
            style={{
              "--swiper-navigation-color": "#e11d48",
              "--swiper-pagination-color": "#e11d48",
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="w-full sm:h-96"
            breakpoints={{
              // Configuración para tamaños de pantalla pequeños (sm)
              640: {
                slidesPerView: 2,
              },
              // Configuración para tamaños de pantalla medianos (md)
              768: {
                slidesPerView: 3,
              },
              // Configuración para tamaños de pantalla grandes (lg)
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            {home_products.map((home_product, i) => {
              return (
                <SwiperSlide key={i}>
                  <ProductItem product={home_product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
