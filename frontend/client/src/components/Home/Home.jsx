import React, { useEffect } from "react";
import useECommerce from "../../hooks/useECommerce";
import { Link } from "react-router-dom";

import Carousel from "../Carousel";
import Categories from "../Categories";
import HomeProducts from "./HomeProducts";

const Home = () => {
  const { cart } = useECommerce();

  useEffect(() => {
    document.title = `Florecer Contigo | Envío de flores, peluches y regalos a Domicilio`;
  }, []);

  return (
    <>
      <Carousel />
      <div className="bg-rose-700 p-4 w-full text-white">
        <div className="flex md:flex-row flex-col justify-between items-center gap-3 mx-auto max-w-4xl">
          <span className="text-base text-center md:text-xl md:text-left">
            Descubre la oferta de dia que tenemos para ti
          </span>
          <Link
            to={"/"}
            className="border-2 hover:bg-white px-8 py-0 md:py-2 rounded-full text-white hover:text-rose-700 transition-all duration-300 ease-in-out"
          >
            Ofertas del dia
          </Link>
        </div>
      </div>

      <div className="bg-blue-100 mt-12">
        <div className="m-auto px-2 xl:p-0 max-w-7xl">
          <Categories />
        </div>

        <div className="m-auto mt-8 px-2 xl:p-0 max-w-7xl">
          <HomeProducts />
        </div>

        <div>
          <h3>xdxd</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
