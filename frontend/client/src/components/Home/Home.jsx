import React, { useEffect } from "react";
import useECommerce from "../../hooks/useECommerce";
import { Link } from "react-router-dom";

import Carousel from "../Carousel";
import Categories from "../Categories";
import HomeProducts from "./HomeProducts";
import ViewOfferProduct from "./ViewOfferProduct";
import SubscribeNewsletter from "./SubscribeNewsletter";
import BenefitsInformation from "../BenefitsInformation/BenefitsInformation";

import build_perfect_detail_img from "../../../public/images/others/build-perfect-detail.jpg";

const Home = () => {
  const { cart } = useECommerce();

  useEffect(() => {
    document.title = `Florecer Contigo | Envío de flores, peluches y regalos a Domicilio`;
  }, []);

  return (
    <>
      <Carousel />
      <ViewOfferProduct />

      <section>
        <div className="m-auto mt-12 px-2 xl:p-0 max-w-7xl">
          <Categories />
        </div>

        <div className="m-auto mt-8 px-2 xl:p-0 max-w-7xl">
          <HomeProducts />
        </div>

        <div className="mt-4">
          <div className="relative h-56 sm:h-96">
            <img
              src={build_perfect_detail_img}
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
              alt=""
            />
            <div className="top-0 left-0 absolute bg-gray-900 opacity-50 w-full h-full"></div>
            <div className="top-1/2 left-1/2 absolute p-2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center gap-y-2 text-center text-white">
                <h2 className="text-xl sm:text-3xl">
                  Arma el detalle perfecto para cada ocación
                </h2>
                <p className="text-xs sm:text-base">
                  Convierte tu idea en realidad diseñando el detalle perfecto
                  con nuestra amplia gama de productos disponibles
                </p>
                <Link className="block bg-rose-600 hover:bg-rose-700 p-2 rounded-lg w-full max-w-md text-sm sm:text-base transition-all duration-300 ease-in-out">
                  Manos a la obra
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SubscribeNewsletter />
        </div>

        <div className="">
          <BenefitsInformation />
        </div>
      </section>
    </>
  );
};

export default Home;
