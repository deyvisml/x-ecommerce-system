import React, { useEffect } from "react";
import useECommerce from "../../hooks/useECommerce";
import { Link } from "react-router-dom";

import Carousel from "../Carousel";
import Categories from "../Categories";

const Home = () => {
  const { cart } = useECommerce();

  useEffect(() => {
    document.title = `Florecer Contigo | Envío de flores, peluches y regalos a Domicilio`;
  }, []);

  return (
    <>
      <Carousel />
      <div className="bg-rose-700 p-4 w-full text-white">
        <div className="flex justify-between items-center mx-auto max-w-4xl">
          <span className="text-xl">
            Descubre la oferta de dia que tenemos para ti
          </span>
          <Link
            to={"/"}
            className="border-2 hover:bg-white px-8 p-2 rounded-full text-white hover:text-rose-700 transition-all duration-300 ease-in-out"
          >
            Ofertas del dia
          </Link>
        </div>
      </div>
      <div className="mx-2 sm:mx-20 md:mx-48 mb-16 px-2 py-10">
        <Categories />
      </div>
    </>
  );
};

export default Home;
