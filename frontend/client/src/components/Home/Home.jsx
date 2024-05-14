import React, { useEffect } from "react";
import useECommerce from "../../hooks/useECommerce";
import { Link } from "react-router-dom";

import Carousel from "../Carousel";
import Categories from "../Categories";
import HomeProducts from "./HomeProducts";
import ViewOfferProduct from "./ViewOfferProduct";

const Home = () => {
  const { cart } = useECommerce();

  useEffect(() => {
    document.title = `Florecer Contigo | Envío de flores, peluches y regalos a Domicilio`;
  }, []);

  return (
    <>
      <Carousel />
      <ViewOfferProduct />

      <div className="bg-blue-100 mt-12">
        <div className="m-auto px-2 xl:p-0 max-w-7xl">
          <Categories />
        </div>

        <div className="m-auto mt-8 px-2 xl:p-0 max-w-7xl">
          <HomeProducts />
        </div>

        <div className="mt-2">
          <h3>xdxd</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
